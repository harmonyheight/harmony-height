/* eslint-disable @next/next/no-img-element */
import React from "react";
import PropertyCard from "./PropertyCard";
import { PropertyCardType } from "@/schema/types/propertied/buy";
const images: string[] = [
    '/home3.jpg',
    '/home2.jpg',
    '/home1.jpg',
];
const images1: string[] = [
    '/home1.jpg',
    '/home3.jpg',
    '/home2.jpg',
];
const images2: string[] = [
    '/home1.jpg',
    '/home2.jpg',
    '/home3.jpg',
];
const NewListed: PropertyCardType[] = [
    {
        _id: '1',
        address: '143 Arthur St, Sudbury Remote Area',
        city: 'Ottawa',
        price: '1288000',
        bedrooms: '1',
        bathrooms: '2',
        area: '1130 SqFt',
        badge: 'new',
        images: images,
        type: 'Residentials'
    },
    {
        _id: '2',
        address: '143 Arthur St, Sudbury Remote Area',
        city: 'Montreal',
        price: '1288000',
        bedrooms: '5',
        bathrooms: '6',
        area: '1130 SqFt',
        badge: 'new',
        images: images1,
        type: 'Residentials'
    },
    {
        _id: '3',
        address: '143 Arthur St, Sudbury Remote Area',
        city: 'Victoria',
        price: '1288000',
        bedrooms: '4',
        bathrooms: '5',
        area: '1130 SqFt',
        badge: 'new',
        images: images2,
        type: 'Residentials'
    }
]
const NewListing = () => {

    return <div>
        <div className="px-7 pt-10">
            <div className="border-l-4 border-primary">
                <h3 className="text-xl font-semibold uppercase pl-2">New Listed Properties</h3>
            </div>
            <div className="text-base w-[95%] p-4 justify-center items-center text-center flex pt-3 italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis, lorem at iaculis porttitor, velit enim luctus tellus, id porta elit augue non augue. Praesent efficitur gravida lectus, vitae euismod.</div>

        </div>

        <div className="flex flex-row carousel mx-4">
            {
                NewListed.map((item, index) => (
                    <div key={item._id}>
                        <PropertyCard data={item} />
                    </div>
                ))
            }
        </div>
    </div>;
};

export default NewListing;
