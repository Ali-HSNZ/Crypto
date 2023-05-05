import { useFormik } from "formik";
import * as yup from 'yup'
import logo from '@/images/Logo.png'
import InputCommon from "@/common/InputCommon";
import Link from "next/link";
import { useRouter } from "next/router";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { VALIDATION_EMAIL, VALIDATION_NATIONAL_CODE, VALIDATION_PERSIAN_ALPHABET, VALIDATION_PHONE_NUMBER } from "@/utils/regix";
import { toEnDigits } from "@/utils/methods";
import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "@/redux/store/store";
import { contact_information, sendOTPcode } from "@/redux/slices/auth/register";
import { IRegister } from "src/types/register.types";
import Loading from "@/common/Loading";
import { useEffect } from "react";


const RegisterPage = ({loading}) => {

     const dispatch = useDispatch<TAppDispatch>()
     const {step , email , phone} = useSelector<TRootState>(state => state.register) as IRegister
     

     type TValues = {
          phone : string,
          email : string
     }


     const router = useRouter()

     const sendOtpCode_handler = () => {
          dispatch(sendOTPcode(formik.values.phone))
          router.push('/auth/register/confirm_phone_number')
     }

     const initialValues : TValues = {
          phone : phone ? toPersianDigits(phone) : "",
          email : email ? email :  "",
     }
     const onSubmit = (values : TValues) => {
          dispatch(contact_information(values))
          router.push('/auth/register/choose_location')
     }
     const validationSchema = yup.object({
          phone : yup.string()
               .required('شماره موبایل الزامی میباشد.')
               .test('validate',"شماره موبایل وارد شده معتبر نیست." , (values) => {
                    if(VALIDATION_PHONE_NUMBER.test(toEnDigits(values)))
                    return true;
                    else return false
               }),
          email : yup.string()
               .required('ایمیل الزامی میباشد.')
               .test('validate',"ایمیل وارد شده معتبر نیست." , (values) => {
                    if(VALIDATION_EMAIL.test(values))
                    return true;
                    else return false
               })
     })

     const formik = useFormik({
          initialValues,
          onSubmit,
          validationSchema,
          validateOnMount : true,
          enableReinitialize : true,
     })
     
     return (  
          <section className="w-full h-screen xl:p-8 bg-transparent flex flex-col md:flex-row">

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
               <form onSubmit={formik.handleSubmit} className="bg-white w-full rounded-l-md pt-8 flex items-center flex-col h-full">
                    <p className="font-iranyekan-bold text-blue-600 text-sm">مرحله ۲ از ۳</p>
                    <h1 className="text-lg mt-6 font-iranyekan-extraBold">لطفا اطلاعات خود را با دقت وارد نمائید</h1>
                    <section className="flex w-full lg:w-[700px] flex-col mt-8 flex-1 px-6 sm:px-14 py-6 gap-y-10">
                         <InputCommon 
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                   </svg>
                              }
                              inputType="tel"
                              title="شماره همراه"
                              placeholder="۰۹۱۱۲۵۶۴۷۹۸"
                              formik={formik}
                              name="phone"
                              maxLength={11}
                              disabled={step === "confirm_phone_number"}
                              children={
                                   <>
                                        {!formik.errors.phone && step !== "confirm_phone_number" && <button type="button" onClick={sendOtpCode_handler} className="font-iranyekan-bold text-sm text-blue-500 hover:text-blue-600">ارسال کد</button>}
                                   </>
                              }
                         />
                         <InputCommon 
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                   </svg>
                              }
                              inputType="email"
                              name="email"
                              title="ایمیل"
                              placeholder="example@gmail.com"
                              formik={formik}

                         />
                    </section>
                    <hr className="w-full border-gray-300"/>
                    <section className="w-full pb-6 flex justify-between items-center px-6">
                         <Link href={'/auth/register'} className="mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-600">
                              مرحله قبل 
                         </Link>
                         <button type={'submit'} disabled={step !== "confirm_phone_number"} className={`${step !== "confirm_otp" && !formik.isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}  disabled:bg-gray-600 disabled:cursor-not-allowed  duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}>
                              {loading ? (
                                   <Loading color="white" scale={20} type="spin"/>
                              ) : (
                                   <>
                                        مرحله بعد 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                        </svg>
                                   </>
                              )}
                         </button>
                    </section>
               </form>
          </section>
     );
}
 
export default RegisterPage;