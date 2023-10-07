/* eslint-disable @next/next/no-img-element */
import React from "react";
import { LiaBedSolid, LiaPencilRulerSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { TbBuildingCommunity } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import PropertyCard from "./PropertyCard";
const images = [
    '/home3.jpg',
    '/home2.jpg',
    '/home1.jpg',
];
const images2 = [
    '/home2.jpg',
    '/home3.jpg',
];
const images3 = [
    '/home2.jpg',
];
const images4 = [
    '/home3.jpg',
];

const Propular = () => {
    return <div>
        <div className="px-7 pt-10">
            <div className="border-l-4 border-primary">
                <h3 className="text-xl font-semibold uppercase pl-2">Popular Properties</h3>
            </div>
        </div>
        <div className="flex flex-row carousel">
            <PropertyCard images={images} />
            <PropertyCard images={images2} />
            <PropertyCard images={images3} />
        </div>
    </div>;
};

export default Propular;
