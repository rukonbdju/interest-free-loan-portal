'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayout } from "@/contexts/layout-context";
import Image from "next/image";

const Sidebar = () => {
    const { isSidebarOpen } = useLayout()
    const pathname = usePathname()

    const menuItems = [
        { name: "Dashboard", href: "/", emoji: "🏠" },
        { name: "Borrowers", href: "/borrowers", emoji: "👤" },
        { name: "Loans", href: "/loans", emoji: "💸" },
        { name: "Payments", href: "/payments", emoji: "💰" },
        { name: "Agreements", href: "/agreements", emoji: "📑", },
        { name: "Reports", href: "/reports", emoji: "📊", separator: true },
        { name: "Notifications", href: "/notifications", emoji: "🔔" },
        { name: "Settings", href: "/settings", emoji: "⚙️" },
    ];
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:shadow-none md:border-r md:border-gray-200`}>
            <div className="p-3">
                <div className="flex items-center justify-center bg-teal-900 p-2 rounded-xl">
                    <Image src={'/karze-hasana.webp'} width={120} height={80} className="h-10 w-auto" alt="Karze-hasana" />
                </div>
            </div>
            <nav className="p-3">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.separator && <div className="my-4 border-t border-gray-200"></div>}
                            <Link href={item.href} className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${item.href === pathname ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <span className="mr-3">{item.emoji}</span>

                                {/* <item.icon className="w-6 h-6 mr-3" /> */}
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;