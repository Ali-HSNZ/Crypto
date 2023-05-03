import { ThunkAction, configureStore ,Action} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {createWrapper} from 'next-redux-wrapper'
// import {Action} from 'redux'

const store = configureStore({
  reducer : rootReducer,
  devTools : true,
})

const makeStore = () => store

export type TRootState = ReturnType<AppStore['getState']>
export type TAppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof makeStore>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,TRootState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
