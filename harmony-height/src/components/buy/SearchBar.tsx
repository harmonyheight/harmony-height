import React from "react";

const SearchBar = () => {
    return <div className="w-full px-4 py-4 bg-gray-50 flex flex-col justify-between lg:flex-row">
        <div className="form-control w-[30%] max-w-xs">
            <label className="label">
                <span className="label-text text-xl font-semibold">Search property here.?</span>
            </label>
            <input type="text" placeholder="Search property.." className="input input-bordered w-full max-w-xs" />
        </div>
        <div className="w-[65%] lg:mt-4">
            <span className="text-xl font-semibold my-3">PRICE FILTER</span>
            <input type="range" min={0} max="100" value="25" className="range my-3" step="25" />
            <div className="w-full flex justify-between text-xs px-2">
                <span>| $0 &le; $100k</span>
                <span>|$100k &le; $200k</span>
                <span>|$200k &le; $300k</span>
                <span>|$300k &le; $400k</span>
                <span>|$400k &ge;</span>
            </div>
        </div>
    </div>;
};

export default SearchBar;
