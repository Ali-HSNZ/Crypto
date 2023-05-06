import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../store/store';

export const fetchAccessWallet = (): AppThunk => async (dispatch) => {
     dispatch(fetchAccessWalletStart());
     try {
          const {data} = await axios.get('http://localhost:5000/wallet')
          dispatch(fetchAccessWalletSuccess(data))
     } catch (error : any) {
          dispatch(fetchAccessWalletFailure(error?.message))
     }
}

const initialState = {
     loading: false,
     error: null,
     data: null,
};

const cryptoSlice = createSlice({
     name: 'access_wallet',
     initialState,
     reducers: {
          fetchAccessWalletStart(state){
               state.loading = true,
               state.data = state.data
          },
          fetchAccessWalletSuccess(state , action){
               state.data = action.payload
               state.loading = false
               state.error = null
          },
          fetchAccessWalletFailure(state , action){
               state.data = null
               state.loading = false
               state.error = action.payload
          },

     },
});

export const {
     fetchAccessWalletFailure,
     fetchAccessWalletStart,
     fetchAccessWalletSuccess

} = cryptoSlice.actions;

export default cryptoSlice.reducer;

