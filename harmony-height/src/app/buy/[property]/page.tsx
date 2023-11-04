import SearchBar from "@/components/buy/SearchBar";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const PropertyPage = ({
    params: { property }
}: {
    params: {
        property: string
    }
}) => {
    return <div>
        <NavBar />
        <SearchBar />
        PropertyPage {property}
    </div>;
};

export default PropertyPage;
