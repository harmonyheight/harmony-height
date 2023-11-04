/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import PropertyCard from "./PropertyCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBuyPopularListings } from "@/store/thunks/buyListingThunk";
const Propular = () => {
    const dispatch = useAppDispatch();
    const { popularListings, loading } = useAppSelector((state) => state.buylisting);
    React.useEffect(() => {
        dispatch(getBuyPopularListings())
    }, [])
    return <div>
        <div className="pl-7 pt-10">
            <div className="border-l-4 border-primary">
                <h3 className="text-xl font-semibold uppercase pl-2">Popular Properties</h3>
            </div>
            <div className="text-base w-[95%] p-4 justify-center items-center text-center flex pt-3 italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mollis, lorem at iaculis porttitor, velit enim luctus tellus, id porta elit augue non augue. Praesent efficitur gravida lectus, vitae euismod.</div>
        </div>
        <div className="flex flex-row carousel mx-4">
            {

                loading ? <div className="w-full justify-center items-center flex py-10">
                    <span className="loading loading-dots loading-lg"></span>
                </div> :
                    popularListings.length > 0 ? popularListings.map((item, index) => (
                        <div key={index}>
                            <PropertyCard data={item} />
                        </div>
                    )) :
                        <div className="w-full justify-center items-center flex py-10">
                            <span>NO RECORD FOUND</span>
                        </div>
            }
        </div>
    </div>;
};

export default Propular;
