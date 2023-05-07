import { AppThunk } from "@/redux/store/store";
import { ICrypto_priceChanges } from "@/types/crypto.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCrypto_priceChange = (): AppThunk => async (dispatch) => {
     dispatch(fetchCrypto_priceChangeStart());
     try {
          const fetchCoins = () => {
               // response => usd , usd_24h_change 
               const priceUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ripple,ethereum,bitcoin,dogecoin,tether&vs_currencies=usd&include_24hr_change=true';
               
               // bitcoin , dogecoin , tether , ...
               const ethereumUrl = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=365';
               const bitcoinUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365';
               const dogecoinUrl = 'https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=usd&days=365';
               const tetherUrl = 'https://api.coingecko.com/api/v3/coins/tether/market_chart?vs_currency=usd&days=365';
               const rippleUrl = 'https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=365';


               const fetchRippleUrl = axios.get(rippleUrl);
               const fetchEthereumUrl = axios.get(ethereumUrl);
               const fetchBitcoinUrl = axios.get(bitcoinUrl);
               const fetchDogecoinUrl = axios.get(dogecoinUrl);
               const fetchTetherUrl = axios.get(tetherUrl);
               const fetchPriceUrl = axios.get(priceUrl)

               return axios.all([fetchRippleUrl, fetchEthereumUrl, fetchBitcoinUrl, fetchDogecoinUrl, fetchTetherUrl, fetchPriceUrl])
          }
          fetchCoins().then(axios.spread((rippleRes, ethereumRes, bitcoinRes, dogecoinRes, tetherRes, priceRes) => {

               dispatch(fetchCrypto_priceChangeSuccess({
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
               fetchCrypto_priceChangeFailure(error?.message)
          });
     } catch (error: any) {
          dispatch(fetchCrypto_priceChangeFailure(error?.message));
     }
};

const initialState: ICrypto_priceChanges = {
     loading: false,
     error: null,
     bitcoin: null,
     dogecoin: null,
     tether: null,
     ethereum: null,
     ripple: null,
};

const cryptoSlice = createSlice({
     name: 'crypto_priceChange',
     initialState,
     reducers: {
          fetchCrypto_priceChangeStart(state) {
               state.loading = true;
               state.error = null;
          },
          fetchCrypto_priceChangeSuccess(state, action: PayloadAction<any>) {
               state.loading = false;
               state.bitcoin = action.payload.bitcoin;
               state.dogecoin = action.payload.dogecoin;
               state.tether = action.payload.tether;
               state.ethereum = action.payload.ethereum;
               state.ripple = action.payload.ripple
          },
          fetchCrypto_priceChangeFailure(state, action: PayloadAction<any>) {
               state.loading = false;
               state.error = action.payload;
          },
     },
});

export const {
     fetchCrypto_priceChangeStart,
     fetchCrypto_priceChangeSuccess,
     fetchCrypto_priceChangeFailure,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
