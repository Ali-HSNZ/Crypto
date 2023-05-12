import { useFormik } from "formik";
import * as yup from 'yup'
import logo from '@/images/Logo.png'
import InputCommon from "@/common/InputCommon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "@/redux/store/store";
import { useRouter } from "next/router";
import { toEnDigits, truncateNumber } from "@/utils/methods";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { VALIDATION_MAP_POSITION, VALIDATION_PERSIAN_ALPHABET } from "@/utils/regix";
import SelectBox from "@/common/Selectbox";
import {provinces} from '@/static/provinces';
import {allCities} from '@/static/cities';
import dynamic from "next/dynamic";
import { IRegister, TCity, TPoition, TProvince } from "@/types/register.types";
import { changeLoginState, registerAction } from "@/redux/slices/register";
import Loading from "@/common/Loading";


type TValues = {
     phone : string,
     email : string,
     lat : number | string
     lng : number | string
}


const RegisterPage = () => {

     // Renderd Map in Client Side
     const Map = dynamic(() => import('@/components/Map'), { ssr: false });

     // Map Position with 'lat' & lng or long
     const [positions, setPositions] = useState<TPoition>();
     const [isOpenLocation,setIsOpenLocation] = useState<boolean>(false)

     const dispatch = useDispatch<TAppDispatch>()
     const {email , phone , registerStatus , loading} = useSelector<TRootState>(state => state.register) as IRegister
     const registerState = useSelector<TRootState>(state => state.register) as IRegister
     

     useEffect(() => {
          if(registerStatus){
               setTimeout(() => {
                    router.push('/auth/login')
               }, 1500);
               dispatch(changeLoginState(false))
          }
     } , [registerStatus])
     
     const router = useRouter()
     
     // Choose Province
     const [provienceQuery,setProvienceQuery] = useState<string>('')
     const [selectedProvience,setSelectedProvience] = useState<TProvince>()
     const filteredProvinces : Array<TProvince> = provienceQuery === '' ? provinces : provinces && provinces.filter((province) => province.name.toLowerCase().replace(/\s+/g, '').includes(provienceQuery.toLocaleLowerCase().replace(/\s+/g, '')))

     // Choose City
     const [cities,setCities] = useState<Array<TCity> | null>(null)    
     const [cityQuery , setCityQuery] = useState<string>("")
     const [selectedCity,setSelectedCity] = useState<TCity | string>()
     const filteredCities : Array<TCity> | null = cityQuery === '' ? cities : cities && cities.filter((city) => city?.name?.toLowerCase().replace(/\s+/g, '').includes(cityQuery.toLocaleLowerCase().replace(/\s+/g, '')))

     useEffect(()=>{
          if(selectedProvience?.id){
               setSelectedCity('')
               const cities = allCities.filter(city => city.province_id === selectedProvience?.id)
               setCities(cities)
          }else setCities(null)
     },[selectedProvience])

     const initialValues : TValues = {
          phone : phone ? toPersianDigits(phone) : "",
          email : email || "",
          lat : positions?.lat ? truncateNumber(positions?.lat,5) : "",
          lng : positions?.lng ? truncateNumber(positions?.lng,5) : "",
     }

     const onSubmit = (values : TValues) => {
          dispatch(registerAction({...registerState , ...values}))
     }


     const validationSchema = yup.object({
          address : yup.string()
               .required('آدرس الزامی میباشد.')
               .matches(VALIDATION_PERSIAN_ALPHABET , "آدرس را به فارسی وارد کنید"),
          lat: yup.string()
               .required("موقعیت عرض جغرافیایی الزامی است.")
               .test('validate_lat',"موقعیت عرض جغرافیایی معتبر نیست." , (values ) => {
                    if(VALIDATION_MAP_POSITION.test(toEnDigits(values)))
                    return true
                    else return false 
               }),
          lng: yup.string()
               .required("موقعیت طول جغرافیایی الزامی است.")
               .test('validate_lat',"موقعیت طول جغرافیایی معتبر نیست." , (values ) => {
                    if(VALIDATION_MAP_POSITION.test(toEnDigits(values)))
                    return true
                    else return false 
               }),   
     })

     const formik = useFormik({
          initialValues,
          onSubmit,
          validationSchema,
          validateOnMount : true,
          enableReinitialize : true,
     })




     return (  
          <section className="w-full h-auto sm:h-screen xl:p-8 bg-transparent flex flex-col md:flex-row">
               <Modal className="flex justify-center items-center px-6" open={isOpenLocation} onClose={()=>setIsOpenLocation(false)}>
                    <section id="map1" className="bg-white w-full md:w-[700px] relative p-6 h-[500px] rounded-2xl overflow-hidden">
                         <Map onClose={setIsOpenLocation} confirmLocation={setPositions}/>
                    </section>
               </Modal>
               {/* SidePanel */}
               <div className="bg-white w-full md:w-[270px] md:min-w-[270px]">
                    <div className="bg-[#388AEA]  w-full h-full gap-x-6 px-6 py-6 md:py-16 flex justify-between md:justify-start md:flex-col xl:rounded-r-md   ">
                         <div className="w-fit md:w-full flex justify-center  items-center  flex-col">
                              <img src={logo.src} alt="" className="w-24 md:w-32 " />
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
                                   <p className="font-iranyekan-regular text-blue-50">اطلاعات ارتباطی</p>
                              </div>
                              <div className="w-2 px-3 h-fit rotate-90 border border-blue-50 my-6"></div>

                              {/* Step 3 */}
                              <div className="flex items-center gap-x-4">
                                   <div className="p-3 rounded-full bg-blue-400 border-2 border-blue-50 w-fit h-fit"></div>
                                   <p className="font-iranyekan-regular text-blue-200">اطلاعات مکانی</p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Register Form */}
               <form onSubmit={formik.handleSubmit} className="bg-white w-full rounded-l-md pt-8 flex items-center flex-col h-full">
                    <div className="w-full  flex items-center flex-col flex-1">
                         <p className="font-iranyekan-bold text-blue-600 text-sm">مرحله ۳ از ۳</p>
                         <h1 className="text-lg mt-6 font-iranyekan-extraBold">لطفا اطلاعات خود را با دقت وارد نمائید</h1>
                         <section className="w-full lg:w-[700px] px-6 grid sm:grid-cols-2 mt-8 pt-6 gap-x-4 gap-y-10">
                              {/* Select province */}
                              <SelectBox 
                                   notFoundTitle="استان مورد نظر یافت نشد." 
                                   placeholder="مازندران"
                                   title="استان"
                                   query={provienceQuery} 
                                   setQuery={setProvienceQuery} 
                                   filteredData={filteredProvinces} 
                                   selected={selectedProvience} 
                                   setSelected={setSelectedProvience}
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                   }
                              />
                              <SelectBox 
                                   notFoundTitle="شهر مورد نظر یافت نشد." 
                                   placeholder="ساری"
                                   title="شهر"
                                   query={cityQuery} 
                                   setQuery={setCityQuery} 
                                   filteredData={filteredCities} 
                                   selected={selectedCity} 
                                   setSelected={setSelectedCity}
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                   }
                              />
                         </section>
                         <section className="w-full lg:w-[700px] px-6 mt-10">
                              <InputCommon 
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                                        </svg>
                                   }
                                   inputType="text"
                                   name="address"
                                   formik={formik}

                                   title="آدرس"
                                   placeholder="ایران مازندران ساری"
                              />
                         </section>
                         <section className="w-full lg:w-[700px] px-6 grid  sm:grid-cols-2 mt-10   gap-y-10 gap-x-4">
                              <InputCommon 
                                   icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                   }
                                   inputType="tel"
                                   formik={formik}
                                   title="طول جغرافیایی"
                                   name="lng"
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
                                   formik={formik}
                                   name="lat"
                                   title="عرض چغرافیایی"
                                   placeholder="۶۴.۵۶۹۱"
                              />
                         </section>
                         <button onClick={()=> setIsOpenLocation(true)} className="text-blue-600 text-sm font-iranyekan-bold mt-6">انتخاب طول و عرض جغرافیایی از روی نقشه</button>
                    </div>
                    <div className="w-full mt-6">
                         <hr className="w-full border-gray-300 "/>
                         <section className="w-full pb-6 flex justify-between items-center px-6">
                              <Link href={'/auth/register/contact_information'} className="mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-600">
                                   مرحله قبل 
                              </Link>
                              <button disabled={loading} type={'submit'} className={`${!formik.isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} disabled:bg-gray-400 disabled:cursor-not-allowed   duration-150 mt-6 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}>
                                  {loading ? (
                                        <Loading color="white" scale={20} type="spin"/>
                                   ) : (
                                        <>
                                             ثبت نام 
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                             </svg>
                                        </>
                                   )}
                              </button>
                         </section>
                    </div>
               </form>
          </section>
     );
}
 
export default RegisterPage;