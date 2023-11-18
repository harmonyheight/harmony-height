"use client"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getPaginationBuyFilterListings } from "@/store/thunks/buyFilterListingThunk";
import { getPaginationRentFilterListings } from "@/store/thunks/rentFilterListingThunk";
import React from "react";

const SearchBar = ({ type }: { type: string }) => {
    const dispatch = useAppDispatch();
    const { listings, loading } = useAppSelector((state) => state.buyfilterlisting);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(3); // Number of items per page
    const [rangeValue, setChangeRangeValue] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('');

    const [price, setPrice] = React.useState({
        minPrice: 0,
        maxPrice: 100000000
    });
    const handleSelectChange = (e: any) => {
        // Update the selectedValue state with the new value
        setItemsPerPage(e.target.value);

    };
    const handleRangeChange = (event: any) => {
        const newValue = parseInt(event.target.value, 10); // Convert the value to an integer
        setChangeRangeValue(newValue)
        switch (newValue) {
            case 0:
                setPrice({
                    minPrice: 0,
                    maxPrice: 100000000
                })
                break;
            case 25:
                setPrice({
                    minPrice: 100001,
                    maxPrice: 200000
                })
                break;
            case 50:
                setPrice({
                    minPrice: 200001,
                    maxPrice: 300000
                })
                break;
            case 75:
                setPrice({
                    minPrice: 300001,
                    maxPrice: 400000
                })
                break;
            case 100:
                setPrice({
                    minPrice: 400001,
                    maxPrice: 100000000
                })
                break;
            default:
                setPrice({
                    minPrice: 0,
                    maxPrice: 100000000
                }) // Adjust the maximum price as needed
        }

        setCurrentPage(1)
    };
    const handleReset = () => {
        setCurrentPage(1);
        setItemsPerPage(3);
        setPrice({
            minPrice: 0,
            maxPrice: 100000000
        })
        setChangeRangeValue(0)
        setSearchValue('')
    }
    React.useEffect(() => {
        if (type == "rent") {
            dispatch(getPaginationRentFilterListings({
                page: currentPage,
                limit: itemsPerPage,
                maxPrice: price.maxPrice,
                minPrice: price.minPrice,
                search: searchValue
            }))
        } else {
            dispatch(getPaginationBuyFilterListings({
                page: currentPage,
                limit: itemsPerPage,
                maxPrice: price.maxPrice,
                minPrice: price.minPrice,
                search: searchValue
            }))
        }
    }, [currentPage, dispatch, itemsPerPage, price.maxPrice, price.minPrice, searchValue, type])

    return (
        <div>

            <div className="w-full px-4 py-4 bg-gray-50 flex justify-between flex-col-reverse shadow-sm">

                <div className="form-control w-full mt-4 flex flex-row items-center justify-between">
                    <div>
                        <div className="join">
                            <div>
                                <div>
                                    <input className="input input-bordered join-item w-[30vw]" placeholder="Search by state or city" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-secondary" onClick={handleReset}>RESET FILTER</button>
                </div>
                <div className="w-[90%] mt-3">
                    <span className="text-xl font-semibold my-3">PRICE FILTER</span>
                    <input
                        type="range"
                        min={0}
                        max={100}
                        className="range my-3"
                        step={25}
                        value={rangeValue}
                        onChange={handleRangeChange}
                    />
                    <div className="w-full flex justify-between text-xs px-2">
                        <span>|  &ge; $0</span>
                        <span>|$100k &le; $200k</span>
                        <span>|$200k &le; $300k</span>
                        <span>|$300k &le; $400k</span>
                        <span>|$400k &ge;</span>
                    </div>
                </div>
            </div>
            <div className="stats items-center w-full my-3">
                <div className="stat">
                    <div className="stat-price">Total listing found: {listings.totalListings}</div>

                </div>
                <div className="join">
                    <button className="join-item  btn" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1 || loading}>«</button>
                    <button className="join-item px-2">Page {currentPage}</button>
                    <button className="join-item btn btn-primary" onClick={() => setCurrentPage(currentPage + 1)} disabled={listings.listings.length < itemsPerPage || listings.totalPages == currentPage || loading}>»</button>
                </div>
                <select className="select select-bordered select-sm w-full max-w-xs" onChange={handleSelectChange} defaultValue={itemsPerPage}>
                    <option disabled>Listings per page</option>
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={9}>9</option>
                    <option value={12}>12</option>
                </select>
            </div>
        </div>
    );
};

export default SearchBar;
