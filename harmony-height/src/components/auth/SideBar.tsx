"use client"
import { forwardRef } from "react";
import Link from "next/link";
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { CgListTree } from 'react-icons/cg'
import { usePathname, useRouter } from "next/navigation";
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { FiSettings } from 'react-icons/fi'
import { BiLogOutCircle } from 'react-icons/bi'
import { useAppDispatch } from "@/store/hooks";
import { MdRealEstateAgent } from "react-icons/md";
import { logout } from "@/store/reducers/userAuthSlice";
const SideBar = forwardRef((props, ref) => {
    const router = useRouter();
    const pathname = usePathname()
    const dispatch = useAppDispatch();
    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="fixed w-56 h-full bg-white shadow z-50">
            <div className="flex justify-center mt-2 mb-7">
                <Link href="/">
                    <picture>
                        <img
                            className="w-16 h-auto"
                            src="/harmonyheightLogo.png"
                            alt="company logo"
                        />
                    </picture>
                </Link>
            </div>

            <div className="flex flex-col">
                <Link href="/profile">
                    <div
                        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${pathname == "/profile"
                            ? "bg-primary text-white"
                            : "text-black hover:bg-primary hover:text-white"
                            }`}
                    >
                        <div className="mr-2">
                            <MdOutlineSpaceDashboard className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Dashboard</p>
                        </div>
                    </div>
                </Link>

                <Link href="/profile/analytics">
                    <div
                        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${pathname == "/profile/analytics"
                            ? "bg-primary text-white"
                            : "text-black hover:bg-primary hover:text-white"
                            }`}
                    >
                        <div className="mr-2">
                            <TbBrandGoogleAnalytics className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Analytics</p>
                        </div>
                    </div>
                </Link>
                <Link href="/profile/listings">
                    <div
                        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${pathname == "/profile/listings"
                            ? "bg-primary text-white"
                            : "text-black hover:bg-primary hover:text-white"
                            }`}
                    >
                        <div className="mr-2">
                            <CgListTree className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Listings</p>
                        </div>
                    </div>
                </Link>
                <Link href="/profile/orders">
                    <div
                        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${pathname == "/profile/orders"
                            ? "bg-primary text-white"
                            : "text-black hover:bg-primary hover:text-white"
                            }`}
                    >
                        <div className="mr-2">
                            <MdRealEstateAgent className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Orders</p>
                        </div>
                    </div>
                </Link>
                {/* <Link href="/profile/settings">
                    <div
                        className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${pathname == "/profile/settings"
                            ? "bg-primary text-white"
                            : "text-black hover:bg-primary hover:text-white"
                            }`}
                    >
                        <div className="mr-2">
                            <FiSettings className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Settings</p>
                        </div>
                    </div>
                </Link> */}
                <Link href="/" onClick={() => dispatch(logout())}>
                    <div
                        className="pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors 
                            text-black hover:bg-primary hover:text-white"
                    >
                        <div className="mr-2">
                            <BiLogOutCircle className="h-5 w-5" />
                        </div>
                        <div>
                            <p>Logout</p>
                        </div>
                    </div>
                </Link>

            </div>
        </div>
    );
});

SideBar.displayName = "SideBar";

export default SideBar;