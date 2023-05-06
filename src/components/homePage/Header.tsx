import logo from '@/images/Logo.png'
import {FC} from 'react'

type THeaderProps = {
     isOpenMenu : boolean,
     setIsOpenMenu : React.Dispatch<React.SetStateAction<boolean>>
}

const Header : FC<THeaderProps> = ({isOpenMenu , setIsOpenMenu}) => {

     return (
          <div className="bg-white h-auto w-full rounded-xl p-4 flex justify-between items-center">
               {/* Menu Button */}
               <button onClick={()=>setIsOpenMenu(!isOpenMenu)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
               </button>
               <div className='flex items-center justify-center gap-x-8'>
                    <button className='relative'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                         </svg>
                         <div className='bg-green-500 p-1.5 w-fit h-fit rounded-full absolute top-0 right-0'></div>
                    </button>
                    <img src={logo.src} className='w-14 rounded-full object-cover' />
               </div>
          </div>
     );
}

export default Header;