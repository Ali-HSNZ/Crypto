import { AppThunk, TAppDispatch, TRootState } from '@/redux/store';
import { TCrypto_walletAssetsResponse, ICrypto_walletAssets } from '@/types/crypto.types';
import { toPersianDigits } from '@/utils/toPersianDigits';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react'
import { fetchWalletAssets } from '@/redux/slices/wallet_assets';

const WalletAssets = () => {

  const { data, error } = useSelector<TRootState>(state => state.wallet_assets) as ICrypto_walletAssets

  const dispatch = useDispatch<TAppDispatch>()

  useEffect(() => {
    dispatch(fetchWalletAssets())
  }, [])

  // Render Label
  const renderCustomizedLabel = ({ symbol, cx, cy, midAngle, innerRadius, outerRadius }: { symbol: number, cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number }) => {

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">{symbol}</text>

  };

  //this function to generate a random color
  const generateColor = () => {

    // Use RGB encoding based on coin value
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  };


  return (
    <section className='w-full'>

      <div className="w-full p-0 bg-white pr-6 pt-6 rounded-lg h-[300px]">
        <div className="w-full h-full flex flex-row ">

          <div className=" flex flex-col  items-start h-full">
            <p className="font-iranyekan-bold  whitespace-nowrap">دارایی‌های کیف پول</p>
            {error && <p className='mt-4 text-red-500 font-quicksand-bold'>{error}</p>}

            <div className='mt-6 flex gap-y-4 flex-col items-start'>
              {data?.map((wallet: TCrypto_walletAssetsResponse) => (
                <div key={wallet.id} className="flex items-center justify-center gap-x-3">
                  {/* point */}
                  <div className="w-3 h-3 bg-[#F7931A] rounded-full"></div>

                  <h6 className="font-iranyekan-medium text-base">{wallet.name}</h6>
                  <p className="whitespace-nowrap text-gray-400 text-sm font-iranyekan-regular">{toPersianDigits(wallet.balance)} درصد</p>
                </div>
              ))}
            </div>

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
                    <Cell
                      className='outline-none focus:outline-none'
                      key={`cell-${index}`}
                      fill={generateColor()}
                    />
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

export default WalletAssets;