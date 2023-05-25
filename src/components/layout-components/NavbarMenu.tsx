import logo from '@/images/Logo.png'
import Image from 'next/image';
import Link from 'next/link';

const NavbarMenu = () => {

     return (
          <div className="w-full h-full   bg-white rounded-lg p-4 hidden lg:block">
               <div className="w-full flex justify-center items-center flex-col">
                    <Image 
                         alt='نیوکوین اسپیس'
                         src={logo.src}
                         width={80}
                         height={80}
                         className=''
                    />
                    <h1 className='font-iranyekan-bold mt-4 lg:text-base xl:text-xl'>نیوکوین اسپیس</h1>
               </div>
               <hr className='border-gray-300 mt-6' />
               <nav className='mt-6 flex flex-col gap-y-2'>
                    <Link href={'/'} className='w-full bg-[#388AEA] text-sm xl:text-base flex p-4 gap-x-2 rounded-xl font-iranyekan-bold text-blue-100'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 xl:w-7 xl:h-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                         </svg>
                         داشبورد
                    </Link>

                    <Link href={'/'} className='w-full bg-white text-sm xl:text-base hover:bg-[#74b5ff41] flex p-4 gap-x-2 rounded-xl font-iranyekan-bold text-gray-700'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 xl:w-7 xl:h-7 rotate-90">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                         </svg>
                         خرید و فروش
                    </Link>

                    <Link href={'/'} className='w-full bg-white text-sm xl:text-base hover:bg-[#74b5ff41] flex p-4 gap-x-2 rounded-xl font-iranyekan-bold text-gray-700'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 xl:w-7 xl:h-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                         </svg>
                         گزارش بازار
                    </Link>

                    <Link href={'/'} className='w-full bg-white text-sm xl:text-base hover:bg-[#74b5ff41] flex p-4 gap-x-2 rounded-xl font-iranyekan-bold text-gray-700'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 xl:w-7 xl:h-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                         </svg>
                         کیف پول
                    </Link>

                    <Link href={'/'} className='w-full bg-white text-sm xl:text-base hover:bg-[#74b5ff41] flex p-4 gap-x-2 rounded-xl font-iranyekan-bold text-gray-700'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 xl:w-7 xl:h-7">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                         </svg>
                         خروج
                    </Link>

               </nav>
          </div>
     );
}

export default NavbarMenu;