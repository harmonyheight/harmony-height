import React from "react";
import { TbBuildingCommunity } from 'react-icons/tb'
import { LiaBedSolid } from "react-icons/lia"
import { PiBathtubLight } from "react-icons/pi"
import { LiaPencilRulerSolid } from "react-icons/lia"
import { LatestListing } from "@/schema/types/homepage/homepagetypes";
const SliderCard = ({ list }: { list: LatestListing }) => {
    return (
        <div className="carousel-item">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                    <img src="/home3.jpg" alt="Shoes" />
                    <div className='w-6'>
                        <h1 className='absolute bg-warning top-2 left-0 px-5 rounded-br-xl rounded-tl-md text-accent'>{list.state}</h1>
                    </div>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {list?.price}
                        <div className="badge badge-warning">NEW</div>
                    </h2>
                    <p className='font-extralight'>{list?.address}</p>
                    <div className="card-actions justify-start">
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

        </div>

    )

        ;
};

export default SliderCard;
