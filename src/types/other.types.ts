import { TCity, TProvince } from "./register.types"

export type TSelectboxProps = {
     setSelected: TProvince | TCity | any,
     selected: string | any,
     query: string,
     notFoundTitle: string,
     setQuery: React.Dispatch<React.SetStateAction<any>>,
     data: Array<TProvince> | Array<TCity> | undefined,
     icon: JSX.Element
     title: string
     name: string
     formik: any,
     // optional =>
     isDisabled?: boolean,
     placeholder?: string,
}
export type TInputProps = {
     title: string,
     icon: JSX.Element,
     placeholder?: string,
     type: 'password' | 'tel' | 'text' | "email"
     children?: JSX.Element,
     dir?: 'rtl' | 'ltr',
     formik?: any
     name?: string | any
     maxLength?: number | undefined;
     disabled?: boolean | undefined
}