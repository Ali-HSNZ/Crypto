import { type Action,configureStore, type ThunkAction } from '@reduxjs/toolkit'

import { registerReducer } from './slices/register'
import wallet_assetsReducer from './slices/wallet_assets'

const store = configureStore({
    reducer: {
        register: registerReducer,
        wallet_assets: wallet_assetsReducer,
    },
})

export default store

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action>
