"use client"
import { dummyData, homeImages } from "@/utils/utils";
import React from "react";
let test = false;
import { Listbox } from '@headlessui/react'

const departments = [
    { id: 1, name: 'Marketing', contact: 'Durward Reynolds' },
    { id: 2, name: 'HR', contact: 'Kenton Towne' },
    { id: 3, name: 'Sales', contact: 'Therese Wunsch' },
    { id: 4, name: 'Finance', contact: 'Benedict Kessler' },
    { id: 5, name: 'Customer service', contact: 'Katelyn Rohan' },
]
function compareDepartments({ a, b }: {
    a: {
        name: string
    }, b: {
        name: string
    }
}) {
    return a.name.toLowerCase() === b.name.toLowerCase()
}
const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]
export const TableListings = () => {
    const [selectedPeople, setSelectedPeople] = React.useState([people[0], people[1]])
    return <div className="mt-16">
        <div className="mb-4 flex items-center justify-between">

            <span className="uppercase font-semibold text-xl">PROPERTIES LISTING</span>
            <div className="btn btn-primary">ADD NEW</div>
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
                        dummyData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="h-24 carousel carousel-vertical rounded-box shadow-md">
                                            {
                                                item.photos.map((home, index) => (<div className="carousel-item h-full bg-primary" key={index}>
                                                    <img src={home} className="object-cover h-full w-full " />
                                                </div>))
                                            }
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.zipCode}, {item.city}</div>
                                            <div className="text-sm opacity-50">{item.state}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-semibold italic">{item.age}</div>
                                </td>
                                <td>
                                    <div className="font-semibold italic">{item.space}</div>
                                </td>
                                <td>
                                    <span className={`badge badge-sm p-2 uppercase font-semibold ${item.parkingAvailability.toLowerCase() == "yes" ? "badge-success" : "badge-error"}`}>{item.parkingAvailability}</span>
                                </td>
                                <td>
                                    {item.utilities.map((item, index) => (<span className="badge badge-ghost badge-sm" key={index}>{item}</span>))}
                                </td>
                                <td>
                                    <div className="uppercase">{item.propertyType}</div>
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-sm">VIEW</button>
                                </th>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>;
};
