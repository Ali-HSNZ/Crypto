import { TInputProps } from '@/types/other.types';
import { toPersianDigits } from '@/utils/methods';
import { FC, useRef, useState } from 'react';

const Input: FC<TInputProps> = ({ dir, icon, maxLength, disabled, type, title, placeholder, children, formik, name }): JSX.Element => {

     const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true)
     const inputRef = useRef<HTMLInputElement>(null)

     const togglePasswordVisibility = () => {
          setIsPasswordVisible(!isPasswordVisible)
          if (inputRef.current) {
               if (inputRef.current.type === 'text') {
                    inputRef.current.type = 'password'
               } else {
                    inputRef.current.type = 'text'
               }
          }
     }

     return (
          <div className="relative w-full flex flex-col rounded-full ">

               {/* Title */}
               <p className='font-iranyekan-bold text-sm absolute top-[-10px] right-10 bg-white px-3'>
                    {title}
               </p>

               {/* input */}
               <input
                    ref={inputRef}
                    placeholder={placeholder}
                    type={type || "text"}
                    id={`${name}_input`}
                    disabled={disabled ?? false}
                    name={name}
                    value={toPersianDigits(formik.values[name])}
                    dir={dir || "rtl"}
                    onChange={formik.handleChange}
                    autoComplete={"off"}
                    onBlur={formik.handleBlur}
                    {...(maxLength && { maxLength })}
                    className={`font-iranyekan-regular ${formik.errors[name] && formik.touched[name] ? "hover:border-red-300 focus:border-red-300 border-red-200" : "focus:border-gray-300 bg-white hover:border-gray-300 border-gray-200"} placeholder:text-sm placeholder:text-gray-400 ${disabled && "cursor-not-allowed"}  pl-11 pr-[70px] border-2 w-full py-4 rounded-full outline-none`}
               />

               {/* Icon */}
               <label htmlFor={`${name}_input`} className='absolute cursor-pointer top-0 right-0 pr-6 px-2 py-[17px] rounded-r-full'>
                    {icon}
               </label>

               {/* Line */}
               <div className='w-fit h-fit px-2 border rotate-90 absolute right-[50px] top-7'></div>

               {/* show/hidden password */}
               {type === 'password' && <button type={'button'} onClick={togglePasswordVisibility} className='absolute top-0 left-0 pl-4 pr-2 bottom-0 rounded-l-full text-gray-400 hover:text-gray-500'>
                    {isPasswordVisible ? (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[23px] h-[23px] ">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                         </svg>
                    )}
               </button>}

               {/* children */}
               <div className='absolute top-0 left-0 pl-3  flex items-center justify-center pr-2 bottom-0 rounded-l-full'>
                    {children}
               </div>

               {/* Showing validation Error */}
               {formik.errors[name] && formik.touched[name] && (
                    <p className='absolute top-[-25px] left-[0] font-iranyekan-regular text-xs text-red-600'>
                         {formik.errors[name]}
                    </p>
               )}
          </div>
     );
}

export default Input;