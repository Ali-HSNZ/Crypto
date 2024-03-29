import Head from 'next/head'
import axios from 'axios'
import {
    type TCrypto_favoriteCoinsRes,
    type TCrypto_priceHistoriesRes,
    type TCrypto_weekTransactions,
} from '@core/types/crypto.types'
import { useMediaQuery, useTheme } from '@mui/material'

import { useState } from 'react'

import { FavoriteCoins, PriceHistories, WalletAssets, WeekTransactions } from '@components/crypto-components'
import { Header, NavbarMenu, NavbarModal } from '@components/layout-components'

const Home = ({
    priceHistories,
    weekTransactions,
    favoriteCoins,
    serverError,
}: {
    priceHistories: Array<TCrypto_priceHistoriesRes>
    weekTransactions: TCrypto_weekTransactions
    favoriteCoins: Array<TCrypto_favoriteCoinsRes>
    serverError: string
}) => {
    const [isOpenNavbar, setIsOpenNavbar] = useState<boolean>(false)

    const theme = useTheme()
    const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <>
            <Head>
                <title>نیوکوین اسپیس</title>
                <meta
                    name='description'
                    content='صرافی ارز دیجیتال نیوکوین اسپیس - خرید و فروش امن بیت‌کوین و ارزهای دیجیتال. به بزرگترین بازار ارز دیجیتال ایران بپیوندید.'
                />
            </Head>

            <main className={'w-full gap-x-6 grid  grid-cols-10 grid-row-2 h-auto p-6'}>
                {isLgScreen ? (
                    <div className={`${isOpenNavbar ? 'lg:col-span-2' : 'hidden'} `}>
                        <NavbarMenu />
                    </div>
                ) : (
                    <NavbarModal isOpenNavbar={isOpenNavbar} setIsOpenNavbar={setIsOpenNavbar} />
                )}

                <div className={`${isOpenNavbar && isLgScreen ? 'col-span-8' : 'col-span-10'}  `}>
                    {/* Show server errors */}
                    {serverError && <p className='text-red-600 font-iranyekan-bold pb-6'>{serverError}</p>}

                    <Header setIsOpenNavbar={setIsOpenNavbar} isOpenNavbar={isOpenNavbar} />

                    {/* Price Histories Chart */}
                    <PriceHistories priceHistories={priceHistories} />

                    <section className='mt-8 h-auto flex flex-col flex-1 lg:flex-row gap-6'>
                        <div className='w-full  flex-1'>
                            <div className='w-full flex flex-col xl:flex-row justify-between gap-6'>
                                {/* Wallet Assets Chart */}
                                <WalletAssets />
                                {/*  Week Trasactions Chart */}
                                <WeekTransactions weekTransactions={weekTransactions} />
                            </div>

                            {/* TradingView Chart */}
                            <div className='w-full h-[500px] font-iranyekan-bold bg-white mt-6 rounded-lg  p-4'>
                                نمودار ترید
                            </div>
                        </div>

                        {/* FavoriteCoins Chart */}
                        <FavoriteCoins favoriteCoins={favoriteCoins} />
                    </section>
                </div>
            </main>
        </>
    )
}
export default Home

export const getServerSideProps = async () => {
    // Base URL for CoinGecko API
    const baseUrl = 'https://api.coingecko.com/api/v3'

    try {
        // Fetching week Transactions Coins Data
        const weekTransactions = await axios.get(`${baseUrl}/coins/bitcoin/market_chart?vs_currency=usd&days=7`)

        // Fetching Favorite Coins Data
        const favoriteCoins = await axios.get(
            `${baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`
        )

        // Fetching Price Histories Data
        const fetchCoins = async () => {
            const priceUrl = `${baseUrl}/simple/price?ids=ripple,ethereum,bitcoin,dogecoin,tether&vs_currencies=usd&include_24hr_change=true`

            const fetchCoinData = (coinId: string) =>
                axios.get(`${baseUrl}/coins/${coinId}/market_chart?vs_currency=usd&days=365`)

            const [rippleRes, ethereumRes, bitcoinRes, dogecoinRes, tetherRes, priceRes] = await axios.all([
                fetchCoinData('ripple'),
                fetchCoinData('ethereum'),
                fetchCoinData('bitcoin'),
                fetchCoinData('dogecoin'),
                fetchCoinData('tether'),
                axios.get(priceUrl),
            ])

            return [
                {
                    history: rippleRes.data.prices.map((e: [number, number]) => e[1]),
                    usd: priceRes.data.ripple.usd,
                    usd_24h_change: priceRes.data.ripple.usd_24h_change,
                    symbol: 'XRP',
                    fa_name: 'ریپل',
                    name: 'ripple',
                    imageUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-ripple-13-646080.png?f=avif&w=256',
                },
                {
                    history: bitcoinRes.data.prices.map((e: [number, number]) => e[1]),
                    usd: priceRes.data.bitcoin.usd,
                    usd_24h_change: priceRes.data.bitcoin.usd_24h_change,
                    symbol: 'BTC',
                    fa_name: 'بیتکوین',
                    name: 'bitcoin',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg',
                },
                {
                    history: dogecoinRes.data.prices.map((e: [number, number]) => e[1]),
                    usd: priceRes.data.dogecoin.usd,
                    usd_24h_change: priceRes.data.dogecoin.usd_24h_change,
                    symbol: 'DOGE',
                    fa_name: 'دوج‌کوین',
                    name: 'dogecoin',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/fa/d/d0/Dogecoin_Logo.png',
                },
                {
                    history: tetherRes.data.prices.map((e: [number, number]) => e[1]),
                    usd: priceRes.data.tether.usd,
                    usd_24h_change: priceRes.data.tether.usd_24h_change,
                    symbol: 'USDT',
                    fa_name: 'تتر',
                    name: 'tether',
                    imageUrl:
                        'https://images.revain.org/blob/tether_logo_67a1be67_6568_475e_ac29_8790e2d210ad_84d8fedf45@128x128.png.webp',
                },
                {
                    history: ethereumRes.data.prices.map((e: [number, number]) => e[1]),
                    usd: priceRes.data.ethereum.usd,
                    usd_24h_change: priceRes.data.ethereum.usd_24h_change,
                    symbol: 'ETH',
                    fa_name: 'اتریوم',
                    name: 'ethereum',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Eth-diamond-rainbow.png',
                },
            ]
        }
        const priceHistories = await fetchCoins()

        return {
            props: {
                priceHistories: priceHistories,
                weekTransactions: weekTransactions,
                favoriteCoins: favoriteCoins,
            },
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const message = error?.response?.statusText
        const statusCode = error?.response?.status
        return {
            props: {
                serverError: `خطای ${statusCode ?? 500} | ${message ?? ' Internal Server Error'}`,
            },
        }
    }
}
