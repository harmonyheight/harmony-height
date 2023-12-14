import Link from "next/link";
import React from "react";

const HeroSection = () => {
    return <div className="hero min-h-screen bg-stone-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <img src="/home1.jpg" className="max-w-sm rounded-lg shadow-2xl" />
            <div className="w-[100%]">
                <h1 className="text-5xl font-bold">Exclusive Listings</h1>
                <div className="w-[85%]">
                    <p className="py-6">Discover exclusive listings that align with your vision of a dream home. Our curated selection of properties showcases quality, style, and unique features.</p>
                    <Link href="/buy/all" className="btn btn-primary">EXPLORE</Link>
                </div>
            </div>
        </div>
    </div>
        ;
};

export default HeroSection;
