import FilterData from "@/components/buy/FilterData";
import SearchBar from "@/components/buy/SearchBar";
import NavBar from "@/components/navbar/NavBar";
import React from "react";
import Loading from "./loading";

const PropertyPage = () => {
    return <div>
        <NavBar />
        <SearchBar type="Sell" />
        <React.Suspense fallback={<Loading />}>
            <FilterData />
        </React.Suspense>
    </div>;
};

export default PropertyPage;
