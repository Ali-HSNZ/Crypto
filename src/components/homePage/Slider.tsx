import Chart from '@/common/Chart';
import logo from '@/images/Logo.png'
import axios from 'axios';
import { useEffect, useState } from 'react'

//! ====Swiper====>
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper";
import "swiper/css/free-mode";
import { toPersianDigits } from '@/utils/toPersianDigits';
import { toPersianPrice, truncateNumber } from '@/utils/methods';
import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch, TRootState } from '@/redux/store/store';
import { fetchCrypto } from '@/redux/slices/crypto';
import { ICryptoState } from '@/types/crypto.types';
//! <====Swiper====


const Slider = () => {

  const { bitcoin, ripple, solana, dogecoin, tether, ethereum, loading } = useSelector<TRootState>(state => state.crypto) as ICryptoState

  const dispatch = useDispatch<TAppDispatch>()

  useEffect(() => {
    // dispatch(fetchCrypto())
  }, [])

  return (
    <div className='w-full px-14 relative'>
      <Swiper
        className={"_swiper overflow-hidden mt-6"}
        freeMode={false}
        navigation={true}
        spaceBetween={20}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          720: {
            slidesPerView: 2,
          },
          1000 : {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          }
        }}
      >
        {/* bitcoin */}
        <SwiperSlide>
          <div className="w-full bg-white p-4 rounded-lg">
            <div className='w-full flex justify-between'>
              <div className='flex gap-x-4 justify-center items-center'>
                <img src={`https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg`} className='w-14 h-auto object-cover' alt="" />
                <div className='flex flex-col gap-y-2'>
                  <p className='font-iranyekan-bold '>{bitcoin?.fa_name}</p>
                  <p className='font-iranyekan-bold text-gray-400'>{bitcoin?.name}</p>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <p className={` font-iranyekan-bold text-green-600 `}>{toPersianDigits(truncateNumber(bitcoin?.usd_24h_change, 2))}%</p>
                <p className='font-iranyekan-bold text-gray-700'>{toPersianPrice(bitcoin?.usd)} دلار</p>
              </div>
            </div>
            <div className='w-full pt-4'>
              {bitcoin && <Chart chart={bitcoin} />}
            </div>
          </div>
        </SwiperSlide>

        {/* dogecoin */}
        <SwiperSlide>
          <div className="w-full bg-white p-4 rounded-lg">
            <div className='w-full flex justify-between'>
              <div className='flex gap-x-4 justify-center items-center'>
                <img src={`https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg`} className='w-14 h-auto object-cover' alt="" />
                <div className='flex flex-col gap-y-2'>
                  <p className='font-iranyekan-bold '>{dogecoin?.fa_name}</p>
                  <p className='font-iranyekan-bold text-gray-400'>{dogecoin?.name}</p>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <p className={` font-iranyekan-bold text-green-600 `}>{toPersianDigits(truncateNumber(dogecoin?.usd_24h_change, 2))}%</p>
                <p className='font-iranyekan-bold text-gray-700'>{toPersianPrice(dogecoin?.usd)} دلار</p>
              </div>
            </div>
            <div className='w-full pt-4'>
              {dogecoin && <Chart chart={dogecoin} />}
            </div>
          </div>
        </SwiperSlide>

        {/* tether */}
        <SwiperSlide>
          <div className="w-full bg-white p-4 rounded-lg">
            <div className='w-full flex justify-between'>
              <div className='flex gap-x-4 justify-center items-center'>
                <img src={`https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg`} className='w-14 h-auto object-cover' alt="" />
                <div className='flex flex-col gap-y-2'>
                  <p className='font-iranyekan-bold '>{tether?.fa_name}</p>
                  <p className='font-iranyekan-bold text-gray-400'>{tether?.name}</p>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <p className={` font-iranyekan-bold text-green-600 `}>{toPersianDigits(truncateNumber(tether?.usd_24h_change, 2))}%</p>
                <p className='font-iranyekan-bold text-gray-700'>{toPersianPrice(tether?.usd)} دلار</p>
              </div>
            </div>
            <div className='w-full pt-4'>
              {tether && <Chart chart={tether} />}
            </div>
          </div>
        </SwiperSlide>

        {/* ethereum */}
        <SwiperSlide>
          <div className="w-full bg-white p-4 rounded-lg">
            <div className='w-full flex justify-between'>
              <div className='flex gap-x-4 justify-center items-center'>
                <img src={`https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg`} className='w-14 h-auto object-cover' alt="" />
                <div className='flex flex-col gap-y-2'>
                  <p className='font-iranyekan-bold '>{ethereum?.fa_name}</p>
                  <p className='font-iranyekan-bold text-gray-400'>{ethereum?.name}</p>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <p className={` font-iranyekan-bold text-green-600 `}>{toPersianDigits(truncateNumber(ethereum?.usd_24h_change, 2))}%</p>
                <p className='font-iranyekan-bold text-gray-700'>{toPersianPrice(ethereum?.usd)} دلار</p>
              </div>
            </div>
            <div className='w-full pt-4'>
              {ethereum && <Chart chart={ethereum} />}
            </div>
          </div>
        </SwiperSlide>

        {/* ripple */}
        <SwiperSlide>
          <div className="w-full bg-white p-4 rounded-lg">
            <div className='w-full flex justify-between'>
              <div className='flex gap-x-4 justify-center items-center'>
                <img src={`https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg`} className='w-14 h-auto object-cover' alt="" />
                <div className='flex flex-col gap-y-2'>
                  <p className='font-iranyekan-bold '>{ripple?.fa_name}</p>
                  <p className='font-iranyekan-bold text-gray-400'>{ripple?.name}</p>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <p className={` font-iranyekan-bold text-green-600 `}>{toPersianDigits(truncateNumber(ripple?.usd_24h_change, 2))}%</p>
                <p className='font-iranyekan-bold text-gray-700'>{toPersianPrice(ripple?.usd)} دلار</p>
              </div>
            </div>
            <div className='w-full pt-4'>
              {ripple && <Chart chart={ripple} />}
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}

export default Slider;