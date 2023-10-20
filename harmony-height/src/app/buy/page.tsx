import HeroSection from "@/components/buy/HeroSection";
import NewListing from "@/components/buy/NewListing";
import Propular from "@/components/buy/Propular";
import Slides from "@/components/buy/Slides";
import NavBar from "@/components/navbar/NavBar";
import React from "react";

const BuyPage = () => {
    return <div>
        <NavBar />
        <HeroSection />
        <Slides />
        <Propular />
        <div className="w-full h-2/3">
            <NewListing />
        </div>
    </div>;
};

export default BuyPage;
