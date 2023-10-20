"use client"
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from 'recharts';
const data = [
    { month: 'January', forSale: 10, forRent: 5 },
    { month: 'February', forSale: 8, forRent: 7 },
    { month: 'March', forSale: 12, forRent: 8 },
    { month: 'April', forSale: 15, forRent: 6 },
    { month: 'May', forSale: 14, forRent: 10 },
    { month: 'June', forSale: 20, forRent: 9 },
    { month: 'July', forSale: 18, forRent: 11 },
    { month: 'August', forSale: 19, forRent: 15 },
    { month: 'September', forSale: 25, forRent: 14 },
    { month: 'October', forSale: 22, forRent: 12 },
    { month: 'November', forSale: 10, forRent: 9 },
    { month: 'December', forSale: 11, forRent: 8 },
];
console.log('====================================');
console.log(data.reduce((accumaltor, x) => { return accumaltor + x.forRent }, 0));
console.log('====================================');

const Statistics = () => {
    return <div className="mt-4">
        <p className="font-bold text-2xl pb-2 ">LISTINGS STATISTICS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
            <div className="stats shadow bg-orange-300">
                <div className="stat">
                    <div className="stat-title">Total Listings</div>
                    <div className="stat-value">{data.reduce((accumaltor, x) => { return accumaltor + x.forRent }, 0) + data.reduce((accumaltor, x) => { return accumaltor + x.forSale }, 0)}</div>
                    <div className="stat-desc">Jan 1st - Dec 31st</div>
                </div>
            </div>
            <div className="stats shadow bg-green-200 text-neutral">
                <div className="stat text-accent">
                    <div className="stat-title text-accent">Sale Properties</div>
                    <div className="stat-value text-accent">{data.reduce((accumaltor, x) => { return accumaltor + x.forSale }, 0)}</div>
                    <div className="stat-desc text-accent">Sale properties listings(60%)</div>
                </div>
            </div>
            <div className="stats shadow">


                <div className="stat bg-red-200">
                    <div className="stat-title text-accent">For Rent Properties</div>
                    <div className="stat-value text-accent-focus">{data.reduce((accumaltor, x) => { return accumaltor + x.forRent }, 0)}</div>
                    <div className="stat-desc text-accent">Rented properties listings(40%)</div>
                </div>
            </div>
        </div>
        <div className="h-[50vh] w-full justify-center my-5">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={800}
                    height={400}
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="forSale" fill="#82ca9d" name="For Sale" />
                    <Bar dataKey="forRent" fill="#8884d8" name="For Rent" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>;
};

export default Statistics;
