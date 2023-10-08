/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { LiaBedSolid, LiaPencilRulerSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { TbBuildingCommunity } from "react-icons/tb";
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


const PropertyCard = ({ images }: { images: any }) => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const prevSlide = () => {
        setCurrentSlide((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentSlide((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    return <div className="card w-96 bg-base-100 mt-5 mx-4 carousel-item rounded border p-0">
        <div className="card-body p-0">
            <figure className="h-2/3 w-full border items-center flex flex-row justify-center">
                <div className="carousel w-fit h-72 border-b-2">
                    <div className={`carousel-item relative w-full bg-gray-100 group`} >
                        <img src={images[currentSlide]} alt={images} className="w-full h-full" />
                    </div>
                </div>

                <h1 className='absolute bg-red-600 top-2 left-0 px-5 rounded-br-xl rounded-tl-md text-white'>Canada</h1>
                <div className="absolute bg-primary p-1 rounded-full right-2 top-1 cursor-pointer">
                    <AiOutlineHeart className="text-2xl" />
                </div>
                {
                    images.length > 1 && <>
                        <div className="absolute bg-primary p-1 rounded-full right-2  cursor-pointer opacity-70" onClick={nextSlide}>
                            <GoArrowRight className="text-xl" />
                        </div>
                        <div className="absolute bg-primary p-1 rounded-full left-2  cursor-pointer opacity-70" onClick={prevSlide}>
                            <GoArrowLeft className="text-xl" />
                        </div></>
                }
            </figure>

            <div className="h-1/3 p-3">
                <div className="absolute bg-primary px-2 rounded-lg cursor-pointer right-2">
                    Images:<span className="pr-1"> {currentSlide + 1}/{images.length}</span>
                </div>
                <h2 className="card-title">
                    $ 1,288,000
                    <div className="badge badge-success">NEW</div>
                </h2>
                <p className='font-extralight'>143 Arthur St, Sudbury Remote Area</p>
                <div className="card-actions justify-start">
                    <div className='flex flex-row items-center font-semibold'>
                        <TbBuildingCommunity className="text-xs" />
                        <p className='px-1 border-r-2 text-xs'>Residentials</p>
                    </div>
                    <div className='flex flex-row items-center font-semibold'>
                        <LiaBedSolid className="text-xs" />
                        <p className='px-1 border-r-2 text-xs'>3</p>
                    </div>
                    <div className='flex flex-row items-center font-semibold'>
                        <PiBathtubLight className="text-xs" />
                        <p className='px-1 border-r-2 text-xs'>3</p>
                    </div>
                    <div className='flex flex-row items-center font-semibold'>
                        <LiaPencilRulerSolid className="text-xs" />
                        <p className='px-1 border-r-2 text-xs'>
                            ~1130 SqFt</p>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default PropertyCard;
