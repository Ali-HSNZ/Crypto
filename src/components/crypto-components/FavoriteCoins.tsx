import { TCrypto_favoriteCoinsRes } from "@/types/crypto.types";
import { toPersianDigits } from "@/utils/methods";
import { truncateNumber } from "@/utils/methods";


const FavoriteCoins = ({ favoriteCoins }: { favoriteCoins: Array<TCrypto_favoriteCoinsRes> }) => {

     return (
          <div className="bg-white relative w-full overflow-hidden lg:w-[300px] rounded-lg py-4 ">

               <div className="w-full flex justify-between items-center px-4">
                    <p className="font-iranyekan-bold ">محبوب ترین ارزها</p>
                    <button className="border-2 px-4 font-iranyekan-regular py-2 text-sm rounded-lg text-gray-400 flex items-center gap-x-2">
                         هفته
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                         </svg>
                    </button>
               </div>
               <div className="flex flex-row justify-between mt-6 px-4">
                    <p className="text-sm text-gray-500 font-iranyekan-regular">نام</p>
                    <p className="text-sm text-gray-500 font-iranyekan-regular">۲۴ ساعت گذشته</p>
               </div>
               <section className=" xl:max-h-[700px] overflow-y-auto flex flex-col mt-4">
                    {favoriteCoins?.map((item: TCrypto_favoriteCoinsRes, index: number) => (
                         <div key={index} className="w-full flex flex-row items-center justify-between px-4 py-3 border-t first:border-t-0">
                              <div className="flex gap-x-4 items-center">
                                   <img className="w-10  object-cover " src={item?.image} alt="" />
                                   <div className="flex gap-x-2">
                                        <p className="text-sm font-quicksand-medium">{item.name}</p>
                                        <p className="text-xs font-quicksand-bold text-gray-400">{String(item?.symbol).toUpperCase()}</p>
                                   </div>
                              </div>
                              <p className={`text-sm font-iranyekan-regular ${item.price_change_24h > 0 ? "text-green-600" : "text-red-600"}`}>
                                   {toPersianDigits(truncateNumber(item?.price_change_24h, 3))}
                              </p>
                         </div>
                    ))}

               </section>
               <div className="bg-gradient-to-b from-transparent  to-white absolute left-0 right-0 w-full bottom-0 h-1/6"></div>
          </div>
     );
}

export default FavoriteCoins;