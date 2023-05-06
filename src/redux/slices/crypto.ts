import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AppThunk } from '../store/store';
import { ICryptoState } from '@/types/crypto.types';

export const fetchCrypto = (): AppThunk => async (dispatch) => {
     dispatch(fetchCryptoStart());
     try {
          const fetchCoins = () => {
               // response => usd , usd_24h_change | bitcoin , dogecoin , tether
               const priceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ripple,ethereum,bitcoin,dogecoin,tether&vs_currencies=usd&include_24hr_change=true';
               // solana

               const solanaUrl = 'https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=365';
               const ethereumUrl = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=365';
               const bitcoinUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365';
               const dogecoinUrl = 'https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=usd&days=365';
               const tetherUrl = 'https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=365';
               const rippleUrl = 'https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=365';



               const fetchSolanaUrl = axios.get(solanaUrl);
               const fetchRippleUrl = axios.get(rippleUrl);
               const fetchEthereumUrl = axios.get(ethereumUrl);
               const fetchBitcoinUrl = axios.get(bitcoinUrl);
               const fetchDogecoinUrl = axios.get(dogecoinUrl);
               const fetchTetherUrl = axios.get(tetherUrl);
               const fetchPriceUrl = axios.get(priceUrl)

               return axios.all([fetchSolanaUrl, fetchRippleUrl, fetchEthereumUrl, fetchBitcoinUrl, fetchDogecoinUrl, fetchTetherUrl, fetchPriceUrl])
          }
          fetchCoins().then(axios.spread((solanaRes, rippleRes, ethereumRes, bitcoinRes, dogecoinRes, tetherRes, priceRes) => {

               dispatch(fetchCryptoSuccess({
                    ripple: {
                         history: rippleRes.data.prices.slice(0, 10),
                         usd: priceRes.data.ripple.usd,
                         usd_24h_change: priceRes.data.ripple.usd_24h_change,
                         name: "XRP",
                         fa_name: "ریپل"
                    },
                    bitcoin: {
                         history: bitcoinRes.data.prices.slice(0, 10),
                         usd: priceRes.data.bitcoin.usd,
                         usd_24h_change: priceRes.data.bitcoin.usd_24h_change,
                         name: "BTC",
                         fa_name: "بیتکوین"
                    },
                    dogecoin: {
                         history: dogecoinRes.data.prices.slice(0, 10),
                         usd: priceRes.data.dogecoin.usd,
                         usd_24h_change: priceRes.data.dogecoin.usd_24h_change,
                         name: "DOGE",
                         fa_name: "دوج‌کوین"
                    },
                    tether: {
                         history: tetherRes.data.prices.slice(0, 10),
                         usd: priceRes.data.tether.usd,
                         usd_24h_change: priceRes.data.tether.usd_24h_change,
                         name: "USDT",
                         fa_name: "تتر"
                    },
                    ethereum: {
                         history: ethereumRes.data.prices.slice(0, 10),
                         usd: priceRes.data.ethereum.usd,
                         usd_24h_change: priceRes.data.ethereum.usd_24h_change,
                         name: "ETH",
                         fa_name: "اتریوم"
                    },

               }))

          })).catch((error) => {
               fetchCryptoFailure(error?.message)
          });
     } catch (error: any) {
          dispatch(fetchCryptoFailure(error?.message));
     }
};

export const fetchLastWeekTransactions = (): AppThunk => async (dispatch) => {
     dispatch(fetchWeekTransactionsStart());
     try {
          const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
          dispatch(fetchWeekTransactionsSuccess(data.prices.slice(70,80)))
     } catch (error : any) {
          dispatch(fetchWeekTransactionsFailure(error?.message))
     }
}

export const fetchFavoriteCoins = (): AppThunk => async (dispatch) => {
     dispatch(fetchFavoriteCoinsStart());
     try {
          const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')
          const sortArray = data.sort((a, b) => b.circulating_supply - a.circulating_supply);
          // Most Favorite Coins section must be sorted by "circulating_supply "
          dispatch(fetchFavoriteCoinsSuccess(sortArray))
     } catch (error : any) {
          dispatch(fetchFavoriteCoinsFailure(error?.message))
     }
}




const initialState: ICryptoState = {
     loading: false,
     error: null,
     bitcoin: null,
     dogecoin: null,
     tether: null,
     ethereum: null,
     ripple: null,
     solana: null,
     lastWeekTransactions : null,
     favoriteCoins : null 
};

const cryptoSlice = createSlice({
     name: 'crypto',
     initialState,
     reducers: {
          fetchCryptoStart(state) {
               state.loading = true;
               state.error = null;
               console.log("Pending");
               
          },
          fetchCryptoSuccess(state, action: PayloadAction<any>) {
               state.loading = false;
               console.log("action Success => ",action.payload);
               
               state.bitcoin = action.payload.bitcoin;
               state.dogecoin = action.payload.dogecoin;
               state.tether = action.payload.tether;
               state.ethereum = action.payload.ethereum;
               state.ripple = action.payload.ripple
               state.solana = action.payload.solana
          },
          fetchCryptoFailure(state, action: PayloadAction<string>) {
               state.loading = false;
               console.log("ac");
               
               state.error = action.payload;
          },

          // value of last week's transactions
          fetchWeekTransactionsStart(state) {},
          fetchWeekTransactionsSuccess(state, action) {
               state.lastWeekTransactions = action.payload
          },
          fetchWeekTransactionsFailure(state, action) {
               state.lastWeekTransactions = action.payload
          },

          // value of faverit coins
          fetchFavoriteCoinsStart(state){},
          fetchFavoriteCoinsSuccess(state , action){
               state.favoriteCoins = action.payload
          },
          fetchFavoriteCoinsFailure(state , action){
               state.favoriteCoins = action.payload
          },


     },
});

export const {
     fetchCryptoStart,
     fetchCryptoSuccess,
     fetchCryptoFailure,
     
     fetchWeekTransactionsStart,
     fetchWeekTransactionsFailure,
     fetchWeekTransactionsSuccess,
     
     fetchFavoriteCoinsStart,
     fetchFavoriteCoinsSuccess,
     fetchFavoriteCoinsFailure,

} = cryptoSlice.actions;

export default cryptoSlice.reducer;

