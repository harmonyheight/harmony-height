/* eslint-disable @next/next/no-img-element */
import React from "react";
import SliderCard from "./SliderCard";
import { LatestListing } from "@/schema/types/homepage/homepagetypes";
const data: LatestListing[] = [{
    area: '~1130 SqFt',
    bathroom: 3,
    bed: 7,
    image: '/home2.jpg',
    price: '$128,000',
    badge: 'new',
    address: '143 Arthur St, Sudbury Remote Area',
    state: 'Ontario',
    _id: '1'
},
{
    area: '~1130 SqFt',
    bathroom: 2,
    bed: 4,
    image: '/home2.jpg',
    price: '$128,000',
    badge: 'old',
    address: '143 Arthur St, Sudbury Remote Area',
    state: 'British Columbia',
    _id: '1'
},
{
    area: '~1130 SqFt',
    bathroom: 3,
    bed: 3,
    image: '/home2.jpg',
    price: '$128,000',
    badge: '',
    address: '143 Arthur St, Sudbury Remote Area',
    state: 'Prince Edward Island',
    _id: '1'
}
]
const Slider = () => {
    return <React.Fragment>
        <div className='justify flex w-full flex-col items-center bg-yellow-50 py-4 h-full'>

            <div className="flex justify-center items-center flex-col">
                <h3 className="font-bold text-gray-900 text-2xl uppercase">Explore Our Latest Listings</h3>
                <span className="text-clip text-right w-full align-super py-4"> Discover a wide range of newly listed homes in Toronto</span>
            </div>
            <div className="carousel carousel-center w-11/12 p-4 space-x-4 bg-base-300 rounded-box h-2/3 mt-5 shadow-lg">

                {
                    data.map((list, index) => (
                        <SliderCard list={list} key={index} />
                    ))
                }
            </div>
        </div>
    </React.Fragment>;
};

export default Slider;
