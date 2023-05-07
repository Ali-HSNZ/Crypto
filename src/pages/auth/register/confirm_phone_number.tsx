import { useFormik } from "formik";
import logo from '@/images/Logo.png'
import InputCommon from "@/common/InputCommon";
import Link from "next/link";
import OTPInput from 'react-otp-input';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "@/redux/store/store";
import { useRouter } from "next/router";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { confirm_phone_number } from "@/redux/slices/register";
import { IRegister } from "src/types/register.types";
import Loading from "@/common/Loading";
import * as Yup from 'yup'
import { VALIDATION_PASSWORD } from "@/utils/regix";
import { toEnDigits } from "@/utils/methods";
import { fetchCrypto_priceChange } from "@/redux/slices/crypto/priceChanges";

const RegisterPage = ({ loading }: { loading: boolean }) => {

     const dispatch = useDispatch<TAppDispatch>()
     const { otp, phone, password } = useSelector<TRootState>(state => state.register) as IRegister

     useEffect(()=>{
          dispatch(fetchCrypto_priceChange())
     },[])

     const [isCurrectOtp, setIsCurrectOtp] = useState<boolean | null>(null)
     const [inputNumbers, setInputNumbers] = useState<string>('');

     const router = useRouter()


     const checkCurrectlyOtp = (): void => {
          if(otp !== ""){
               inputNumbers === otp ? setIsCurrectOtp(true) : setIsCurrectOtp(false)
          }else{
               setIsCurrectOtp(false)
          }
     }

     const onSubmit = (value: object): void => {
          dispatch(confirm_phone_number(value))
          router.push('/auth/register/contact_information')
     }

     const validationSchema = Yup.object({
          password: Yup.string()
               .required('رمز عبور الزامی میباشد')
               .min(6 , "رمز عبور نمی تواند کمتر از 6 کاراکتر باشد.")
               .test('validate', "رمز عبور معتبر نیست | رمز عبور میتواند ترکیبی از عدد و حروف انگلیسی باشد.", (values) => {
                    if (VALIDATION_PASSWORD.test(toEnDigits(values)))
                         return true;
                    else return false
               }),
     })


     const formik = useFormik({
          initialValues: {
               phone: phone ?? "",
               password: ""
          },
          onSubmit,
          validateOnMount: true,
          enableReinitialize: true,
          validationSchema
     })

     return (
          <section className="w-full h-full 2xl:h-screen xl:p-8 bg-transparent flex flex-col md:flex-row">
               {/* Info */}
               <div className="bg-white w-full md:w-[270px] md:min-w-[270px]">
                    <div className="bg-[#388AEA]  w-full h-full gap-x-6 px-6 py-6 md:py-16 flex justify-between md:justify-start md:flex-col xl:rounded-r-md   ">
                         <div className="w-fit md:w-full flex justify-center  items-center flex-col">
                              <img src={logo.src} alt="" className="w-24 md:w-32" />
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
                    {/* <section className="flex w-[700px] flex-col mt-8 flex-1 px-6 sm:px-14 py-6"> */}
                    <section className="flex w-full lg:w-[700px] flex-col mt-6 flex-1 px-6 sm:px-14 py-6 ">

                         <InputCommon
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                   </svg>
                              }
                              inputType="tel"
                              name="phone"
                              disabled={true}
                              formik={formik}
                              title="شماره همراه"
                              placeholder="۰۹۱۱۲۵۶۴۷۹۸"
                         />
                         <div className="flex items-center rounded-full mt-4 bg-[#E8F4FF] py-4 px-6 gap-x-4">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-700">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                              </svg>
                              <p className="text-xs font-iranyekan-regular leading-6">کد تائید به شماره {toPersianDigits(phone)} ارسال شده است. این کد تا ۰۲:۰۰ دقیقه دیگر معتبر است</p>
                         </div>
                         <p className="w-full text-center font-iranyekan-bold text-gray-800 mt-4">کد تائید</p>
                         <div className="w-full flex flex-row-reverse justify-center items-center mt-3">
                              <OTPInput
                                   value={inputNumbers}
                                   onChange={(num) => setInputNumbers(num)}
                                   numInputs={4}
                                   inputStyle={'text-red-500 p-6'}
                                   inputType="tel"
                                   containerStyle={'flex gap-x-4 flex-row-reverse'} //
                                   renderInput={(props) => <input {...props} disabled={isCurrectOtp === true} className={`border-2 otp_inputs ${isCurrectOtp === true ? "border-green-300" : isCurrectOtp === false ? "border-red-300" : "border-gray-300"} rounded-xl font-iranyekan-bold text-gray-700`} />}
                              />
                         </div>
                         <div className="w-full flex justify-center items-center flex-col gap-y-3">
                              <button type={"button"} disabled={isCurrectOtp === true} onClick={checkCurrectlyOtp} className={`disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 duration-150 font-iranyekan-bold text-blue-100 w-fit px-6 py-3 rounded-xl mt-4`}>تایید شماه همراه</button>
                              <section className="mt-6 w-full">
                                   <InputCommon
                                        icon={
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                             </svg>
                                        }
                                        inputType="password"
                                        name="password"
                                        formik={formik}
                                        title="رمز عبور"
                                        placeholder="حداقل ۸ کاراکتر"
                                   />
                              </section>
                         </div>
                    </section>
                    <hr className="w-full border-gray-300" />
                    <section className="w-full pb-6 flex justify-between items-center px-6">
                         <Link href={'/auth/register/contact_information'} className="mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-600">
                              مرحله قبل
                         </Link>
                         <button type={'submit'} disabled={!isCurrectOtp || loading} className={`disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600     duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}>
                              {loading ? (
                                   <Loading color="white" scale={20} type="spin" />
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