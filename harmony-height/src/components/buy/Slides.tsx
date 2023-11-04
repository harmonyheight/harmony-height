"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

export default function Slides() {

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLDivElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', (1 - progress).toString());
    }

    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (
    <div className='h-[60vh]'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide><img src="/home4.jpg" alt="slide3" className='h-[60vh] w-full' /></SwiperSlide>
        <SwiperSlide><img src="/home3.jpg" alt="slide1" className='h-[60vh] w-full' /></SwiperSlide>
        <SwiperSlide><img src="/home2.jpg" alt="slide2" className='h-[60vh] w-full' /></SwiperSlide>
        <div className="autoplay-progress" slot="container-end">

          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
