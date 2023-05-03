import { FC, useRef, useState } from 'react';

type TInputCommonProps = {
     title : string,
     icon : JSX.Element,
     dir? : 'rtl' | 'ltr',
     placeholder? : string,
     inputType : 'text' | 'password' | 'tel'
     children? : JSX.Element,
     childrenParentHover? : string
}

const InputCommon : FC<TInputCommonProps> = ({icon , inputType , title  , placeholder , children , childrenParentHover}) : JSX.Element => {
     
     const inputRef = useRef<HTMLInputElement>(null)

     const focusHandler = () => {
          if(inputRef.current)
          inputRef.current.focus()
     }
     const changeInputType = () => {
          setIsHiddenPassword(!isHiddenPassword)
          if(inputRef.current){
               if(inputRef.current.type === 'text'){
                    inputRef.current.type = 'password'
               }else{
                    inputRef.current.type = 'text'
               }
          }
     }
     
     const [isHiddenPassword , setIsHiddenPassword] = useState<boolean>(true)

     return (  
          <div className="relative w-full rounded-full ">
               {/* Title */}
               <p className='font-iranyekan-bold text-sm absolute top-[-10px] right-10 bg-white px-3'>{title}</p>
               {/* input */}
               <input ref={inputRef} placeholder={placeholder} type={inputType}  className='font-iranyekan-regular placeholder:text-sm placeholder:text-gray-400 focus:border-gray-300 hover:border-gray-300 border-gray-200 pl-11 pr-[70px] border-2 w-full py-4 rounded-full outline-none' />
               {/* Icon */}
               <button onClick={focusHandler} className='absolute top-0 right-0 pr-6 px-2 bottom-0 rounded-r-full '>{icon}</button>
               {/* Line */}
               <div className='w-fit h-fit px-2 border rotate-90 absolute right-[50px] top-6'></div>
               {/* show/hidden password */}
               {inputType === 'password' && <button onClick={changeInputType} className='absolute top-0 left-0 pl-4 pr-2 bottom-0 rounded-l-full text-gray-400 hover:text-gray-500'>
                    {isHiddenPassword ? (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[23px] h-[23px] ">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                         </svg>
                    )
               }
               </button>}
               {/* children */}
               {inputType !== 'password' && <div className='absolute top-0 left-0 pl-4 flex items-center justify-center pr-2 bottom-0 rounded-l-full'>{children}</div>}
          </div>
     );
}
 
export default InputCommon;