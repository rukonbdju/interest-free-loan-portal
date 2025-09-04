import { BellIcon, MenuIcon } from "../icons"
import React from "react";
type Props = {
    isSidebarOpen: boolean,
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Header = ({ isSidebarOpen, setSidebarOpen }: Props) => {

    const mockUser = {
        name: 'Abdullah Ahmed',
        avatarUrl: `https://placehold.co/100x100/28a745/FFFFFF?text=A`,
    };
    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-30 border-b border-gray-200">
            <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon className="w-6 h-6" />
                </button>

                {/* Right side icons & profile */}
                <div className="flex justify-end w-full">
                    <div className="flex items-center justify-end space-x-4">
                        <button className="relative text-gray-500 hover:text-gray-800">
                            <BellIcon className="w-6 h-6" />
                            <span className="absolute top-0 right-0 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </button>
                        <div className="flex items-center space-x-2">
                            <img src={mockUser.avatarUrl} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-teal-100" />
                            <div className="hidden lg:block">
                                <p className="font-semibold text-sm text-gray-800">{mockUser.name}</p>
                                <p className="text-xs text-gray-500">View Profile</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;


