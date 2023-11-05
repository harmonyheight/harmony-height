"use client"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBuyPopularListings } from "@/store/thunks/buyListingThunk";
import React from "react";
import FilterCard from './FilterCard';

const FilterData = () => {
    const dispatch = useAppDispatch();
    const { popularListings, loading } = useAppSelector((state) => state.buylisting);
    React.useEffect(() => {
        dispatch(getBuyPopularListings())
    }, [dispatch])
    return (
        <div>
            <div className="stats  justify-end items-end">
                <div className="stat">
                    <div className="stat-desc">Total listing found: 21</div>
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start md:justify-center">
                {

                    loading ? <div className="w-full justify-center items-center flex py-10">
                        <span className="loading loading-dots loading-lg"></span>
                    </div> :
                        popularListings.length > 0 ? popularListings.map((item, index) => (
                            <div key={index} >
                                <FilterCard data={item} />
                            </div>
                        )) :
                            <div className="w-full justify-center items-center flex py-10">
                                <span>NO RECORD FOUND</span>
                            </div>
                }
            </div>
            <div className="join grid grid-cols-2 m-4 py-16">
                <button className="join-item btn btn-outline">Previous page</button>
                <button className="join-item btn btn-outline">Next</button>
            </div>
        </div>
    );
};

export default FilterData;
