import { combineReducers } from '@reduxjs/toolkit';
import { registerReducer } from '../slices/auth/register';
import cryptoReducer from '../slices/crypto';


const rootReducer = combineReducers({
     register : registerReducer,
     crypto : cryptoReducer
})
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer