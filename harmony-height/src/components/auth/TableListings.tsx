/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserListings } from "@/store/thunks/propertyListingThunk";
import { Listing } from "@/schema/types/properties/properties";
import ViewListingModal from "./ViewListingModal";
const defaultListing: Listing = {
    _id: 'default-id',
    state: 'Default State',
    bathrooms: 0,
    area: 0,
    spaces: 0,
    bedrooms: 0,
    type: 'Default Type',
    lease: false,
    parking: false,
    water: false,
    electricity: false,
    wifi: false,
    oldYear: 0,
    zipcode: '00000',
    user: {
        name: 'Default Name',
        email: 'default@example.com',
        _id: 'default-user-id',
    },
    images: [],
    createdAt: { $date: 'default-date' },
    __v: 0,
};

export const TableListings = () => {
    const [selectedList, setSelectedList] = React.useState<Listing>(defaultListing)

    const openModal = (item: Listing) => {
        setSelectedList(item);
        const modalElement = document.getElementById('my_modal_3') as HTMLDialogElement | null;
        if (modalElement) {
            modalElement.showModal();
        }

    };
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { userListings, loading } = useAppSelector(state => state.userlistings);
    React.useEffect(() => {
        dispatch(getUserListings())
    }, []);

    return <div className="mt-16">
        <div className="mb-4 flex items-center justify-between">

            <span className="uppercase font-semibold text-xl">PROPERTIES LISTING</span>
            <div className="btn btn-primary" onClick={() => push("/profile/listings/new")}>ADD NEW</div>
        </div>
        <div className="overflow-x-auto">
            <table className="table table-pin-cols table-lg">
                {/* head */}
                <thead>
                    <tr >
                        <th className="bg-primary text-accent rounded-tl">Property</th>
                        <th className="bg-primary text-accent ">Age</th>
                        <th className="bg-primary text-accent ">Spaces</th>
                        <th className="bg-primary text-accent ">Parking</th>
                        <th className="bg-primary text-accent ">Utilties</th>
                        <th className="bg-primary text-accent ">property Type</th>
                        <th className="bg-primary text-accent rounded-tr">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {

                        userListings.length > 0 && userListings.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="h-24 carousel carousel-vertical rounded-box shadow-md">
                                            {
                                                item.images.map((home, index) => (<div className="carousel-item h-full bg-primary" key={index}>
                                                    <img src={`${home}`} className="object-cover h-full w-full " />
                                                </div>))
                                            }
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.zipcode}, {item.city}</div>
                                            <div className="text-sm opacity-50">{item.state}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold italic">{item.oldYear}</div>
                                </td>
                                <td>
                                    <div className="font-semibold italic">{item.spaces}</div>
                                </td>
                                <td>
                                    <span className={`badge badge-sm p-2 uppercase font-semibold ${item.parking ? "badge-success" : "badge-error"}`}>{item.parking ? "Yes" : "No"}</span>
                                </td>
                                <td>
                                    {item.wifi && <span className="badge badge-ghost badge-sm">Wifi</span>}
                                    {item.water && <span className="badge badge-ghost badge-sm">Water</span>}
                                    {item.electricity && <span className="badge badge-ghost badge-sm">Electricity</span>}
                                    {/* {item. && <span className="badge badge-ghost badge-sm">Wifi</span>} */}
                                </td>
                                <td>
                                    <div className="uppercase">{item.type}</div>
                                </td>
                                <th>
                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={() => openModal(item)}>VIEW</button>
                                    <ViewListingModal selectedList={selectedList} />
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="w-full items-center justify-center flex mt-4">
                {loading && <span className="loading loading-dots loading-lg"></span>}
                {

                    loading == false && userListings.length == 0 && "NO RECORD FOUND"
                }
            </div>
        </div>
    </div>;
};
