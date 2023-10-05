"use client"
import React, { useState } from "react";

const TabSection = () => {
    const [tab, setTab] = useState("sell");

    return (
        <div className="flex justify-start items-center bg-lime-50 flex-col rounded-md py-10 h-screen">
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
                <div className="w-full h-40">
                    {
                        tab == "sell" && <div>SELL DIV</div>
                    }
                    {
                        tab == "buy" && <div>buy DIV</div>
                    }
                    {
                        tab == "rent" && <div>rent DIV</div>
                    }
                </div>
            </div>

        </div>
    );
};

export default TabSection;
