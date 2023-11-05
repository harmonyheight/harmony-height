/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import SliderCard from "./SliderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { gethomeLatestListings } from "@/store/thunks/homeListingThunk";
const Slider = () => {
    const dispatch = useAppDispatch();
    const { latestListings } = useAppSelector((state) => state.homelisting);
    React.useEffect(() => {
        dispatch(gethomeLatestListings())
    }, [dispatch])
    console.log("Rendering Slider component");
    return <React.Fragment>
        <div className='justify flex w-full flex-col items-center bg-yellow-50 py-4 h-full'>

            <div className="flex justify-center items-center flex-col">
                <h3 className="font-bold text-gray-900 text-2xl uppercase">Explore Our Latest Listings</h3>
                <span className="text-clip text-right w-full align-super py-4"> Discover a wide range of newly listed homes in Toronto</span>
            </div>
            <div className="carousel carousel-center w-11/12 p-4 space-x-4 bg-base-300 rounded-box h-2/3 mt-5 shadow-lg">

                {
                    latestListings.length > 0 && latestListings.map((list, index) => (
                        <SliderCard list={list} key={index} />
                    ))
                }
            </div>
        </div>
    </React.Fragment>;
};

export default Slider;
