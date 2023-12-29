import { Router } from 'next/router'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { useState } from 'react'

import store from '@redux/store'

import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App({ Component, pageProps }: any) {
    const [isBuildingPageLoading, setIsBuildingLoading] = useState(false)

    Router.events.on('routeChangeStart', () => setIsBuildingLoading(true))
    Router.events.on('routeChangeComplete', () => setIsBuildingLoading(false))
    Router.events.on('routeChangeError', () => setIsBuildingLoading(false))

    // Wrap Component with a div to fix the JSX type issue
    return (
        <Provider store={store}>
            <Component isBuildingPageLoading={isBuildingPageLoading} {...pageProps} />
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
