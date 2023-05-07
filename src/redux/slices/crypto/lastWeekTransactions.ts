import { AppThunk } from "@/redux/store/store";
import { ICrypto_weekTransactions } from "@/types/crypto.types";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLastWeekTransactions = (): AppThunk => async (dispatch) => {
     dispatch(fetchWeekTransactionsStart());
     try {
          const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
          dispatch(fetchWeekTransactionsSuccess(data.prices.slice(70, 80)))
     } catch (error: any) {
          dispatch(fetchWeekTransactionsFailure(error?.message))
     }
}

const initialState: ICrypto_weekTransactions = {
     loading: false,
     error: null,
     data: null,
};


const cryptoSlice = createSlice({
     name: 'crypto_lastWeekTransactions',
     initialState,
     reducers: {
          fetchWeekTransactionsStart(state) {
               state.loading = true
          },
          fetchWeekTransactionsSuccess(state, action) {
               state.data = action.payload
               state.loading = false
          },
          fetchWeekTransactionsFailure(state, action) {
               state.error = action.payload
               state.loading = false
          },
     },
});

export const {
     fetchWeekTransactionsStart,
     fetchWeekTransactionsFailure,
     fetchWeekTransactionsSuccess
} = cryptoSlice.actions;

export default cryptoSlice.reducer;

