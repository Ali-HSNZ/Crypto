// FavoriteCoins
type TCrypto_favoriteCoinsRes = {
    image: string
    name: string
    price_change_24h: number
    symbol: string
    circulating_supply: number
}
// PriceHistories
type TCrypto_priceHistoriesRes = {
    usd: number
    usd_24h_change: number
    history: Array<[number, number]>
    name: string
    fa_name: string
    symbol: string
    imageUrl: string
}
// walletAssets
type TCrypto_walletAssetsResponse = {
    id: number
    name: string
    symbol: string
    balance: number
}
type TCrypto_walletAssets = {
    loading: boolean
    error: string | null
    data: Array<TCrypto_walletAssetsResponse> | null
}

// WeekTransactions
type TCrypto_weekTransactions = Array<Array<number>> | null

export type {
    TCrypto_favoriteCoinsRes,
    TCrypto_priceHistoriesRes,
    TCrypto_walletAssetsResponse,
    TCrypto_walletAssets,
    TCrypto_weekTransactions,
}
