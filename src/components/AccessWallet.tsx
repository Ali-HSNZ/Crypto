import { fetchAccessWallet } from '@/redux/slices/crypto/access_wallet';
import { TAppDispatch, TRootState } from '@/redux/store/store';
import { TCrypto_accessWalletResponse } from '@/types/crypto.types';
import { ICrypto_accessWallet } from '@/types/crypto.types';
import { toPersianDigits } from '@/utils/toPersianDigits';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';




const renderCustomizedLabel = (
  { symbol,
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius
  }: {
    symbol: number
    cx: number,
    cy: number,
    midAngle: number,
    innerRadius: number,
    outerRadius: number
  }
) => {

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">{symbol}</text>
  );
};

const AccessWallet = () => {

  const COLORS = ['#7EB6F7', '#F7931A', '#2E2E2E',];



  const { loading, data, error } = useSelector<TRootState>(state => state.access_wallet) as ICrypto_accessWallet

  
  const dispatch = useDispatch<TAppDispatch>()

  useEffect(() => {
    dispatch(fetchAccessWallet())
  }, [])

  return (
    <section className='w-full'>

      <div className="w-full p-0 bg-white pr-6 pt-6 rounded-lg h-[300px]">
        <div className="w-full h-full flex flex-row ">
          <div className=" flex flex-col gap-y-4 items-start h-full">
            <p className="font-iranyekan-bold text-lg whitespace-nowrap">دارایی‌های کیف پول</p>
            {data?.map((wallet: TCrypto_accessWalletResponse) => (
              <div key={wallet.id} className="flex items-center justify-center gap-x-3">
                <div className="w-3 h-3 bg-[#F7931A] rounded-full"></div>
                <span className="">{wallet.name}</span>
                <p className="whitespace-nowrap text-gray-400">{toPersianDigits(wallet.balance)} درصد</p>
              </div>
            ))}
          </div>
          <div className="w-full h-full p-2">
            <ResponsiveContainer width={'99%'} height={'100%'}>
              <PieChart width={400} height={400}>
                <Pie
                  data={data ?? []}
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
                  {data?.map((entry: any, index: number) => (
                    <Cell className='outline-none focus:outline-none' key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>
    </section>

  );
}

export default AccessWallet