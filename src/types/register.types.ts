export interface IRegister {
     name : string
     national_code : string
     birthday : string
     phone : string
     email : string
     province : string
     city : string
     address : string
     x_position : string
     y_position : string
     step : string
     otp : string
     password : string
     registerStatus : boolean,
     loading : boolean
}
// choose Location
export type TProvince = {
     id? : number,
     name? : string
}
export type TCity = {
     id? : number,
     name? : string
     slug? : string,
     province_id? : number
}
export type TPoition = {
     lat? : number | string
     lng? : number | string
}