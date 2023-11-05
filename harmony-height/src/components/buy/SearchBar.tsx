"use client"
import React from "react";

const SearchBar = () => {
    const handleRangeChange = (event: { target: { value: string; }; }) => {
        const newValue = parseInt(event.target.value, 10); // Convert the value to an integer
        console.log('====================================');
        console.log(newValue);
        console.log('====================================');
    };
    return <div className="w-full px-4 py-4 bg-gray-50 flex justify-between flex-col-reverse shadow-sm">

        <div className="form-control w-full max-w-xs mt-4">
            <span className="text-xl font-semibold my-1">SEARCH FILTER</span>
            <div className="join">
                <div>
                    <div>

                        <input className="input input-bordered join-item w-[30vw]" placeholder="Search" />
                    </div>
                </div>
                <select className="select select-bordered join-item">
                    <option disabled selected>Filter</option>
                    <option>Sci-fi</option>
                    <option>Drama</option>
                    <option>Action</option>
                </select>
                <div className="indicator">
                    <button className="btn join-item">Search</button>
                </div>
            </div>
        </div>
        <div className="w-[90%] mt-3">
            <span className="text-xl font-semibold my-3">PRICE FILTER</span>
            <input type="range" min={0} max={100} className="range my-3" step={25} onChange={handleRangeChange} />
            <div className="w-full flex justify-between text-xs px-2">
                <span onClick={() => alert("Less than")}>| $0 &le; $100k</span>
                <span>|$100k &le; $200k</span>
                <span>|$200k &le; $300k</span>
                <span>|$300k &le; $400k</span>
                <span>|$400k &ge;</span>
            </div>
        </div>
    </div>;
};

export default SearchBar;
