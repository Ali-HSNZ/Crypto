import axios from 'axios';
import { useState, useEffect } from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const TradingView = () => {
     const [data, setData] = useState(null);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const response = await axios.get(
                         'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14'
                    );
                    setData(response.data);
               } catch (error) {
                    console.log(error);
               }
          };
          fetchData();
     }, []);


     return (
          <div className='h-full w-full'>
               {data ? (
                    <TradingViewWidget
                         symbol='BITSTAMP:BTCUSD'
                         // theme={Themes.DARK}
                         autosize
                         interval='D'
                         timezone='Etc/UTC'
                         range='2W'
                         style='1'
                    />
               ) : (
                    <div>Loading...</div>
               )}
          </div>
     );
}

export default TradingView;
