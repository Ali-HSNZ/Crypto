
import Chart from '@/components/homePage/Chart'
import Header from '@/components/homePage/Header'
import Menu from '@/components/homePage/Menu'
import Slider from '@/components/homePage/Slider'
import { Modal } from '@mui/material'
import { useState } from 'react'
import logo from '@/images/Logo.png'
import Link from 'next/link'


const Home = () => {

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)


  return (
    <main className={'w-full gap-x-6 grid  grid-cols-10 h-auto md:h-screen p-6'}>

      <div className={`${isOpenMenu ? "lg:col-span-2" : "hidden"} `}>
        <Menu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
      </div>
      <div className={`${isOpenMenu ? "col-span-10 lg:col-span-8" : "col-span-10"}  `}>
        <Header setIsOpenMenu={setIsOpenMenu} isOpenMenu={isOpenMenu} />
        <Slider />
        <Chart />
      </div>
    </main>
  )
}
export default Home