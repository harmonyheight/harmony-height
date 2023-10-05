import AutoScrollSlider from "@/components/home/AutoScrollSlider";
import Slider from "@/components/home/Slider";
import Statistic from "@/components/home/Statistic";
import TabSection from "@/components/home/TabSection";

export default function Home() {
  return (
    <main className='w-full  flex h-screen flex-col'>
      <TabSection />
      <Slider />
      <AutoScrollSlider />
      <Statistic />
    </main>
  )
}
