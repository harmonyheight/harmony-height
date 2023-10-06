/* eslint-disable @next/next/no-img-element */
"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsBuildings, BsBuildingAdd } from 'react-icons/bs'
const TabSection = () => {
    const [tab, setTab] = useState("sell");
    const { push } = useRouter();

    return (
        <div className="flex justify-evenly items-center bg-lime-50 flex-col rounded-md py-20 h-screen">
            <div className="lg:text-6xl font-extrabold pb-16 md:text-5xl sm:text-4xl">Be a Real Estate Know-It-All</div>
            <div className="text-xl">Make your best real estate decisions with the latest listings</div>
            <div className="text-xl pb-10"> property insights and the right realtor for you.</div>
            <div className=" w-[90%] rounded-md shadow-2xl overflow-hidden sm:w-[90%]">
                <div className="bg-primary flex flex-row w-full">
                    <div className={`${tab == "sell" ? "bg-white" : "bg-primary"}  w-1/3 py-5 items-center justify-center flex cursor-pointer`} onClick={() => setTab("sell")}>
                        <h1 className="text-xl font-semibold border-b-2 border-primary pb-1">SELL</h1>
                    </div>
                    <div className={`${tab == "buy" ? "bg-white" : "bg-primary"}  w-1/3 py-5 items-center justify-center flex cursor-pointer`} onClick={() => setTab("buy")}>
                        <h1 className="text-xl font-semibold border-b-2 border-primary pb-1">BUY</h1>
                    </div>
                    <div className={`${tab == "rent" ? "bg-white" : "bg-primary"}  w-1/3 py-5 items-center justify-center flex cursor-pointer`} onClick={() => setTab("rent")}>
                        <h1 className="text-xl font-semibold border-b-2 border-primary pb-1">RENT</h1>
                    </div>
                </div>
                <div className="w-full h-52">
                    {
                        tab == "sell" &&
                        <div className="flex justify-evenly items-center h-[90%] flex-col ">
                            <BsBuildingAdd className="text-2xl" />
                            <p className="text-base sm:text-sm uppercase font-bold">Do you want to sell your property?</p>
                            <button className="btn btn-primary mt-4" onClick={() => push("/register")}>LIST PROPERTY</button>
                        </div>
                    }
                    {
                        tab == "rent" && <div className="flex justify-evenly items-center h-[90%] flex-col">
                            <BsBuildings className="text-2xl" />
                            <p className="text-base sm:text-sm uppercase font-bold">Are you looking for rent a property?</p>
                            <button className="btn btn-primary mt-4" >BROWSE RENT PROPERTIES</button>
                        </div>
                    }
                    {
                        tab == "buy" && <div className="flex justify-evenly items-center h-[90%] flex-col">

                            <BsBuildings className="text-2xl" />
                            <p className="text-base sm:text-sm uppercase font-bold">Are you looking for a proptery?</p>
                            <button className="btn btn-primary mt-4" >BROWSE PROPERTIES</button>
                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default TabSection;
