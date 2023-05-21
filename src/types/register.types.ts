export interface IRegister {
     name : string
     national_code : string
     birthday : string
     phone : string
     email : string
     completedStep : "no_status" | "person_information" | "confirmed_OTP" | "contact_information" | "confirm_phone_number"
     otp : string
     password : string
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
export type TRegisterActionPayload = {
     name: string
     phone: string
     email: string
     password: string
}