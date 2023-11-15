"use client"
import withAuth from "@/components/auth/withAuth";
import Slides from "@/components/buy/Slides";
import NavBar from "@/components/navbar/NavBar";
import Facilities from "@/components/rent/Facilities";
import HeroSectionRent from "@/components/rent/HeroSectionRent";
import PopularRenting from "@/components/rent/PopularRenting";
import React from "react";

const RentPage = () => {
    return <div>
        <NavBar />
        <HeroSectionRent />
        {/* <div className="px-4 rounded-lg overflow-hidden my-5">
            <Slides />
        </div> */}
        <Facilities />
        <PopularRenting />
    </div>;
};

export default withAuth(RentPage);
