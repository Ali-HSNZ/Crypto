import TradingViewWidget from 'react-tradingview-widget';
import { fetchTradingView } from '@/redux/slices/crypto/tradingView';
import { TAppDispatch, TRootState } from '@/redux/store/store';
import { ICrypto_tradingView } from '@/types/crypto.types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TradingView = () => {

     const { data, loading, error } = useSelector<TRootState>(state => state.tradingView) as ICrypto_tradingView
     const dispatch = useDispatch<TAppDispatch>()

     useEffect(() => {
          dispatch(fetchTradingView())
     }, []);


     return (
          <div className='h-full w-full'>
               {data ? (
                    <section className='w-full h-full'>
                         {/* <TradingViewWidget
                              symbol='BITSTAMP:BTCUSD'
                              // theme={Themes.DARK}
                              autosize
                              interval='D'
                              timezone='Etc/UTC'
                              range='2W'
                              style='1'
                         /> */}
                    </section>
               ) : (
                    <div>Loading...</div>
               )}
          </div>
     );
}

export default TradingView;
