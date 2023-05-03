import Modal from '@mui/material/Modal'
import {provinces} from '@/static/provinces';
import {useState} from 'react'

type TModal = {
     open : boolean,
     setOpen : React.Dispatch<React.SetStateAction<boolean>>
}

type Tprovince = {
     id : number,
     name : string
}

const Choose_provinces : React.FC<TModal> = ({open , setOpen}) => {
     
     const [search , setSearch] = useState<string>('')

     const findLocation = (province : string) : Array<Tprovince> => {
          if(search.length === 0){
               return provinces
          }else{
               return provinces.filter(item => item.name.includes(province))
          }
     }

     return (  
          <Modal className='flex justify-center items-center px-4' open={open} onClose={()=> setOpen(false)}>
               <section className='bg-white p-4 w-[700px] rounded-md '>
                    <div className='w-full flex justify-between gap-x-4 items-center'>
                         <h5 className='whitespace-nowrap font-iranyekan-bold text-gray-600'>استان</h5>
                         
                         <div className="w-full relative hidden sm:inline-block">
                              <svg className="w-[20px] h-[20px] absolute top-3 right-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                              </svg>
                              <input onChange={input => setSearch(input.target.value)} maxLength={60} placeholder="جست‌وجوی نام استان ..." type="tel" name="password" className={` placeholder:text-xs placeholder:text-gray-400 w-full bg-gray-50 border-gray-200 hover:border-gray-300 focus:border-gray-300 text-gray-600  py-3 pl-2 pr-10 rounded-md font-iranyekan-regular text-sm border   focus:outline-none`} />
                         </div>
                         
                         <button className='p-2 border border-transparent rounded-full text-gray-500 hover:bg-gray-100'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                         </button>
                    </div>
                    <ul className='max-h-[350px] overflow-y-auto pl-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4 text-center'>
                         {findLocation(search).length === 0 ? (
                              <p className='w-full p-3 text-red-500 text-sm text-right font-iranyekan-medium'>شهری یافت نشد!</p>
                         ) : findLocation(search).map(province => (
                                   <li key={province.id} className='bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 cursor-pointer rounded-md p-3 font-iranyekan-regular text-sm text-gray-600'>
                                        {province.name}
                                   </li>
                              ))
                         }
                    </ul>
               </section>
          </Modal>
     );
}
 
export default Choose_provinces;