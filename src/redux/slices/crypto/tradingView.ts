import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../../store/store';
import { ICrypto_tradingView } from '@/types/crypto.types';

export const fetchTradingView = (): AppThunk => async (dispatch) => {
     dispatch(fetchTradingViewStart());
     try {
          const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14')
          dispatch(fetchTradingViewSuccess(data))
     } catch (error : any) {
          dispatch(fetchTradingViewFailure(error?.message))
     }
}

const initialState : ICrypto_tradingView = {
     loading: false,
     error: null,
     data: null,
};

const cryptoSlice = createSlice({
     name: 'crypto_tradingView',
     initialState,
     reducers: {
          fetchTradingViewStart(state){
               state.loading = true,
               state.data = state.data
          },
          fetchTradingViewSuccess(state , action){
               state.data = action.payload
               state.loading = false
               state.error = null
          },
          fetchTradingViewFailure(state , action){
               state.data = null
               state.loading = false
               state.error = action.payload
          },
     },
});

export const {
     fetchTradingViewFailure,
     fetchTradingViewStart,
     fetchTradingViewSuccess
} = cryptoSlice.actions;

export default cryptoSlice.reducer;