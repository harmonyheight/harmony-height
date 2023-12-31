/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import PropertyCard from "./PropertyCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBuyPopularListings } from "@/store/thunks/buyListingThunk";
import { useRouter } from "next/navigation";

const Propular = () => {
    const dispatch = useAppDispatch();
    const { popularListings, loading } = useAppSelector((state) => state.buylisting);

    React.useEffect(() => {
        dispatch(getBuyPopularListings())
    }, [dispatch])
    const { push } = useRouter();
    return <div>
        <div className="pl-7 pt-10">
            <div className="border-l-4 border-primary">
                <h3 className="text-xl font-semibold uppercase pl-2">Experience the Pinnacle of Luxury Living</h3>
            </div>
            <div className="text-base w-[95%] p-4 justify-center items-center text-center flex pt-3 italic">
                Indulge in the pinnacle of luxury living with our popular properties. From breathtaking views to state-of-the-art amenities, these homes embody the epitome of elegance and sophistication.</div>
        </div>
        <div className="flex flex-row carousel mx-4">
            {

                loading ? <div className="w-full justify-center items-center flex py-10">
                    <span className="loading loading-dots loading-lg"></span>
                </div> :
                    popularListings.length > 0 ? popularListings.map((item, index) => (
                        <div key={index} onClick={() => push(`/buy/all/${item._id}`)}>
                            <PropertyCard data={item} />
                        </div>
                    )) :
                        <div className="w-full justify-center items-center flex py-10">
                            <span>NO RECORD FOUND</span>
                        </div>
            }
        </div>
        {
            popularListings.length > 0 &&
            <div className="mt-4 items-center justify-center w-full flex">
                <button className="btn btn-primary" onClick={() => push('/buy/all')}>VIEW MORE</button>
            </div>
        }
    </div>;
};

export default Propular;
