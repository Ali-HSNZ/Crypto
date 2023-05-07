import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '@/redux/store/store';
import { ICrypto_favoriteCoins, TFavoriteCoinsResponse } from '@/types/crypto.types';


export const fetchFavoriteCoins = (): AppThunk => async (dispatch) => {
     dispatch(fetchFavoriteCoinsStart());
     try {
          const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h')
          const sortArray = data.sort((a: TFavoriteCoinsResponse, b: TFavoriteCoinsResponse) => b.circulating_supply - a.circulating_supply);
          dispatch(fetchFavoriteCoinsSuccess(sortArray))
     } catch (error: any) {
          dispatch(fetchFavoriteCoinsFailure(error?.message))
     }
}


const initialState: ICrypto_favoriteCoins = {
     loading: false,
     error: null,
     data: null
};

const cryptoSlice = createSlice({
     name: 'crypto_favoriteCoins',
     initialState,
     reducers: {
          fetchFavoriteCoinsStart(state) {
               state.loading = true
          },
          fetchFavoriteCoinsSuccess(state, action) {
               state.data = action.payload
          },
          fetchFavoriteCoinsFailure(state, action) {
               state.error = action.payload
               state.data = null
          },
     },
});

export const {
     fetchFavoriteCoinsStart,
     fetchFavoriteCoinsSuccess,
     fetchFavoriteCoinsFailure,

} = cryptoSlice.actions;

export default cryptoSlice.reducer;