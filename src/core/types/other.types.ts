/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TCity, type TProvince } from './register.types'

type TSelectboxProps = {
    setSelected: TProvince | TCity | any
    selected: string | any
    query: string
    notFoundTitle: string
    setQuery: React.Dispatch<React.SetStateAction<any>>
    data: Array<TProvince> | Array<TCity>
    icon: JSX.Element
    title: string
    name: string
    formik: any
    // optional =>
    isDisabled?: boolean
    placeholder?: string
}
type TInputProps = {
    title: string
    icon: JSX.Element
    placeholder?: string
    type: 'password' | 'tel' | 'text' | 'email'
    children?: JSX.Element
    dir?: 'rtl' | 'ltr'
    formik?: any
    name?: string | any
    maxLength?: number | undefined
    disabled?: boolean | undefined
}
export type { TSelectboxProps, TInputProps }
