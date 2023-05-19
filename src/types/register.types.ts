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
     completedStep : "no_status" | "person_information" | "confirmed_OTP" | "contact_information" | "confirm_phone_number"
     otp : string
     password : string
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
export type TRegisterActionPayload = {
     name: string
     phone: string
     email: string
     password: string
}