import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import store from '@/redux/store'


function App({ Component, pageProps }: AppProps) {

  const [buildingLoading, setBuildingLoading] = useState(false);
  Router.events.on('routeChangeStart', () => setBuildingLoading(true));
  Router.events.on('routeChangeComplete', () => setBuildingLoading(false));
  Router.events.on('routeChangeError', () => setBuildingLoading(false));

  return(
    <Provider store={store}>
      <Component {...pageProps} loading={buildingLoading} isBuildingPageLoading={buildingLoading}/>
      <ToastContainer 
        position="top-right" 
        autoClose={4000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={true} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="dark" 
      /> 
    </Provider>
  )
}
export default  App
