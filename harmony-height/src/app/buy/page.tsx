import HeroSection from "@/components/buy/HeroSection";
import NewListing from "@/components/buy/NewListing";
import Propular from "@/components/buy/Propular";
import Slides from "@/components/buy/Slides";
import NavBar from "@/components/navbar/NavBar";
import React, { Suspense } from "react";
import BuyLoading from "./loading";

const BuyPage = () => {

    return <div>
        <NavBar />
        <HeroSection />
        <div className="px-4 rounded-lg overflow-hidden my-5">
            <Slides />
        </div>
        <Suspense fallback={<BuyLoading />}>
            <Propular />
            <div className="w-full h-2/3">
                <NewListing />
            </div>
        </Suspense>
    </div>;
};

export default BuyPage;
