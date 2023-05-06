import { fetchAccessWallet } from '@/redux/slices/access_wallet';
import { TAppDispatch, TRootState } from '@/redux/store/store';
import React, { PureComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     id: 1,
//     name: "Ethereum",
//     symbol: "ETH",
//     value: 30
//   },
//   {
//     id: 3,
//     name: "Bitcoin",
//     symbol: "BTC",
//     value: 45
//   },
//   {
//     id: 2,
//     name: "TRON",
//     symbol: "TRON",
//     value: 25
//   },
// ];



const COLORS = ['#7EB6F7', '#F7931A', '#2E2E2E',];


const renderCustomizedLabel = ({ symbol, cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {symbol}
    </text>
  );
};

const Doughnut = () => {

  
  const dispatch = useDispatch<TAppDispatch>()

  const {loading , data, error} = useSelector<TRootState>(state => state.access_wallet) 

  useEffect(()=>{
    dispatch(fetchAccessWallet())
  },[])

  console.log("data : ",data);
  

  return (
    <ResponsiveContainer width={'99%'} height={'100%'}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={"100%"}
          innerRadius={0}
          strokeWidth={5}
          cornerRadius={8}
          fill="#8884d8"
          dataKey="balance"
        >
          {data?.map((entry, index) => (
            <Cell className='outline-none focus:outline-none' key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Doughnut