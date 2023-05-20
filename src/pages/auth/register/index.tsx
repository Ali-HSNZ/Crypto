import logo from "@/images/Logo.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "@/redux/store";
import Input from "@/common/Input";
import { person_information } from "@/redux/slices/register";
import Head from "next/head";

//? utils
import {
     VALIDATION_BIRTHDAY,
     VALIDATION_NATIONAL_CODE,
     VALIDATION_PERSIAN_ALPHABET,
} from "@/utils/regix";
import { useRouter } from "next/router";
import Loading from "react-loading";
import { IRegister } from "@/types/register.types";
import { toEnDigits } from "@/utils/methods";

//? Date Picker =>
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/layouts/mobile.css"

type TPageInitialValues = {
     name: string;
     national_code: string;
     birthday: string
};

const RegisterPage = ({ isBuildingPageLoading }: { isBuildingPageLoading: boolean }) => {

     const dispatch = useDispatch<TAppDispatch>();
     const router = useRouter();

     const { birthday, name, national_code } = useSelector<TRootState>(state => state.register) as IRegister;

     const initialValues: TPageInitialValues = {
          name: name || "",
          national_code: national_code || "",
          birthday: birthday || ""
     };

     const onSubmit = (values: TPageInitialValues) => {
          dispatch(person_information(values));
          router.push("/auth/register/contact_information");
     };

     const validationSchema = yup.object({
          name: yup.string()
               .matches(VALIDATION_PERSIAN_ALPHABET, "نام و نام خوانوادگی معتبر نیست.")
               .max(30, "نام و نام خانوادگی نمی‌تواند بیشتر از ۳۰ نویشه باشد.")
               .min(4, "نام و نام خانوادگی نمی‌تواند کم تر از 4 نویشه باشد")
               .required("نام و نام خوانوادگی الزامی است."),
          national_code: yup.string()
               .required("کد ملی الزامی میباشد.")
               .test('validate', "کد ملی وارد شده معتبر نیست.", (values) => {
                    if (VALIDATION_NATIONAL_CODE.test(toEnDigits(values)))
                         return true;
                    else return false
               })
               .max(10, "کد ملی وارد شده معتبر نیست"),
          birthday: yup.string()
               .required("تاریخ تولد الزامی میباشد.")
               .test('validate', "تاریخ تولد وارد شده صحیح نیست.", (values) => {
                    if (VALIDATION_BIRTHDAY.test(toEnDigits(values)))
                         return true;
                    else return false
               })
     });

     const formik = useFormik({
          initialValues,
          onSubmit,
          validationSchema,
          validateOnMount: true,
          enableReinitialize: true,
     });

     return (
          <>
               <Head>
                    <title>نیوکوین اسپیس | ثبت اطلاعات فردی</title>
                    <meta
                         name="description"
                         content="صرافی ارز دیجیتال نیوکوین اسپیس - خرید و فروش امن بیت‌کوین و ارزهای دیجیتال. به بزرگترین بازار ارز دیجیتال ایران بپیوندید."
                    />
               </Head>
               <section className="w-full h-screen xl:p-8 bg-transparent flex flex-col md:flex-row">

                    {/* SidePanel */}
                    <div className="bg-white w-full md:w-[270px] md:min-w-[270px]">
                         <div className="bg-[#388AEA]  w-full h-full gap-x-6 px-6 py-6 md:py-16 flex justify-between md:justify-start md:flex-col xl:rounded-r-md   ">
                              <div className="w-fit md:w-full flex justify-center  items-center flex-col">
                                   <img src={logo.src} alt="" className="w-24 md:w-32" />
                                   <h1 className="font-iranyekan-extraBold text-2xl text-center text-blue-100 mt-6">
                                        ثبت نام
                                   </h1>
                              </div>
                              <div className="md:mt-10">
                                   {/* Step 1 */}
                                   <div className="flex items-center  md:flex-row gap-x-4">
                                        <div className="p-3 rounded-full bg-blue-400 border-2 border-blue-50 w-fit h-fit"></div>
                                        <p className="font-iranyekan-bold text-blue-50">
                                             اطلاعات فردی
                                        </p>
                                   </div>
                                   <div className="w-2 px-3 h-fit rotate-90 border border-blue-50 my-6"></div>

                                   {/* Step 2 */}
                                   <div className="flex items-center gap-x-4">
                                        <div className="p-3 rounded-full bg-blue-400  w-fit h-fit"></div>
                                        <p className="font-iranyekan-regular text-blue-200">
                                             اطلاعات ارتباطی
                                        </p>
                                   </div>
                                   <div className="w-2 px-3 h-fit rotate-90 border border-blue-300 my-6"></div>

                                   {/* Step 3 */}
                                   <div className="flex items-center gap-x-4">
                                        <div className="p-3 rounded-full bg-blue-400  w-fit h-fit"></div>
                                        <p className="font-iranyekan-regular text-blue-200">
                                             اطلاعات مکانی
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Register : Person Information Form */}
                    <form onSubmit={formik.handleSubmit} className="bg-white w-full  rounded-l-md pt-8 flex items-center flex-col h-full">
                         <p className="font-iranyekan-bold text-blue-600 text-sm">
                              مرحله ۱ از ۳
                         </p>
                         <h1 className="text-lg mt-6 font-iranyekan-extraBold">
                              لطفا اطلاعات خود را با دقت وارد نمائید
                         </h1>
                         <section className="flex w-full lg:w-[700px] flex-col mt-6 flex-1 px-6 sm:px-14 py-6 gap-y-10">
                              {/* Fullname Input */}
                              <Input
                                   type="text"
                                   maxLength={30}
                                   title="نام و نام خانوادگی"
                                   placeholder="محمد حسین رحمتی"
                                   formik={formik}
                                   name="name"
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600" >
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                   }
                              />
                              {/* national code Input */}
                              <Input
                                   type="tel"
                                   title="کدملی"
                                   placeholder="۲۰۸-۱۲۳۵-۴۵۶"
                                   formik={formik}
                                   name="national_code"
                                   maxLength={10}
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 " >
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
                                   }
                              />
                              {/* Birthday Input */}
                              <Input
                                   type="text"
                                   title="تاریخ تولد"
                                   placeholder="۱۳۷۰/۰۶/۳۱"
                                   formik={formik}
                                   name="birthday"
                                   maxLength={10}
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                   }
                              >
                                   <DatePicker
                                        value={formik.values.birthday}
                                        onPropsChange={(input: any) => formik.setFieldValue("birthday", input.value?.toString())}
                                        buttons={true}
                                        render={(value, openCalendar) => {
                                             return (
                                                  <button type={'button'} onClick={openCalendar} className=" p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                       </svg>
                                                  </button>
                                             )
                                        }}
                                        calendar={persian}
                                        locale={persian_fa}
                                        inputClass=""
                                        className="rmdp-mobile font-iranyekan-regular"
                                   />
                              </Input>
                         </section>

                         {/* Footer */}
                         <hr className="w-full border-gray-300" />
                         <section className="w-full p-5 flex justify-end">
                              <button type={"submit"} className={`${formik.isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed "} disabled:bg-gray-600 disabled:cursor-not-allowed duration-150 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}>
                                   {isBuildingPageLoading ? (
                                        <Loading color="white" width={20} height={20} type="spin" />
                                   ) : (
                                        <>
                                             مرحله بعد
                                             {/* Arrow Left Icon */}
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                             </svg>
                                        </>
                                   )}
                              </button>
                         </section>
                    </form>
               </section>
          </>
     );
};

export default RegisterPage;