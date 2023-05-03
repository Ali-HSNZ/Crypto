import { useFormik } from "formik";
import * as yup from 'yup'
import logo from '@/images/Logo.png'
import InputCommon from "@/common/InputCommon";
import Link from "next/link";
import OTPInput  from 'react-otp-input';
import { useState } from "react";

const RegisterPage = () => {

     const [otp, setOtp] = useState('654654');
     const handleOTPChange = (otp: string) => {
          setOtp(otp);
        };

     return (  
          <section className="w-full h-screen xl:p-8 bg-transparent flex flex-col md:flex-row">
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
                                   <div className="p-3 rounded-full bg-blue-400 border-2 border-blue-50 w-fit h-fit"></div>
                                   <p className="font-iranyekan-regular text-blue-200">اطلاعات ارتباطی</p>
                              </div>
                              <div className="w-2 px-3 h-fit rotate-90 border border-blue-300 my-6"></div>

                              {/* Step 3 */}
                              <div className="flex items-center gap-x-4">
                                   <div className="p-3 rounded-full bg-blue-400  w-fit h-fit"></div>
                                   <p className="font-iranyekan-regular text-blue-200">اطلاعات مکانی</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Login Form */}
               <div className="bg-white w-full rounded-l-md pt-8 flex items-center flex-col h-full">
                    <p className="font-iranyekan-bold text-blue-600 text-sm">مرحله ۲ از ۳</p>
                    <h1 className="text-lg mt-6 font-iranyekan-extraBold">لطفا اطلاعات خود را با دقت وارد نمائید</h1>
                    {/* <section className="flex w-[700px] flex-col mt-8 flex-1 px-6 sm:px-14 py-6"> */}
                    <section className="flex w-full lg:w-[700px] flex-col mt-8 flex-1 px-6 sm:px-14 py-6 ">

                         <InputCommon 
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                   </svg>
                              }
                              inputType="tel"
                              title="شماره همراه"
                              placeholder="۰۹۱۱۲۵۶۴۷۹۸"
                         />
                         <div className="flex items-center rounded-full mt-4 bg-[#E8F4FF] py-4 px-6 gap-x-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-700">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                              </svg>
                              <p className="text-xs font-iranyekan-regular leading-6">کد تائید به شماره ۰۹۰۱۵۶۷۱۳۴۶ ارسال شده است. این کد تا ۰۲:۰۰ دقیقه دیگر معتبر است</p>
                         </div>
                         <p className="w-full text-center font-iranyekan-bold text-gray-800 mt-6">کد تائید</p>
                         <div className="w-full flex flex-row-reverse justify-center items-center mt-4">
                              <OTPInput 
                                   value={otp}
                                   onChange={handleOTPChange}
                                   numInputs={4}
                                   inputStyle={'text-red-500 p-6'}
                                   inputType="tel"
                                   containerStyle={'flex gap-x-4 flex-row-reverse'}
                                   renderInput={(props) => <input {...props} className="border-2 otp_inputs rounded-xl"/>}
                             />
                         </div>
                         <div className="w-full flex justify-center items-center">
                              <button className="bg-blue-600 hover:bg-blue-700 duration-150 font-iranyekan-bold text-blue-100 w-fit px-6 py-3 rounded-xl mt-6">تایید شماه همراه</button>
                         </div>
                    </section>
                    <hr className="w-full border-gray-300"/>
                    <section className="w-full pb-6 flex justify-between items-center px-6">
                         <Link href={'/auth/register/contact_information'} className="mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-600">
                              مرحله قبل 
                         </Link>
                         <Link href={'/auth/register/check_information'} className="bg-blue-500 hover:bg-blue-600 duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3">
                              مرحله بعد
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                              </svg>
                         </Link>
                    </section>
               </div>
          </section>
     );
}
 
export default RegisterPage;