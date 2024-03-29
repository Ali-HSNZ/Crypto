import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useFormik } from 'formik'
import Loading from 'react-loading'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Modal } from '@mui/material'

import { useEffect, useMemo, useState } from 'react'

import Input from '@common/Input'
import SelectBox from '@common/Selectbox'

import { type TRootState } from '@redux/store'

import { toEnDigits, truncateNumber } from '@utils/methods'
import { VALIDATION_MAP_POSITION } from '@utils/regix'

import logo from '@images/Logo.png'

import { allCities } from '@static/cities'
import { provinces } from '@static/provinces'

import { type IRegister, type TCity, type TProvince } from '../../../core/types/register.types'

type TPageInitailValues = {
    address: string
    province: string
    city: string
    lat: number | ''
    lng: number | ''
    currentLocation: [number, number] | undefined
}

const Register_chooseLocation = () => {
    const { email, phone, password, name } = useSelector<TRootState>((state) => state.register) as IRegister

    const router = useRouter()

    // The variable isPendingRequest indicates whether a register request is pending or not.
    const [isPendingRequest, setIsPendingRequest] = useState<boolean>(false)

    // Renderd Map in Client Side
    const Map = dynamic(() => import('@components/Map'), { ssr: false })

    const [isOpenMap, setIsOpenMap] = useState<boolean>(false)

    // Choose/Select Province
    const [provinceQuery, setprovinceQuery] = useState<string>('')
    const [selectedProvence, setSelectedProvience] = useState<TProvince>()

    // find province
    const queriedProvinceResults: Array<TProvince> = useMemo(() => {
        if (provinceQuery === '') {
            // return all provinces if provinceQuery is empty
            return provinces
        }
        return provinces.filter((province) => province.name.includes(provinceQuery))
    }, [provinceQuery])

    // Choose/Select City
    const [cities, setCities] = useState<Array<TCity>>([])
    const [cityQuery, setCityQuery] = useState<string>('')
    const [selectedCity, setSelectedCity] = useState<TCity | string>()

    // find City
    const queriedCityResults: Array<TCity> = useMemo(() => {
        if (cityQuery === '') {
            // return all cities if cityQuery is empty
            return cities
        }
        return cities.filter((city) => city.name.includes(cityQuery))
    }, [cityQuery, cities])

    const initialValues: TPageInitailValues = {
        address: '',
        city: '',
        province: '',
        currentLocation: undefined,
        lat: '',
        lng: '',
    }

    const onSubmit = () => {
        setIsPendingRequest(true)
        axios
            .post('https://apingweb.com/api/register', {
                password,
                name,
                phone: toEnDigits(phone.substring(0, 10)),
                email,
                password_confirmation: password,
            })
            .then(() => {
                setIsPendingRequest(false)
                toast.success('حساب کاربری شما با موفقیت ایجاد شد.')
                router.push('/')
            })
            .catch((error) => {
                setIsPendingRequest(false)
                error?.response?.data?.errors.forEach((message: string) => toast.error(message))
            })
    }

    const validationSchema = yup.object({
        province: yup.string().required('انتخاب استان الزامی می‌باشد.'),
        city: yup.string().required('انتخاب شهر الزامی می‌باشد.'),
        address: yup.string().required('آدرس الزامی می‌باشد.'),
        lat: yup
            .string()
            .required('موقعیت عرض جغرافیایی الزامی می‌باشد.')
            .test('validate', 'موقعیت عرض جغرافیایی معتبر نیست.', (values) => {
                if (VALIDATION_MAP_POSITION.test(toEnDigits(values))) return true
                else return false
            }),
        lng: yup
            .string()
            .required('موقعیت طول جغرافیایی الزامی می‌باشد.')
            .test('validate', 'موقعیت طول جغرافیایی معتبر نیست.', (values) => {
                if (VALIDATION_MAP_POSITION.test(toEnDigits(values))) return true
                else return false
            }),
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    })

    // Clearing and updating city state based on selected Province
    useEffect(() => {
        setSelectedCity('')
        formik.setFieldValue('city', '')
        if (selectedProvence?.id) {
            const cities = allCities.filter((city) => city.province_id === selectedProvence?.id)
            setCities(cities)
        } else setCities([])
    }, [formik, selectedProvence])

    return (
        <>
            <Head>
                <title>نیوکوین اسپیس | ثبت اطلاعات مکانی</title>
                <meta
                    name='description'
                    content='صرافی ارز دیجیتال نیوکوین اسپیس - خرید و فروش امن بیت‌کوین و ارزهای دیجیتال. به بزرگترین بازار ارز دیجیتال ایران بپیوندید.'
                />
            </Head>
            <section className='w-full h-auto sm:h-screen xl:p-8 flex flex-col md:flex-row'>
                <Modal
                    className='flex justify-center items-center px-4 md:px-6'
                    open={isOpenMap}
                    onClose={() => setIsOpenMap(false)}
                >
                    <section className='bg-white md:p-6 relative w-full md:w-[700px]  h-[500px] rounded-xl'>
                        <Map
                            onClose={setIsOpenMap}
                            setSelectedLocation={(pos: [number, number]) => {
                                formik.setValues({
                                    ...formik.values,
                                    lat: truncateNumber(pos[0], 5),
                                    lng: truncateNumber(pos[1], 5),
                                    currentLocation: pos,
                                })
                            }}
                            currentLocation={formik.values.currentLocation}
                        />
                    </section>
                </Modal>

                {/* sideBar */}
                <div className='bg-[#388AEA]  w-full md:w-[270px] md:min-w-[270px] h-fit md:h-full gap-x-6 px-6 py-6 md:py-16 flex justify-between items-center md:justify-start md:flex-col xl:rounded-r-md   '>
                    <div className='w-fit md:w-full flex justify-center  items-center flex-col'>
                        <Image alt='نیوکوین اسپیس' width={70} height={70} className='w-[70px] md:w-20' src={logo.src} />
                        <h1 className='font-iranyekan-extraBold text-xl xl:text-2xl text-center text-blue-100  mt-4 md:mt-6 xl:mt-8'>
                            ثبت نام
                        </h1>
                    </div>
                    <div className='md:mt-10 flex flex-col items-start'>
                        {/* Step 1 */}
                        <div className='flex items-center  md:flex-row gap-x-4'>
                            <div className='p-[10px] md:p-3 rounded-full bg-blue-100 border-[3px] border-blue-100 w-fit h-fit'></div>
                            <p className='font-iranyekan-bold text-sm md:text-base text-blue-100'>اطلاعات فردی</p>
                        </div>
                        <div className='mr-[2px] px-2.5 md:px-3 h-fit rotate-90 border border-blue-100 my-4 md:my-6'></div>

                        {/* Step 2 */}
                        <div className='flex items-center gap-x-4'>
                            <div className='p-[10px] md:p-3 rounded-full border-[3px] border-blue-100 bg-blue-100 w-fit h-fit'></div>
                            <p className='font-iranyekan-regular text-sm md:text-base text-blue-100'>اطلاعات ارتباطی</p>
                        </div>
                        <div className='mr-[2px] px-2.5 md:px-3 h-fit rotate-90 border border-blue-100 my-4 md:my-6'></div>

                        {/* Step 3 */}
                        <div className='flex items-center gap-x-4'>
                            <div className='p-[10px] md:p-3 rounded-full border-[3px] border-blue-100 bg-blue-400  w-fit h-fit'></div>
                            <p className='font-iranyekan-regular text-sm md:text-base text-blue-100'>اطلاعات مکانی</p>
                        </div>
                    </div>
                </div>

                {/* Register Form */}
                <form
                    onSubmit={formik.handleSubmit}
                    className='bg-white w-full rounded-l-md pt-8 flex items-center flex-col h-full'
                >
                    <div className='w-full  flex items-center flex-col flex-1'>
                        <p className='font-iranyekan-bold text-blue-600 text-sm'>مرحله ۳ از ۳</p>
                        <h1 className='text-lg mt-6 font-iranyekan-extraBold'>
                            لطفا اطلاعات خود را با دقت وارد نمائید
                        </h1>
                        <section className='w-full lg:w-[700px] px-6 grid sm:grid-cols-2 mt-6 pt-6 gap-x-4 gap-y-10'>
                            {/* province */}
                            <SelectBox
                                notFoundTitle='استان مورد نظر یافت نشد.'
                                placeholder='مازندران'
                                title='استان'
                                query={provinceQuery}
                                setQuery={setprovinceQuery}
                                data={queriedProvinceResults}
                                selected={selectedProvence}
                                setSelected={setSelectedProvience}
                                name='province'
                                formik={formik}
                                icon={
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6 text-gray-600'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                                        />
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                                        />
                                    </svg>
                                }
                            />
                            {/* City */}
                            <SelectBox
                                notFoundTitle='شهر مورد نظر یافت نشد.'
                                placeholder='ساری'
                                title='شهر'
                                query={cityQuery}
                                setQuery={setCityQuery}
                                data={queriedCityResults}
                                selected={selectedCity}
                                setSelected={setSelectedCity}
                                name='city'
                                formik={formik}
                                icon={
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6 text-gray-600'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                                        />
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                                        />
                                    </svg>
                                }
                            />
                        </section>
                        <section className='w-full lg:w-[700px] px-6 mt-10'>
                            <Input
                                type='text'
                                name='address'
                                formik={formik}
                                title='آدرس'
                                placeholder='ایران مازندران ساری'
                                icon={
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6 text-gray-600'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z'
                                        />
                                    </svg>
                                }
                            />
                        </section>
                        <section className='w-full lg:w-[700px] px-6 grid  sm:grid-cols-2 mt-10   gap-y-10 gap-x-4'>
                            <Input
                                type='tel'
                                formik={formik}
                                title='طول جغرافیایی'
                                name='lng'
                                placeholder='۳۶.۷۵۸۹'
                                icon={
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6 text-gray-600'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                                        />
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                                        />
                                    </svg>
                                }
                            />
                            <Input
                                type='tel'
                                formik={formik}
                                name='lat'
                                title='عرض چغرافیایی'
                                placeholder='۶۴.۵۶۹۱'
                                icon={
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6 text-gray-600'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                                        />
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                                        />
                                    </svg>
                                }
                            />
                        </section>
                        <button
                            type='button'
                            onClick={() => setIsOpenMap(true)}
                            className='text-blue-600 text-sm font-iranyekan-bold mt-6'
                        >
                            انتخاب طول و عرض جغرافیایی از روی نقشه
                        </button>
                    </div>
                    <div className='w-full mt-6'>
                        <hr className='w-full border-gray-300' />
                        <section className='w-full p-5 flex justify-between items-center'>
                            <Link
                                href={'/auth/register/contact_information'}
                                className='rounded-md flex gap-x-4 font-iranyekan-bold text-blue-600'
                            >
                                مرحله قبل
                            </Link>
                            <button
                                type={'submit'}
                                disabled={isPendingRequest}
                                className={`${
                                    formik.isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
                                }  disabled:bg-gray-400 disabled:cursor-not-allowed duration-150 rounded-md flex gap-x-4 font-iranyekan-bold text-blue-50 px-6 py-3`}
                            >
                                {isPendingRequest ? (
                                    <Loading color='white' width={20} height={20} type='spin' />
                                ) : (
                                    <>
                                        ثبت نام
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-6 h-6'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </section>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register_chooseLocation
