import Link from "next/link";
import React from "react";

const NavBar = () => {
    return (<div className="navbar bg-base-100 shadow-sm rounded-sm fixed">
        <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link href="/">Home</Link></li>
                    <li>
                        <a>Category</a>
                        <ul className="p-2">
                            <li><Link href="/login">Buy</Link></li>
                            <li><Link href="/login">Sell</Link></li>
                            <li><Link href="/login">Rent</Link></li>
                        </ul>
                    </li>
                    <li><Link href="/login">Contact Us</Link></li>
                </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl">Harmony Height</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li><Link href="/">Home</Link></li>
                <li tabIndex={0}>
                    <details>
                        <summary>Category</summary>
                        <ul className="p-4">
                            <li><Link href="/login">Buy</Link></li>
                            <li><Link href="/login">Sell</Link></li>
                            <li><Link href="/login">Rent</Link></li>
                        </ul>
                    </details>
                </li>
                <li><a>Contact Us</a></li>
            </ul>
        </div>
        <div className="navbar-end">
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" />
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
                    <li><Link href="/login">Logout</Link></li>
                </ul>
            </div>
        </div>
    </div>
    );
};

export default NavBar;
