import FilterData from "@/components/buy/FilterData";
import SearchBar from "@/components/buy/SearchBar";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const PropertyPage = () => {
    return <div>
        <NavBar />
        <SearchBar />
        <FilterData />
    </div>;
};

export default PropertyPage;
