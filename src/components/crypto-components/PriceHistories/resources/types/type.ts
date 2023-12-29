interface IPriceHistoriesProps {
    priceHistories: {
        history: number[]
        fa_name: string
        imageUrl: string
        name: string
        symbol: string
        usd: number
        usd_24h_change: number
    }[]
}

export default IPriceHistoriesProps
