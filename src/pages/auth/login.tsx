import { useFormik } from "formik";
import * as yup from 'yup'
import logo from '@/images/Logo.png'
import Rectangle from '@/images/Rectangle.png'
import Link from "next/link";
import InputCommon from "@/common/InputCommon";
import axios from 'axios'
import { toast } from "react-toastify";
import { VALIDATION_EMAIL } from "@/utils/regix";
import { toEnDigits } from "@/utils/methods";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "@/common/Loading";
import { toastify } from "@/utils/toast";

const LoginPage = () => {

     const [loading, setLoading] = useState<boolean>(false)

     const router = useRouter()
     const onSubmit = (values: { email: string, password: string }) => {
          setLoading(true)
          axios.post('https://apingweb.com/api/login', {
               email: values.email,
               password: toEnDigits(values.password)
          }, { headers: { "Content-Type": 'application/json' } })
               .then(res => {
                    setLoading(false)
                    toast.success("با موفقیت لاگین شده‌اید.")
                    setTimeout(() => {
                         router.push('/')
                    }, 1500);
               })
               .catch(error => {
                    setLoading(false)
                    // error?.response?.data?.errors.forEach((message: string) => toast.error(message))
                    toastify({message : error?.response?.data?.message ?? "خطای احراز هویت" , type : 'error'})
               })
     }

     const initialValues = {
          email: "",
          password: ""
     }

     const validationSchema = yup.object({
          email: yup.string()
               .required('ایمیل الزامی میباشد.')
               .test('validate', "ایمیل وارد شده معتبر نیست.", (values) => {
                    if (VALIDATION_EMAIL.test(values))
                         return true;
                    else return false
               }),
          password:
               yup.string()
                    .required('password must be required')
                    .max(16, 'password cannot be longer than 24 characters '),
     })

     const formik = useFormik({
          onSubmit,
          initialValues,
          validationSchema
     })

     return (
          <section className="w-full h-screen lg:p-8 grid grid-cols-1 bg-transparent md:grid-cols-2">
               {/* Info */}
               <div className="bg-white">
                    <div className="bg-[#388AEA]   w-full  rounded-none lg:rounded-r-md h-full gap-x-6 px-6 py-2 md:py-16 hidden sm:flex flex-row-reverse md:inline-block">
                         <div className="w-full py-6">
                              <h2 className="w-full text-2xl lg:text-3xl text-center text-blue-50 font-iranyekan-extraBold">صرافی ارز دیجیتال نیوکوین اسپیس</h2>
                              <div className="w-full text-center mt-4 md:mt-8">
                                   <p className="w-full font-iranyekan-regular text-white text-sm leading-7">خرید و فروش امن بیت‌کوین و ارزهای دیجیتال</p>
                                   <p className="w-full font-iranyekan-regular text-white text-sm leading-7">به بزرگترین بازار ارز دیجیتال ایران بپیوندید</p>
                              </div>
                         </div>
                         <div className="flex justify-center md:mt-2 ">
                              <img src={Rectangle.src} alt="" className="h-auto w-[100px] md:w-[200px] lg:w-[220px] " />
                         </div>
                    </div>
               </div>

               {/* Login Form */}
               <form onSubmit={formik.handleSubmit} className="bg-white w-full rounded-l-md py-16 flex items-center flex-col h-full">
                    <div>
                         <img src={logo.src} alt="" className="w-20" />
                    </div>
                    <h1 className="text-2xl font-iranyekan-extraBold mt-6">ورود به داشبورد</h1>
                    <Link href={'/auth/register'} className="font-iranyekan-bold text-sm hover:underline underline-offset-4 text-[#388AEA] mt-4">هنوز ثبت نام نکرده‌اید؟</Link>
                    <section className="flex w-full flex-col mt-8 px-6 sm:px-14 py-6 gap-y-10">
                         <InputCommon
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[23px] h-[23px] text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                   </svg>
                              }
                              inputType="email"
                              formik={formik}
                              name="email"
                              title="ایمیل"
                              placeholder="exmaple@gmail.com"
                         />
                         <InputCommon
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[21px] h-[21px] text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                   </svg>
                              }
                              inputType="password"
                              formik={formik}
                              name="password"
                              title="رمز عبور"
                              placeholder="حداقل ۸ کاراکتر"
                         />
                    </section>
                    <button type={'submit'} disabled={loading} className={`${!formik.isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}  disabled:bg-gray-400 disabled:cursor-not-allowed  duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}>
                         {loading ? (
                              <Loading color="white" scale={20} type="spin" />
                         ) : (
                              <>
                                   ورود به حساب
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                   </svg>
                              </>
                         )}
                    </button>
               </form>
          </section>
     );
}

export default LoginPage;