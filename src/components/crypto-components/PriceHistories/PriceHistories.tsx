import Image from 'next/image'
import { Navigation } from 'swiper'
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { type TCrypto_priceHistoriesRes } from '@core/types/crypto.types'

import { type FC } from 'react'

import { DAreaChart } from '@common/AreaChart'

import { toPersianDigits } from '@utils/methods'
import { truncateNumber } from '@utils/methods'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import { type IPriceHistoriesProps } from './resources'

const PriceHistories: FC<IPriceHistoriesProps> = ({ priceHistories }) => {
    return (
        <div className='w-full px-12 relative mt-6'>
            <Swiper
                className={'_swiper overflow-hidden'}
                freeMode={false}
                navigation={true}
                spaceBetween={20}
                modules={[Navigation]}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    720: { slidesPerView: 2 },
                    1000: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                }}
            >
                {priceHistories?.map((coin: TCrypto_priceHistoriesRes, index: number) => (
                    <SwiperSlide key={index}>
                        <div className='w-full bg-white  rounded-lg'>
                            <div className='w-full p-4 flex justify-between'>
                                <div className='flex justify-center gap-x-4 items-center h-14 '>
                                    <Image
                                        width={50}
                                        height={50}
                                        alt={`${coin.name} image`}
                                        src={coin?.imageUrl}
                                        className=' object-contain max-h-full max-w-full'
                                    />
                                    <div className='flex flex-col gap-y-2'>
                                        <p className='font-iranyekan-bold'>{coin.fa_name}</p>
                                        <p className='font-iranyekan-bold text-gray-400'>{coin.symbol}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <p
                                        className={`${
                                            coin?.usd_24h_change > 0 ? ' text-green-600' : 'text-red-600'
                                        } font-iranyekan-bold `}
                                    >
                                        {toPersianDigits(coin?.usd_24h_change.toFixed(2))}%
                                    </p>
                                    <p className='font-iranyekan-bold text-gray-700'>
                                        {truncateNumber(coin?.usd, 2)} دلار
                                    </p>
                                </div>
                            </div>
                            <div className='w-full '>
                                <DAreaChart
                                    seriesData={[
                                        {
                                            name: coin.fa_name,
                                            type: 'areaspline',
                                            data: coin.history,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default PriceHistories
