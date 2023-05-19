import { TCrypto_weekTransactions } from '@/types/crypto.types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';


const WeekTrasactions = ({ weekTransactions }: { weekTransactions: TCrypto_weekTransactions }) => {

  return (
    <div className="w-full p-6 bg-white rounded-lg font-iranyekan-regular flex flex-col justify-center items-start">
      <p className='font-iranyekan-bold'>ارزش معاملات هفته گذشته</p>
      <br />
      <ResponsiveContainer width="99%" height="100%">
        <BarChart
          width={10}
          height={300}
          data={weekTransactions || []}
          cx={0}
          cy={0}
          innerRadius={20}
          outerRadius={50}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis tickMargin={10} axisLine={false} tick={false} />
          <YAxis tickMargin={45} tickFormatter={(value) => new Intl.NumberFormat('fa-IR').format(value)} axisLine={false} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Bar dataKey="1" radius={5} fill="#388AEA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeekTrasactions;
