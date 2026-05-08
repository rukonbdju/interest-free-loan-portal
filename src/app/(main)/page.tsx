'use client'
import React, { useState } from 'react';
import DashboardStats from "@/components/dashboard/dashboard-stats";
import QuickTransactionAdd from "@/components/dashboard/quick-transaction-add";
import TodaysTransactions from "@/components/dashboard/todays-transactions";
import UpcomingPaymentTable from "@/components/dashboard/upcoming-payment-table";
import {
    UserPlus,
    HandCoins,
    ArrowRightLeft,
    Plus,
    ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [isActionOpen, setIsActionOpen] = useState(false);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <main className="min-h-screen">
            <div className="w-full">

                
                {/* Minimal Header with Dropdown */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time Metrics</p>
                    </div>
                    
                    <div className="relative w-full sm:w-auto">
                        <button 
                            onClick={() => setIsActionOpen(!isActionOpen)}
                            onBlur={() => setTimeout(() => setIsActionOpen(false), 200)}
                            className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100/50 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center sm:justify-start gap-2 group"
                        >
                            <Plus size={18} className="stroke-[3]" />
                            <span>Quick Action</span>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${isActionOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isActionOpen && (
                            <div className="absolute right-0 mt-3 w-full sm:w-64 bg-white rounded-2xl shadow-xl border border-gray-50 py-3 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top sm:origin-top-right">
                                <ActionLink 
                                    href="/contacts/new" 
                                    icon={<UserPlus size={18} />} 
                                    label="Onboard Contact" 
                                    description="Add new borrower to system"
                                />
                                <ActionLink 
                                    href="/loans/new" 
                                    icon={<HandCoins size={18} />} 
                                    label="Issue New Loan" 
                                    description="Create new loan agreement"
                                />
                                <ActionLink 
                                    href="/transactions" 
                                    icon={<ArrowRightLeft size={18} />} 
                                    label="View All Logs" 
                                    description="History of all movements"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Dashboard Stats (Unified 8 cards) */}
                <DashboardStats refreshKey={refreshKey} />

                <div className="mt-8 sm:mt-12"></div>

                {/* Grid Layout for Detailed View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content (Transactions & Payments) */}
                    <div className="lg:col-span-8 space-y-8 sm:space-y-10">
                        <TodaysTransactions refreshKey={refreshKey} />
                        <UpcomingPaymentTable />
                    </div>

                    {/* Sidebar (Actions & Quick Add) */}
                    <div className="lg:col-span-4">
                        <QuickTransactionAdd onSuccess={handleRefresh} />
                    </div>
                </div>
            </div>
        </main>
    );
}


const ActionLink = ({ href, icon, label, description }: { href: string, icon: any, label: string, description: string }) => (

    <Link
        href={href}
        className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors group"
    >
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
            {icon}
        </div>
        <div>
            <p className="text-sm font-bold text-gray-800">{label}</p>
            <p className="text-[10px] text-gray-400 font-medium">{description}</p>
        </div>
    </Link>
);

