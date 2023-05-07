import { ThunkAction, configureStore, Action } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

// import {Action} from 'redux'
const masterReducer = (state : any, action : any) => {
  if (action.type === HYDRATE) {
    // Save Previous State & Previous Payload
    return { ...state, ...action.payload }
  }
  return rootReducer(state, action)
};

const store = configureStore({
  reducer: masterReducer,
  devTools: true,
})

const makeStore = () => store



export type TRootState = ReturnType<AppStore['getState']>
export type TAppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof makeStore>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
