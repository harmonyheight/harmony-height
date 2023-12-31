/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import PropertyCard from "./PropertyCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBuyLatestListings } from "@/store/thunks/buyListingThunk";
import { useRouter } from "next/navigation";

const NewListing = () => {
    const dispatch = useAppDispatch();
    const { latestListings, loading } = useAppSelector((state) => state.buylisting);
    const { push } = useRouter();
    React.useEffect(() => {
        dispatch(getBuyLatestListings())
    }, [dispatch])
    return <div>
        <div className="px-7 pt-10">
            <div className="border-l-4 border-primary">
                <h3 className="text-xl font-semibold uppercase pl-2">Trendsetting Designs, Timeless Appeal</h3>
            </div>
            <div className="text-base w-[95%] p-4 justify-center items-center text-center flex pt-3 italic">
                Witness trendsetting designs with timeless appeal in our newly listed properties. Each home is a showcase of architectural brilliance and interior sophistication, setting the standard for modern, stylish living.</div>

        </div>

        <div className="flex flex-row carousel mx-4">

            {

                loading ? <div className="w-full justify-center items-center flex py-10">
                    <span className="loading loading-dots loading-lg"></span>
                </div> :
                    latestListings.length > 0 ? latestListings.map((item, index) => (
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
            latestListings.length > 0 &&
            <div className="mt-4 items-center justify-center w-full flex">
                <button className="btn btn-primary" onClick={() => push('/buy/all')}>VIEW MORE</button>
            </div>
        }
    </div>;
};

export default NewListing;
