import { FC, Fragment, useRef } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { TCity, TProvince } from '@/types/register.types'

type TSelectboxProps = {
    setSelected : TProvince | TCity | any,
    selected : string | any,
    query : string,
    notFoundTitle : string,
    setQuery : React.Dispatch<React.SetStateAction<any>>,
    filteredData : TProvince | TCity | any,
    icon: JSX.Element
    title : string
    
    // optional =>
    isDisabled? : boolean,
    placeholder? : string,
    disabled? : boolean
}


const SelectBox : FC<TSelectboxProps> = ({isDisabled,icon,title,placeholder ,disabled,notFoundTitle, selected , query , setSelected , filteredData , setQuery}) => {

     const inputRef = useRef<HTMLInputElement>(null)

     const focusHandler = () => {
          if(inputRef.current)
          inputRef.current.focus()
     }

     return ( 
        <div className="flex items-center">
            <Combobox disabled={isDisabled || false} value={selected} onChange={setSelected}>
                <div className="relative w-full">
                    <div className="relative  focus:outline-none ">
                         {/* title */}
                         <p className='font-iranyekan-bold text-sm absolute top-[-10px] right-10 bg-white px-3'>{title}</p>
                         {/* icon */}
                         <label onClick={focusHandler} className='absolute top-0 right-0 pr-6 px-2 py-[17px] rounded-r-full'>{icon}</label>
                         {/* line */}
                         <div className='w-fit h-fit px-2 border rotate-90 absolute right-[50px] top-7'></div>

                        <Combobox.Input ref={inputRef} placeholder={isDisabled ? "ابتدا استان مورد نظر را انتخاب کنید" :  placeholder ? placeholder : ""}  onChange={(event) => setQuery(event.target.value)} className={`font-iranyekan-regular focus:border-gray-300 bg-white hover:border-gray-300 border-gray-200  placeholder:text-sm placeholder:text-gray-400 ${disabled && "cursor-not-allowed"}  pl-11 pr-[70px] border-2 w-full py-4 rounded-full outline-none`}   displayValue={(item : TCity | TProvince) => item.name ?? ""}/>
                        <Combobox.Button>
                              <div className='absolute top-0 left-0 pl-4 flex items-center justify-center pr-2 bottom-0 rounded-l-full'>
                                   <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                   </button>
                              </div>

                        </Combobox.Button>
                    </div>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery('')}>
                        <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredData && filteredData.length === 0 && query !== '' ? (
                                <div className="relative cursor-pointer select-none py-2 px-4 text-gray-700 font-iranyekan-regular">{notFoundTitle}</div>
                            ) : (
                                filteredData && filteredData.map((item : TProvince | TCity) => (
                                    <Combobox.Option  value={item} key={item.id} className={({ active }) => `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-100' : 'text-gray-900'}`}>
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`  font-iranyekan-regular text-sm block truncate text-gray-800 ${ selected && 'font-iranyekan-bold text-black' }`}> {item.name} </span>
                                                {selected && (
                                                    <span className={`absolute  cursor-pointer inset-y-0 left-0 flex items-center pl-3 text-gray-700`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}
 
export default SelectBox;