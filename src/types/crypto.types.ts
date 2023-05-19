// FavoriteCoins
export type TCrypto_favoriteCoinsRes = {
     image: string,
     name: string,
     price_change_24h: number,
     symbol: string,
     circulating_supply: number
}
// PriceChanges
export type TCrypto_priceHistoriesRes = {
     usd: number,
     usd_24h_change: number,
     history: Array<[number,number]>
     name: string,
     fa_name: string
     symbol : string,
     imageUrl : string
}
// walletAssets
export type TCrypto_walletAssetsResponse = {
     id: number
     name: string
     symbol: string
     balance: number
}
export type ICrypto_walletAssets = {
     loading: boolean;
     error: string | null;
     data: Array<TCrypto_walletAssetsResponse> | null
}

// WeekTransactions
export type TCrypto_weekTransactions = Array<Array<number>> | null
