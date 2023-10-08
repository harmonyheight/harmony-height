"use client"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/reducers/userAuthSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NavBar = ({ children }: { children: React.ReactNode }) => {
    const [activeTab, setActiveTab] = useState("Home");
    const { push } = useRouter();
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
        push("/login")
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm rounded-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className={`${activeTab == "Home" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Home")}><Link href="/">Home</Link></li>
                            <li>
                                <a>Category</a>
                                <ul className="p-2">
                                    <li className={`${activeTab == "Buy" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Buy")}><Link href="/buy">Buy</Link></li>
                                    <li className={`${activeTab == "Sell" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Sell")}><Link href="/sell">Sell</Link></li>
                                    <li className={`${activeTab == "Rent" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Rent")}><Link href="/rent">Rent</Link></li>
                                </ul>
                            </li>
                            <li className={`${activeTab == "Contact" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Contact")}><Link href="/contactus">Contact Us</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl" onClick={() => push('/')}>Harmony Height</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li className={`${activeTab == "Home" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Home")}><Link href="/">Home</Link></li>
                        <li tabIndex={0}>
                            <details>
                                {/* <summary className={`${("BuySellRent".includes(activeTab)) ? "bg-warning" : ""}`}>Category</summary> */}
                                <summary>Category</summary>
                                <ul className="p-4">
                                    <li className={`${activeTab == "Buy" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Buy")}><Link href="/buy">Buy</Link></li>
                                    <li className={`${activeTab == "Sell" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Sell")}><Link href="/sell">Sell</Link></li>
                                    <li className={`${activeTab == "Rent" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Rent")}><Link href="/rent">Rent</Link></li>
                                </ul>
                            </details>
                        </li>
                        <li className={`${activeTab == "Contact" ? "bg-primary rounded-md" : ""}`} onClick={() => setActiveTab("Contact")}><Link href="/contactus">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                            <span className="text-base uppercase">{user.name[0]}</span>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link href="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link href="/settings">Settings</Link></li>
                                <li className="pl-3 cursor-pointer" onClick={handleLogout}>Logout</li>
                            </ul>
                        </div> : <div className="text-blue-600 pr-6 cursor-pointer" onClick={() => push('/login')}>LOGIN</div>
                    }
                </div>
            </div>
            {children}
        </div>
    );
};

export default NavBar;
