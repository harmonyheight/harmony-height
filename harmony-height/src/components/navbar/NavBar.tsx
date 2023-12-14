"use client"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/reducers/userAuthSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const NavBar = () => {
    const { push } = useRouter();
    const pathname = usePathname();
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
        push("/login")
    }
    return (

        <div className="navbar bg-base-100 shadow-sm rounded-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li className={`${pathname == "/" ? "bg-primary rounded-md  text-white" : ""}`}><Link href="/">Home</Link></li>
                        <li>
                            <a>Category</a>
                            <ul className="p-2">
                                <li className={`${pathname == "/buy" ? "bg-primary rounded-md  text-white" : ""}`}><Link href="/buy">Buy</Link></li>
                                <li className={`${pathname == "/rent" ? "bg-primary rounded-md  text-white" : ""}`} ><Link href="/rent">Rent</Link></li>
                            </ul>
                        </li>
                        {/* mortgage */}
                        <li className={`${pathname == "/mortgage" ? "bg-primary rounded-md  text-white" : ""}`} ><Link href="/mortgage">Mortgage</Link></li>
                        <li className={`${pathname == "/aboutus" ? "bg-primary rounded-md  text-white" : ""}`} ><Link href="/aboutus">About Us</Link></li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl" onClick={() => push('/')}>Harmony Height</a>
            </div>
            <div className="navbar-center hidden lg:flex  z-[100000]">
                <ul className="menu menu-horizontal px-1">
                    <li className={`${pathname == "/" ? "bg-primary rounded-md text-white" : ""}`}><Link href="/">Home</Link></li>
                    <li tabIndex={0}>
                        <details>
                            {/* <summary className={`${("BuySellRent".includes(pathname)) ? "bg-warning" : ""}`}>Category</summary> */}
                            <summary>Category</summary>
                            <ul className="p-4">
                                <li className={`${pathname == "/buy" ? "bg-primary rounded-md  text-white" : ""}`} ><Link href="/buy">Buy</Link></li>
                                <li className={`${pathname == "/rent" ? "bg-primary rounded-md  text-white" : ""}`} ><Link href="/rent">Rent</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li className={`${pathname == "/mortgage" ? "bg-primary rounded-md  text-white" : ""}`} ><Link href="/mortgage">Mortgage</Link></li>
                    <li className={`${pathname == "/aboutus" ? "bg-primary rounded-md  text-white" : ""}`} ><Link href="/aboutus">About Us</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="dropdown dropdown-end z-[100000]">
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
    );
};

export default NavBar;
