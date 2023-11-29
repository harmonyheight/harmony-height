"use client"
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/swiper-bundle.css';
import { type Swiper as SwiperRef } from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
const ImageGallery = ({ images }: { images: string[] }) => {
    const swiperRef = React.useRef<SwiperRef>()
    return (
        <div className="justify-center items-center flex flex-col">
            <div className="w-[98%] h-[60%] p-3">
                <Swiper
                    style={{
                        '--swiper-navigation-color': '#f3cb1b',
                        '--swiper-pagination-color': '#f3cb1b',
                    } as React.CSSProperties}
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    grabCursor={true}
                    thumbs={{ swiper: swiperRef.current }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="shadow-md rounded-sm"
                >
                    {images.map((item, index) => (
                        <SwiperSlide key={`slide-${index}`} className="pt-[70%] overflow-hidden relative">
                            <img
                                src={item}
                                alt={`slide-${index}`}
                                className="absolute top-0 left-0 w-[100%] h-[50%]"
                            />

                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    modules={[FreeMode, Navigation, Thumbs]}
                >
                    {images.map((item, index) => (
                        <SwiperSlide key={`slide-${index}`} className="cursor-pointer border border-white">
                            <div className="w-[100%] pt-[30%] overflow-hidden relative ">

                                <img
                                    src={item}
                                    alt={`slide-${index}`}
                                    className="absolute top-0 left-0 w-[100%]"
                                />
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ImageGallery;
