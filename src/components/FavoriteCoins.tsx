import { TAppDispatch, TRootState } from "@/redux/store/store";
import { ICryptoState } from "@/types/crypto.types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import { fetchFavoriteCoins, fetchLastWeekTransactions } from "@/redux/slices/crypto";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { truncateNumber } from "@/utils/methods";
const FavoriteCoins = () => {

     const dispatch = useDispatch<TAppDispatch>()
     const { favoriteCoins } = useSelector<TRootState>(state => state.crypto) as ICryptoState

     useEffect(()=>{
          dispatch(fetchFavoriteCoins())
     },[])
     console.log("favoriteCoins : ",favoriteCoins);
     

     return (
          <>
               <div className="w-full flex justify-between items-center px-4">
                    <p>محبوب ترین ارزها</p>
                    <button className="border-2 px-4 py-2 rounded-lg text-gray-400 flex gap-x-2">
                         هفته
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                         </svg>
                    </button>
               </div>
               <div className="flex flex-row justify-between font-iranyekan-regular mt-6 px-4">
                    <p>نام</p>
                    <p>۲۴ ساعت گذشته</p>
               </div>
               <section className="relative">
                    {favoriteCoins?.map((item, index) => (
                         <div key={index} className="w-full flex flex-row items-center justify-between mt-6 border-b-2 pb-2 px-4">
                              <div className="flex gap-x-4 items-center">
                                   <img className="w-12  object-cover" src={item?.image} alt="" />
                                   <div className="flex gap-x-2">
                                        <p>{item?.name}</p>
                                        <p className="font-iranyekan-bold text-gray-400">{String(item?.symbol).toUpperCase()}</p>
                                   </div>
                              </div>
                              {/* <p className="text-green-500">۱.۶۸%+</p> */}
                              <p className={`${item?.price_change_24h > 0 ? "text-green-600" : "text-red-600"}`}>{toPersianDigits(truncateNumber(item?.price_change_24h,3))}</p>

                         </div>
                    ))}
                    {/* backDrop */}
                    <div className="bg-gradient-to-b from-transparent  to-white absolute left-0 right-0 w-full bottom-0 h-1/6"></div>

               </section>
          </>
     );
}

export default FavoriteCoins;