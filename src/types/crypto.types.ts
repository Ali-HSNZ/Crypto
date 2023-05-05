export type TResponse = {
     usd: number,
     usd_24h_change: number,
     history: Array<Array<number>>
     name : string,
     fa_name : string
}

export interface ICryptoState {
     loading: boolean;
     error: string | null;
     bitcoin: null | TResponse;
     dogecoin: null | TResponse;
     tether: null | TResponse;
     ethereum : null | TResponse
     ripple : null | TResponse
     solana : null | TResponse
}