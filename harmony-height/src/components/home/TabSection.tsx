/* eslint-disable @next/next/no-img-element */
"use client"
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsBuildings, BsBuildingAdd } from 'react-icons/bs'
const TabSection = () => {
    const [tab, setTab] = useState("sell");
    const { push } = useRouter();
    const { user } = useAppSelector(state => state.auth);
    const handleListNavigate = () => {
        user ? push('/profile') : push('/login')
    }
    return (
        <div className="flex justify-evenly items-center bg-lime-50 flex-col rounded-md py-20 h-screen">
            <div className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold pb-16">
                Be a Real Estate Know It All
            </div>

            <div className="text-xl w-full sm:w-4/5 md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 mx-auto my-4">
                <div className="text-xl">
                    <center>
                        Make your best real estate decisions with the latest listings property insights and the right realtor for you.
                    </center>
                </div>
            </div>
            <div className=" w-[90%] rounded-md shadow-2xl overflow-hidden sm:w-[90%]">
                <div className="bg-primary flex flex-row w-full">
                    <div className={`${tab == "sell" ? "bg-white" : "bg-primary text-white"}  w-1/3 py-5 items-center justify-center flex cursor-pointer`} onClick={() => setTab("sell")}>
                        <h1 className="text-xl font-semibold border-b-2 border-primary pb-1">SELL</h1>
                    </div>
                    <div className={`${tab == "buy" ? "bg-white" : "bg-primary text-white"}  w-1/3 py-5 items-center justify-center flex cursor-pointer`} onClick={() => setTab("buy")}>
                        <h1 className="text-xl font-semibold border-b-2 border-primary pb-1">BUY</h1>
                    </div>
                    <div className={`${tab == "rent" ? "bg-white" : "bg-primary text-white"}  w-1/3 py-5 items-center justify-center flex cursor-pointer`} onClick={() => setTab("rent")}>
                        <h1 className="text-xl font-semibold border-b-2 border-primary pb-1">RENT</h1>
                    </div>
                </div>
                <div className="w-full h-52">
                    {
                        tab == "sell" &&
                        <div className="flex justify-evenly items-center h-[90%] flex-col ">
                            <BsBuildingAdd className="text-2xl" />
                            <p className="text-base sm:text-sm uppercase font-bold">Do you want to sell your property?</p>
                            <button className="btn btn-primary mt-4" onClick={handleListNavigate}>LIST PROPERTY</button>
                        </div>
                    }
                    {
                        tab == "rent" && <div className="flex justify-evenly items-center h-[90%] flex-col">
                            <BsBuildings className="text-2xl" />
                            <p className="text-base sm:text-sm uppercase font-bold">Are you looking for rent a property?</p>
                            <div className="btn btn-primary mt-4" onClick={() => push("/rent")}>BROWSE RENT PROPERTIES</div>
                        </div>
                    }
                    {
                        tab == "buy" && <div className="flex justify-evenly items-center h-[90%] flex-col">

                            <BsBuildings className="text-2xl" />
                            <p className="text-base sm:text-sm uppercase font-bold">Are you looking for a proptery?</p>
                            <button className="btn btn-primary mt-4" onClick={() => push("/buy")}>BROWSE PROPERTIES</button>
                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default TabSection;
