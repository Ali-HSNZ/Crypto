import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { useState } from 'react'

import store from '@redux/store'

import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }: AppProps) {
    const [isBuildingPageLoading, setIsBuildingLoading] = useState(false)

    Router.events.on('routeChangeStart', () => setIsBuildingLoading(true))
    Router.events.on('routeChangeComplete', () => setIsBuildingLoading(false))
    Router.events.on('routeChangeError', () => setIsBuildingLoading(false))

    return (
        <Provider store={store}>
            <Component {...pageProps} isBuildingPageLoading={isBuildingPageLoading} />
            <ToastContainer
                position='top-right'
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </Provider>
    )
}
export default App
