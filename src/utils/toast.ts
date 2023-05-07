import { FC } from "react";
import { toast } from "react-toastify";

export type TToastType = 'success' | 'error'

type TToastProps = {
     type : TToastType,
     message : object | Array<string>
}


export const toastify : FC<TToastProps> = ({type , message} : {type : string , message : Array<string> | any}) : JSX.Element | any => {
     if(typeof message === 'string'){
          toast[type](message)
     }else if(typeof message === 'object'){
          message.forEach((item : TToastProps) => {
               toast[type](item?.message)
          });          
     }
}