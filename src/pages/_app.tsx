import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { TAppDispatch, wrapper} from '@/redux/store/store'


function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default wrapper.withRedux(App)
