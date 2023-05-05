import { FC } from "react";
import { toast } from "react-toastify";

export type TToastType = 'success' | 'error'

type TToastProps = {
     type : TToastType,
     message : object | Array<string>
}


export const toastify : FC<TToastProps> = ({type , message}) : any => {
     if(typeof message === 'string'){
          toast[type](message)
          console.log("message String : ",message);
          
     }else if(typeof message === 'object'){
          message.forEach((item) => {
               toast[type](item?.message)
          });
          console.log("message Object : ",message);
          
     }
}