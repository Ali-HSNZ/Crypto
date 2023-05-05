import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper} from '@/redux/store/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Router } from 'next/router';

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', () => setLoading(true));
  Router.events.on('routeChangeComplete', () => setLoading(false));
  Router.events.on('routeChangeError', () => setLoading(false));

  return(
    <>
      <Component {...pageProps} loading={loading}/>
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
    </>
  )
}
export default wrapper.withRedux(App)
