
import Chart from '@/components/homePage/Chart'
import Header from '@/components/homePage/Header'
import Slider from '@/components/homePage/Slider'
export default function Home() {
  return (
    <main className={'w-full h-screen p-6'}>
        <Header/>
        <Slider/>
        <Chart />
    </main>
  )
}
