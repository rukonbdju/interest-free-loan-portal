import Link from "next/link";
import { DashboardIcon, LoanRequestIcon, MyLoansIcon, PledgeIcon, ProfileIcon, RepaymentIcon, SettingsIcon } from "../icons";

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
    const navItems = [
        { href: '/', name: 'Dashboard', icon: DashboardIcon },
        { href: '/requests', name: 'Loan Requests', icon: LoanRequestIcon },
        { href: '/loans', name: 'My Loans', icon: MyLoansIcon },
        { href: '/pledges', name: 'My Pledges', icon: PledgeIcon },
        { href: '/repayments', name: 'Repayments', icon: RepaymentIcon },
        { href: '/loans/request', name: 'Request Loan', icon: RepaymentIcon },
        { href: '/profile', name: 'Profile', icon: ProfileIcon, separator: true },
        { href: '/settings', name: 'Settings', icon: SettingsIcon },
    ];
    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:shadow-none md:border-r md:border-gray-200`}>
            <div className="flex items-center justify-center h-20 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-teal-700">Amanah</h1>
            </div>
            <nav className="p-4">
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            {item.separator && <div className="my-4 border-t border-gray-200"></div>}
                            <Link href={item.href} className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${item.name === 'Dashboard' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <item.icon className="w-6 h-6 mr-3" />
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