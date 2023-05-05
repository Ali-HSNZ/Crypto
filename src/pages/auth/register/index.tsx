import logo from '@/images/Logo.png'

//? Date Picker =>
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/layouts/mobile.css"

import {useEffect, useRef, useState} from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch, TRootState } from '@/redux/store/store';
import InputCommon from '@/common/InputCommon';
import { person_information } from '@/redux/slices/auth/register';

//? utils
import { toPersianDigits } from '@/utils/toPersianDigits';
import { toEnDigits } from '@/utils/methods';
import { 
     VALIDATION_NATIONAL_CODE, 
     VALIDATION_PERSIAN_ALPHABET 
} from '@/utils/regix';

import { useRouter } from 'next/router';
import Loading from '@/common/Loading'

interface IRegister {
     name : string
     national_code : string
     birthday : string
     phone : string
     email : string
     province : string
     city : string
     address : string
     x_position : string
     y_position : string
     step : string
     otp : string
}

const RegisterPage = ({loading}) => {
     const dispatch = useDispatch<TAppDispatch>()
     const router = useRouter()

     const {birthday,name, national_code , step} = useSelector<TRootState>(state => state.register) as IRegister

     const birthday_inputRef = useRef<HTMLInputElement>(null)
     const [birthday_date, setBirthday_date] = useState<string | any>(birthday ? toPersianDigits(birthday) : "")

     const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]

     type TValues = {
          name : string,
          national_code : string
     }


     const focusHandler = () => {
          if(birthday_inputRef?.current) birthday_inputRef.current.focus()
     }

     const initialValues : TValues = {
          name : name  || "",
          national_code : national_code ? toPersianDigits(national_code) : "",
     }

     const onSubmit = (values : TValues) => {
          dispatch(person_information({...values , birthday : birthday_date?.toString()}))
          router.push('/auth/register/contact_information')
     }

     const validationSchema = yup.object({
          name : yup.string()
               .matches(VALIDATION_PERSIAN_ALPHABET,"نام و نام خوانوادگی معتبر نیست.")
               .max(24 , "نام و نام خانوادگی نمی‌تواند بیشتر از 24 نویشه باشد.")
               .min(4 , "نام و نام خانوادگی نمی‌تواند کم تر از 4 نویشه باشد")
               .required('نام و نام خوانوادگی الزامی است.'),
          national_code : yup.string()
               .required('کد ملی الزامی میباشد.')

               .test('validate',"کد ملی وارد شده معتبر نیست." , (values) => {
                    // console.log('values : ',toEnDigits(values))
                    if(VALIDATION_NATIONAL_CODE.test(toEnDigits(values)))
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
               {/* Information - Menubar */}
               <div className="bg-white w-full md:w-[270px] md:min-w-[270px]">
                    <div className="bg-[#388AEA]  w-full h-full gap-x-6 px-6 py-6 md:py-16 flex justify-between md:justify-start md:flex-col xl:rounded-r-md   ">
                         <div className="w-fit md:w-full flex justify-center  items-center flex-col">
                              <img src={logo.src} alt="" className="w-24 md:w-36" />
                              <h1 className="font-iranyekan-extraBold text-2xl text-center text-blue-100 mt-6">ثبت نام</h1>
                         </div>
                         <div className="md:mt-10">
                              {/* Step 1 */}
                              <div className="flex items-center  md:flex-row gap-x-4">
                                   <div className="p-3 rounded-full bg-blue-400 border-2 border-blue-50 w-fit h-fit"></div>
                                   <p className="font-iranyekan-bold text-blue-50">اطلاعات فردی</p>
                              </div>
                              <div className="w-2 px-3 h-fit rotate-90 border border-blue-50 my-6"></div>

                              {/* Step 2 */}
                              <div className="flex items-center gap-x-4">
                                   <div className="p-3 rounded-full bg-blue-400  w-fit h-fit"></div>
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
                    <p className="font-iranyekan-bold text-blue-600 text-sm">مرحله ۱ از ۳</p>
                    <h1 className="text-lg mt-6 font-iranyekan-extraBold">لطفا اطلاعات خود را با دقت وارد نمائید</h1>
                    <section  className="flex w-full lg:w-[700px] flex-col mt-8 flex-1 px-6 sm:px-14 py-6 gap-y-10">
                          <InputCommon 
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                   </svg>
                              }
                              inputType="text"
                              title="نام و نام خانوادگی"
                              placeholder="محمد حسین رحمتی"
                              formik={formik}
                              name="name"
                              maxLength={24}
                         />
                         <InputCommon 
                              icon={
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                   </svg>
                              }
                              inputType="tel"
                              title="کدملی"
                              placeholder="۲۰۸-۱۲۳۵-۴۵۶"
                              formik={formik}
                              name="national_code"
                              maxLength={10}

                         />

                         {/* Choose BirthDay */}
                         <div className="relative w-full rounded-full ">
                              {/* Title */}
                              <p className='font-iranyekan-bold text-sm absolute top-[-10px] right-10 bg-white px-3'>تاریخ تولد</p>
                              {/* input */}
                              <div className='font-iranyekan-regular placeholder:text-sm placeholder:text-gray-400 focus:border-gray-300 hover:border-gray-300 border-gray-200 pl-11 pr-[70px] border-2 w-full py-4 rounded-full outline-none'>
                                   {birthday_date?.toString()?.length > 0 ? <p>{birthday_date?.toString()}</p> : <p className='text-gray-400 text-sm py-[2px]'>۱۴۰۲/۰۲/۲۱</p>}
                              </div>
                              {/* Icon */}
                              <label onClick={focusHandler} className='absolute flex justify-center items-center top-0 right-0 pr-6 px-2 bottom-0 rounded-r-full '>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                   </svg>
                              </label>
                              {/* Line */}
                              <div className='w-fit h-fit px-2 border rotate-90 absolute right-[50px] top-6'></div>

                              {/* children */}
                              <div className='absolute top-0 left-0 pl-4 flex items-center justify-center pr-2 bottom-0 rounded-l-full'>
                                   <DatePicker
                                        value={birthday_date}
                                        onChange={setBirthday_date}
                                        buttons={true}
                                        render={(value, openCalendar) => {
                                             return (
                                               <button type={'button'} onClick={openCalendar} className=" p-2 bg-blue-100 rounded-full">
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                  </svg>
                                               </button>
                                             )
                                        }}     
                                        calendar={persian}
                                        weekDays={weekDays}
                                        locale={persian_fa}
                                        inputClass=""
                                        className="rmdp-mobile font-iranyekan-regular"
                                   />
                              </div>
                         </div>
                    </section>


                    {/* Footer */}
                    <hr className="w-full border-gray-300"/>
                    <section className="w-full pb-6 flex justify-end pl-6">
                         <button type={'submit'} className={`${!formik.isValid ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} disabled:bg-gray-600 disabled:cursor-not-allowed   duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}>
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