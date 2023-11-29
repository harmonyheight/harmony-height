import { Listing } from "@/schema/types/properties/properties";

import { AiOutlineHeart } from "react-icons/ai";
import { LiaBedSolid, LiaPencilRulerSolid } from "react-icons/lia";
import { PiBathtubLight } from "react-icons/pi";
import { TbBuildingCommunity } from "react-icons/tb";
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import React from "react";
function formatNumberWithCommas(number: any) {
    return number.toLocaleString('en-US', { style: 'decimal' });
}

const DetailProperty = ({ listing }: { listing: Listing }) => {
    return (
        <div className="flex flex-col">

            <div className="stats">

                <div className="stat">
                    <div className="indicator p-2">
                        <div className="stat-value">$ {formatNumberWithCommas(listing?.price)}</div>
                        <span className="indicator-item badge badge-primary">new</span>
                    </div>
                </div>

            </div>
            <div className=" pt-8">
                <div className="border-l-4 border-primary">
                    <h3 className="text-xl font-semibold uppercase pl-2">Property Address</h3>
                </div>
            </div>
            <div className="stats">
                <div className="stat">
                    <div className="stat-title text-gray-950 text-2xl">{listing.zipcode}, {listing.city}, {listing.state}</div>
                </div>
            </div>
            <div className="pt-8">
                <div className="border-l-4 border-primary">
                    <h3 className="text-xl font-semibold uppercase pl-2">Property Facility</h3>
                </div>
            </div>
            <div className="flex w-full py-5">

                <div className="grid h-20 flex-grow card bg-slate-50 rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <LiaBedSolid className="text-2xl" />
                        </div>
                        <div className="stat-title">Bedrooms</div>
                        <div className="stat-value">{listing?.bedrooms}</div>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-20 flex-grow card bg-slate-50 rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <PiBathtubLight className="text-2xl" />
                        </div>
                        <div className="stat-title">Bathrooms</div>
                        <div className="stat-value">{listing?.bathrooms}</div>
                    </div>
                </div>

            </div>
            <div className="flex w-full py-5">

                <div className="grid h-20 flex-grow card bg-slate-50 rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <LiaPencilRulerSolid className="text-2xl" />
                        </div>
                        <div className="stat-title">Bedrooms</div>
                        <div className="stat-value">{listing?.bedrooms}</div>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-20 flex-grow card bg-slate-50 rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <PiBathtubLight className="text-2xl" />
                        </div>
                        <div className="stat-title">Bathrooms</div>
                        <div className="stat-value">{listing?.bathrooms}</div>
                    </div>
                </div>

            </div>
            <div className="card-actions justify-start items-end ">
                <div className='flex flex-row items-center font-semibold'>
                    <div>
                        <p className='px-1 border-r-2 text-xs'>{listing?.bedrooms}</p>
                        <TbBuildingCommunity className="text-xs" />
                    </div>
                </div>
                <div className='flex flex-row items-center font-semibold'>
                    <LiaBedSolid className="text-xs" />
                    <p className='px-1 border-r-2 text-xs'>{listing?.bedrooms}</p>
                </div>
                <div className='flex flex-row items-center font-semibold'>
                    <PiBathtubLight className="text-xs" />
                    <p className='px-1 border-r-2 text-xs'>{listing?.bathrooms}</p>
                </div>
                <div className='flex flex-row items-center font-semibold'>
                    <LiaPencilRulerSolid />
                    <p className='px-1 border-r-2 text-xs'>
                        ~{listing?.area}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailProperty;
