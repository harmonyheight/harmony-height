"use client"
import { useAppSelector } from "@/store/hooks";

import React from "react";
import FilterCard from './FilterCard';

const FilterData = () => {
    const { listings, loading } = useAppSelector((state) => state.buyfilterlisting);
    return (
        <div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start md:justify-center">
                {

                    loading ? <div className="w-full justify-center items-center flex py-10">
                        <span className="loading loading-dots loading-lg"></span>
                    </div> :
                        listings.listings.length > 0 ? listings.listings.map((item, index) => (
                            <div key={index} >
                                <FilterCard data={item} />
                            </div>
                        )) :
                            <div className="w-full justify-center items-center flex py-10">
                                <span>NO RECORD FOUND</span>
                            </div>
                }
            </div>
        </div>
    );
};

export default FilterData;
