/* eslint-disable @next/next/no-img-element */
"use client"
import { Listing } from "@/schema/types/properties/properties";

import { LiaBedSolid, LiaPencilRulerSolid } from "react-icons/lia";
import { IoWaterOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { TbBuildingCommunity } from "react-icons/tb";
import { CiParking1 } from "react-icons/ci";
import { BsSignNoParking } from "react-icons/bs";
import { MdOutlineElectricBolt } from "react-icons/md";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import React from "react";
import { GoPeople } from "react-icons/go";
import { useAppSelector } from "@/store/hooks";
function formatNumberWithCommas(number: any) {
    return number.toLocaleString('en-US', { style: 'decimal' });
}

const DetailProperty = ({ listing }: { listing: Listing }) => {
    const { user } = useAppSelector(state => state.auth)
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
                    <h3 className="text-xl font-semibold uppercase pl-2">Property Detail</h3>
                </div>
            </div>

            <div className="flex w-full py-3">

                <div className="grid h-20 flex-grow card bg-slate-50 rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <TbBuildingCommunity className="text-2xl" />

                        </div>
                        <div className="stat-title">Property Type</div>
                        <div className="stat-value capitalize">{listing?.type}</div>
                    </div>
                </div>
            </div>

            <div className="flex w-full py-3">

                <div className="grid h-20 flex-grow card bg-slate-50 rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <GoPeople className="text-2xl" />

                        </div>
                        <div className="stat-title">Spaces</div>
                        <div className="stat-value">{listing?.spaces}</div>
                    </div>
                </div>
            </div>



            <div className="flex w-full py-5">

                <div className="grid h-20 flex-grow card bg-slate-50 rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <LiaPencilRulerSolid className="text-2xl" />
                        </div>
                        <div className="stat-title">Area (squarefeet)</div>
                        <div className="stat-value">{formatNumberWithCommas(listing?.area)}</div>
                    </div>
                </div>
            </div>
            <div className="flex w-full py-2">

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
            <div className="py-8">
                <div className="border-l-4 border-primary">
                    <h3 className="text-xl font-semibold uppercase pl-2">Facilities</h3>
                </div>
            </div>
            <div className="flex w-full py-2">

                <div className="grid h-20 flex-grow card bg-gray-800 text-white rounded-box place-items-center ">
                    <div className="stat ">
                        <div className="stat-figure">
                            {
                                listing?.parking ?
                                    <CiParking1 className="text-2xl" />
                                    :
                                    <BsSignNoParking className="text-2xl" />
                            }
                        </div>
                        <div className="stat-title text-white">Parking Facility</div>
                        <div className="stat-value ">{listing?.parking ? "Yes" : "No"}</div>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-20 flex-grow card bg-gray-800 text-white rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            {
                                listing?.wifi ?
                                    <CiWifiOn className="text-2xl" />
                                    :
                                    <CiWifiOff className="text-2xl" />
                            }
                        </div>
                        <div className="stat-title text-white">Wifi </div>
                        <div className="stat-value">{listing?.wifi ? "Yes" : "No"}</div>
                    </div>
                </div>
            </div>
            <div className="flex w-full py-2">

                <div className="grid h-20 flex-grow card bg-gray-800 text-white rounded-box place-items-center ">
                    <div className="stat ">
                        <div className="stat-figure">
                            <IoWaterOutline className="text-2xl" />
                        </div>
                        <div className="stat-title text-white">Water Facility</div>
                        <div className="stat-value ">{listing?.water ? "Yes" : "No"}</div>
                    </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-20 flex-grow card bg-gray-800 text-white rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <MdOutlineElectricBolt className="text-2xl" />
                        </div>
                        <div className="stat-title text-white">Electricity </div>
                        <div className="stat-value">{listing?.electricity ? "Yes" : "No"}</div>
                    </div>
                </div>
            </div>
            <div className="py-8">
                <div className="border-l-4 border-primary">
                    <h3 className="text-xl font-semibold uppercase pl-2">Seller Information</h3>
                </div>
            </div>
            <div className="flex w-full py-3">

                <div className="grid h-20 flex-grow card rounded-box place-items-center ">
                    <div className="stat">
                        <div className="stat-figure">
                            <div className="avatar placeholder">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <span className="text-black justify-center item text-2xl">

                                        {listing.user.name[0].toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="stat-value">{listing?.user?.name}</div>
                        <div className="stat-actions">{listing?.user?.email}</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DetailProperty;
