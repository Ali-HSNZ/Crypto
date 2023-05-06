import { combineReducers } from '@reduxjs/toolkit';
import { registerReducer } from '../slices/auth/register';
import cryptoReducer from '../slices/crypto';
import access_walletReducer from '../slices/access_wallet';


const rootReducer = combineReducers({
     register : registerReducer,
     crypto : cryptoReducer,
     access_wallet : access_walletReducer
})
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer