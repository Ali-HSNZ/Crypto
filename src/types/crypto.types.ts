
//? FavoriteCoins
export type TFavoriteCoinsResponse = {
     image : string,
     name : string,
     price_change_24h : number,
     symbol : string,
     circulating_supply : number
}
export interface ICrypto_favoriteCoins {
     loading: boolean;
     error: string | null;
     data: null | Array<TFavoriteCoinsResponse>
}


//? PriceChanges
export type TPriceChangesResponse = {
     usd: number ,
     usd_24h_change: number,
     history: Array<Array<number>>
     name: string,
     fa_name: string
}
export interface ICrypto_priceChanges {
     loading: boolean;
     error: string | null;
     bitcoin: null | TPriceChangesResponse;
     dogecoin: null | TPriceChangesResponse;
     tether: null | TPriceChangesResponse;
     ethereum: null | TPriceChangesResponse
     ripple: null | TPriceChangesResponse
}


//? AccessWallet
export type TCrypto_accessWalletResponse = {
     id : number
     name : string
     symbol : string
     balance : number
}
export interface ICrypto_accessWallet {
     loading: boolean;
     error: string | null;
     data: Array<TCrypto_accessWalletResponse> | null
}


//? Trading View
export type TCrypto_tradingViewResponse = {
     market_caps : Array<Array<number>>
     prices : Array<Array<number>>
     total_volumes : Array<Array<number>>
}
export interface ICrypto_tradingView {
     loading: boolean;
     error: string | null;
     data: TCrypto_tradingViewResponse | null
}

//? lastWeekTransactions
export interface ICrypto_weekTransactions {
     loading: boolean;
     error: string | null;
     data: Array<Array<number>> | null
}