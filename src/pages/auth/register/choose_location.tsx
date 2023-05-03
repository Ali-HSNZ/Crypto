import { useFormik } from "formik";
import * as yup from 'yup'
import logo from '@/images/Logo.png'
import InputCommon from "@/common/InputCommon";
import Link from "next/link";
import ReactMapGL from 'react-map-gl';
// Map =>
import { useState } from "react";
import { Modal } from "@mui/material";
import Choose_provinces from "@/components/Choose_provinces";
 

const RegisterPage = () => {

     const [isOpenLocation,setIsOpenLocation] = useState<boolean>(false)
     
     return (  
          <section className="w-full sm:h-screen xl:p-8 bg-transparent flex flex-col md:flex-row">
               <Choose_provinces open={isOpenLocation} setOpen={setIsOpenLocation}/>
               {/* Info */}
               <div className="bg-white w-full md:w-[270px] md:min-w-[270px]">
                    <div className="bg-[#388AEA]  w-full h-full gap-x-6 px-6 py-6 md:py-16 flex justify-between md:justify-start md:flex-col xl:rounded-r-md   ">
                         <div className="w-fit md:w-full flex justify-center  items-center flex-col">
                              <img src={logo.src} alt="" className="w-24 md:w-36" />
                              <h1 className="font-iranyekan-extraBold text-2xl text-center text-blue-100 mt-6">ثبت نام</h1>
                         </div>
                         <div className="md:mt-10">
                              {/* Step 1 */}
                              <div className="flex items-center  md:flex-row gap-x-4">
                                   <div className="p-3 rounded-full bg-blue-100 border-2 border-blue-100 w-fit h-fit"></div>
                                   <p className="font-iranyekan-bold text-blue-50">اطلاعات کاربری</p>
                              </div>
                              <div className="w-2 px-3 h-fit rotate-90 border border-blue-50 my-6"></div>

                              {/* Step 2 */}
                              <div className="flex items-center gap-x-4">
                                   <div className="p-3 rounded-full bg-blue-100 border-2 border-blue-100 w-fit h-fit"></div>
                                   <p className="font-iranyekan-regular text-blue-200">اطلاعات ارتباطی</p>
                              </div>
                              <div className="w-2 px-3 h-fit rotate-90 border border-blue-300 my-6"></div>

                              {/* Step 3 */}
                              <div className="flex items-center gap-x-4">
                                   <div className="p-3 rounded-full bg-blue-400 border-2 border-blue-50 w-fit h-fit"></div>
                                   <p className="font-iranyekan-regular text-blue-200">اطلاعات مکانی</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Login Form */}
               <div className="bg-white w-full rounded-l-md pt-8 flex items-center flex-col h-full">
                    <div className="w-full  flex items-center flex-col flex-1">
                         <p className="font-iranyekan-bold text-blue-600 text-sm">مرحله ۳ از ۳</p>
                         <h1 className="text-lg mt-6 font-iranyekan-extraBold">لطفا اطلاعات خود را با دقت وارد نمائید</h1>
                         <section className="w-full lg:w-[700px] px-6 grid sm:grid-cols-2 mt-8 py-6 gap-4">
                              <InputCommon 
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                   }
                                   inputType="tel"
                                   title="استان"
                                   placeholder="مازندران"
                                   children={
                                        <button onClick={()=> setIsOpenLocation(!isOpenLocation)}>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                             </svg>
                                        </button>
                                   }
                              />
                              <InputCommon 
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                   }
                                   inputType="tel"
                                   title="شهر"
                                   placeholder="ساری"
                                   children={
                                        <button>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                             </svg>
                                        </button>
                                   }
                              />
                         </section>
                         <section className="w-full lg:w-[700px] px-6 mt-4">
                              <InputCommon 
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                        </svg>
                                   }
                                   inputType="tel"
                                   title="آدرس"
                                   placeholder="ایران مازندران ساری"
                              />
                         </section>
                         <section className="w-full lg:w-[700px] px-6 grid  sm:grid-cols-2 mt-8  py-6 gap-4">
                              <InputCommon 
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                   }
                                   inputType="tel"
                                   title="طول جغرافیایی"
                                   placeholder="۳۶.۷۵۸۹"
                              />
                              <InputCommon 
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                   }
                                   inputType="tel"
                                   title="عرض چغرافیایی"
                                   placeholder="۶۴.۵۶۹۱"
                              />
                         </section>
                         <button className="text-blue-600 text-sm font-iranyekan-bold">انتخاب طول و عرض جغرافیایی از روی نقشه</button>
                    </div>
                    <div className="w-full mt-6">
                         <hr className="w-full border-gray-300 "/>
                         <section className="w-full pb-6 flex justify-between items-center px-6">
                              <Link href={'/auth/register/check_information'} className="mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-600">
                                   مرحله قبل 
                              </Link>
                              <Link href={'/auth/login'} className="bg-blue-500 hover:bg-blue-600 duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3">
                                   مرحله بعد
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                   </svg>
                              </Link>
                         </section>
                    </div>
               </div>
          </section>
     );
}
 
export default RegisterPage;