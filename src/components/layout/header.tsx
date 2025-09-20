'use client'
import React from "react";
import { useLayout } from "@/contexts/layout-context";
import { BellIcon, MenuIcon } from "../icons"
import { useAuth } from "@/contexts/auth-context";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
const Header = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useLayout()
    const { user, logout } = useAuth()

    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-30 border-b border-gray-200">
            <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                <button className="md:hidden text-gray-600" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon className="w-6 h-6" />
                </button>

                <div className="flex justify-end w-full">
                    <div className="flex items-center justify-end space-x-4">
                        <button className="relative text-gray-500 hover:text-gray-800">
                            <BellIcon className="w-6 h-6" />
                            <span className="absolute top-0 right-0 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </button>
                        <div className="relative group inline-block">
                            {/* Trigger */}
                            <div className="flex items-center space-x-2 p-1 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
                                <span className="w-10 h-10 text-xl text-white font-semibold rounded-full flex items-center justify-center bg-green-600 border-2 border-teal-100">
                                    {user?.name?.charAt(0)}
                                </span>
                                <div className="hidden lg:block">
                                    <p className="font-semibold text-sm text-gray-800">{user?.name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                </div>
                            </div>

                            {/* Dropdown */}
                            <div
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white p-1.5 shadow-xl ring-1 ring-black/5 
               opacity-0 scale-95 invisible 
               group-hover:opacity-100 group-hover:scale-100 group-hover:visible 
               transition-all duration-200 ease-out"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                            >
                                <div className="py-1" role="none">
                                    {/* Menu item with an icon */}
                                    <Link
                                        href="/profile"
                                        className="text-gray-700 font-medium rounded-lg flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-gray-100"
                                        role="menuitem"
                                        id="menu-item-0"
                                    >
                                        <User className="h-5 w-5 text-gray-500" />
                                        View Profile
                                    </Link>
                                </div>

                                {/* Separator */}
                                <div className="h-px my-1 bg-gray-200"></div>

                                <div className="py-1">
                                    <button
                                        onClick={() => logout()}
                                        className="cursor-pointer text-red-600 w-full font-medium rounded-lg flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-red-50 hover:text-red-700"
                                        role="menuitem"
                                        id="menu-item-1"
                                    >
                                        <LogOut className="h-5 w-5 text-red-500" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;


