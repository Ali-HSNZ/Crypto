import { combineReducers } from '@reduxjs/toolkit';
import { registerReducer } from '@/redux/slices/register';

import access_walletReducer from '@/redux/slices/crypto/access_wallet';
import priceChangesReducer from '../slices/crypto/priceChanges';
import lastWeekTransactionsReducer from '../slices/crypto/lastWeekTransactions';
import favoriteCoinsReducer from '@/redux/slices/crypto/favoriteCoins';
import tradingViewReducer from '@/redux/slices/crypto/tradingView';


const rootReducer = combineReducers({
     register : registerReducer,
     // crypto
     priceChange : priceChangesReducer,
     lastWeekTrasactions : lastWeekTransactionsReducer,
     access_wallet : access_walletReducer,
     favoriteCoins : favoriteCoinsReducer,
     tradingView : tradingViewReducer

})
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer