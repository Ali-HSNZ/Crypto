import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../store/store';
import { ICrypto_walletAssets} from '@/types/crypto.types';

export const fetchWalletAssets = (): AppThunk => async (dispatch) => {
     
     dispatch(fetchWalletAssetsStart());
     try {
          const {data} = await axios.get('http://localhost:5000/wallet')
          dispatch(fetchWalletAssetsSuccess(data))
          localStorage.setItem('access_wallet' , JSON.stringify(data))
     } catch (error : any) {
          dispatch(fetchWalletAssetsFailure(error?.message))
     }
}

const initialState : ICrypto_walletAssets = {
     loading: false,
     error: null,
     data: null,
};

const cryptoSlice = createSlice({
     name: 'crypto_walletAssets',
     initialState,
     reducers: {
          fetchWalletAssetsStart(state){
               state.loading = true,
               state.data = state.data
          },
          fetchWalletAssetsSuccess(state , action){
               state.data = action.payload
               state.loading = false
               state.error = null
          },
          fetchWalletAssetsFailure(state , action){
               state.data = null
               state.loading = false
               state.error = action.payload
          },
     },
});

export const {
     fetchWalletAssetsStart,
     fetchWalletAssetsSuccess,
     fetchWalletAssetsFailure,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;