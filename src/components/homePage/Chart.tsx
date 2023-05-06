import { useDispatch, useSelector } from "react-redux";
import BarChartExample from "../BarChart";
import DoughnutChart from "../Doughnut";
import FavoriteCoins from "../FavoriteCoins";
import TradingView from "../TradingView";
import { TAppDispatch, TRootState } from "@/redux/store/store";
import { useEffect } from "react";
import { fetchAccessWallet } from "@/redux/slices/access_wallet";
import { toPersianDigits } from "@/utils/toPersianDigits";

const Chart = () => {

  const dispatch = useDispatch<TAppDispatch>()

  const { loading, data, error } = useSelector<TRootState>(state => state.access_wallet)

  useEffect(() => {
    dispatch(fetchAccessWallet())
  }, [])


  return (
    <section className="mt-8  flex flex-col lg:flex-row gap-6 font-iranyekan-bold">
      <div className="w-full ">
        <div className="w-full flex flex-col xl:flex-row justify-between  gap-6 ">

          {/* دارایی‌های کیف پول */}
          <div className="w-full p-0 bg-white pr-6 pt-6 rounded-lg h-[300px]">
            <div className="w-full h-full flex flex-row justify-center items-center">
              <div className=" flex flex-col gap-y-4 items-start h-full mt-8">
                <p className="font-iranyekan-bold text-lg whitespace-nowrap">دارایی‌های کیف پول</p>
                {data?.map((wallet: { name: string, balance: string }) => (
                  <div className="flex items-center justify-center gap-x-3">
                    <div className="w-3 h-3 bg-[#F7931A] rounded-full"></div>
                    <span className="">{wallet.name}</span>
                    <p className="whitespace-nowrap text-gray-400">{toPersianDigits(wallet.balance)} درصد</p>
                  </div>
                ))}
              </div>
              <div className="w-full h-full p-2">
                <DoughnutChart />
              </div>
            </div>
          </div>


          {/* ارزش معاملات هفته گذشته */}
          <div className="w-full p-6 bg-white rounded-lg flex flex-col justify-center items-start">
            <p>ارزش معاملات هفته گذشته</p>
            <br />
            <BarChartExample />
          </div>

        </div>
        {/* Trading View  */}
        <div className="w-full  bg-white mt-6 rounded-lg h-[450px] p-4 ">
          {/* <TradingView/> */}
        </div>

      </div>

      <div className="bg-white w-full lg:w-[450px] rounded-lg py-4 ">
        <FavoriteCoins />
      </div>

    </section>
  );
}

export default Chart;