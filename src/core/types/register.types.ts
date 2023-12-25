interface IRegister {
    name: string
    national_code: string
    birthday: string
    phone: string
    email: string
    completedStep: 'no_status' | 'person_information' | 'confirmed_OTP' | 'contact_information' | 'confirm_phone_number'
    otp: string
    password: string
}
// choose Location
type TProvince = {
    id: number
    name: string
}
type TCity = {
    id: number
    name: string
    slug: string
    province_id: number
}
type TRegisterActionPayload = {
    name: string
    phone: string
    email: string
    password: string
}
export type { IRegister, TProvince, TCity, TRegisterActionPayload }
