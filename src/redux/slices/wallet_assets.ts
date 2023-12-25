/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

import { createSlice } from '@reduxjs/toolkit'

import { type TCrypto_walletAssets } from '../../core/types/crypto.types'
import { type AppThunk } from '../store'

export const fetchWalletAssets = (): AppThunk => async (dispatch) => {
    dispatch(fetchWalletAssetsStart())
    try {
        const { data } = await axios.get('http://localhost:5000/wallet')
        dispatch(fetchWalletAssetsSuccess(data))
        localStorage.setItem('access_wallet', JSON.stringify(data))
    } catch (error: any) {
        dispatch(fetchWalletAssetsFailure(error?.message))
    }
}

const initialState: TCrypto_walletAssets = {
    loading: false,
    error: null,
    data: null,
}

const wallet_assets = createSlice({
    name: 'crypto_walletAssets',
    initialState,
    reducers: {
        fetchWalletAssetsStart(state) {
            ;(state.loading = true), (state.data = state.data)
            state.error = null
        },
        fetchWalletAssetsSuccess(state, action) {
            state.data = action.payload
            state.loading = false
            state.error = null
        },
        fetchWalletAssetsFailure(state, action) {
            state.data = null
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { fetchWalletAssetsStart, fetchWalletAssetsSuccess, fetchWalletAssetsFailure } = wallet_assets.actions

export default wallet_assets.reducer
