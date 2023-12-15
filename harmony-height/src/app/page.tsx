import AutoScrollSlider from "@/components/home/AutoScrollSlider";
import Banner from "@/components/home/Banner";
import Slider from "@/components/home/Slider";
import Statistic from "@/components/home/Statistic";
import TabSection from "@/components/home/TabSection";
import NavBar from "@/components/navbar/NavBar";

export default function Home() {
  return (

    <main className='w-full  flex h-screen flex-col'>
      <NavBar />
      {/* <Banner /> */}
      <TabSection />
      <Slider />
      <Statistic />
    </main>
  )
}
