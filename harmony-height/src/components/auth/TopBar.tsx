/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Fragment } from "react";
import {
    Bars3CenterLeftIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { FiSettings } from 'react-icons/fi'
import Link from "next/link";
import { AiOutlineLogout } from 'react-icons/ai'
import { logout } from "@/store/reducers/userAuthSlice";
import { useAppDispatch } from "@/store/hooks";

export default function TopBar({ showNav, setShowNav }: { showNav: any, setShowNav: any }) {
    const dispatch = useAppDispatch()
    return (
        <div
            className={`shadow-sm fixed z-20 w-full h-16 flex justify-between items-center transition-all duration-[400ms] bg-primary ${showNav ? "pl-56" : ""
                }`}
        >
            <div className="pl-4 md:pl-16">
                <Bars3CenterLeftIcon
                    className="h-8 w-8 text-gray-700 cursor-pointer"
                    onClick={() => setShowNav(!showNav)}
                />
            </div>
            <div className="flex items-center pr-4 md:pr-16">

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center items-center">
                            <div className="w-10 rounded-full">
                                <div className="avatar placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                        <span className="text-base uppercase">A</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform scale-95"
                        enterTo="transform scale-100"
                        leave="transition ease-in duration=75"
                        leaveFrom="transform scale-100"
                        leaveTo="transform scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
                            <div className="p-1">
                                <Menu.Item>
                                    <Link
                                        href="/profile/settings"
                                        className="flex hover:bg-primary hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                                    >
                                        <FiSettings className="h-4 w-4 mr-2" />
                                        Settings
                                    </Link>
                                </Menu.Item>

                                <Menu.Item>
                                    <Link
                                        onClick={() => dispatch(logout())}
                                        href="/"
                                        className="flex hover:bg-primary hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                                    >
                                        <AiOutlineLogout className="h-4 w-4 mr-2" />
                                        Logout
                                    </Link>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}