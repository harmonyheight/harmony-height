import SearchBar from "@/components/buy/SearchBar";
import NavBar from "@/components/navbar/NavBar";
import React from "react";
import RentAllLoading from "./loading";
import FilterData from "@/components/buy/FilterData";

const AllRentingProperties = () => {
    return (
        <div>
            <NavBar />
            <SearchBar type="rent" />
            <React.Suspense fallback={<RentAllLoading />}>
                <FilterData />
            </React.Suspense>
        </div>
    );
};

export default AllRentingProperties;
