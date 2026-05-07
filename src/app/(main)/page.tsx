'use client'
import React, { useState, useEffect } from 'react';
import FinancialStat from "@/components/dashboard/financial-stat";
import LoanSummary from "@/components/dashboard/loan-summary";
import QuickTransactionAdd from "@/components/dashboard/quick-transaction-add";
import TodaysTransactions from "@/components/dashboard/todays-transactions";
import UpcomingPaymentTable from "@/components/dashboard/upcoming-payment-table";
import { useAuth } from '@/contexts/auth-context';
import { 
    UserPlus, 
    HandCoins, 
    ArrowRightLeft, 
    LayoutDashboard,
    Bell,
    Settings,
    ArrowUpRight,
    Search
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const [refreshKey, setRefreshKey] = useState(0);
    const { user } = useAuth();
    const [greeting, setGreeting] = useState('Welcome back');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <main className="min-h-screen bg-slate-50/50 pb-20">
            <div className="w-full mx-auto">
                {/* Modern Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">System Operational</span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
                            {greeting}, <span className="text-indigo-600">{user?.name?.split(' ')[0] || 'User'}</span>
                        </h1>
                        <p className="text-gray-500 font-medium mt-1">Here's a snapshot of your financial ecosystem today.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm font-bold text-gray-600">
                            <LayoutDashboard size={16} className="text-indigo-600" />
                            <span>v2.0 Beta</span>
                        </div>
                        <button className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-gray-500 relative group">
                            <Bell size={20} />
                            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:animate-ping"></span>
                        </button>
                        <button className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-gray-500">
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Financial Overview - Premium Cards */}
                <FinancialStat refreshKey={refreshKey} />
                
                {/* Loan Metrics */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Loan Portfolio Performance</h2>
                        <div className="h-px flex-1 bg-gray-100 ml-4"></div>
                    </div>
                    <LoanSummary />
                </div>

                {/* Grid Layout for Detailed View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Main Content (Transactions & Payments) */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl overflow-hidden p-2">
                            <div className="p-6">
                                <TodaysTransactions refreshKey={refreshKey} />
                            </div>
                        </div>
                        
                        <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl overflow-hidden p-2">
                            <div className="p-6">
                                <UpcomingPaymentTable />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Actions & Quick Add) */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Quick Actions Container */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-indigo-50 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-700"></div>
                            
                            <h2 className="text-xl font-black text-gray-900 mb-8 relative z-10">Quick Actions</h2>
                            
                            <div className="flex flex-col gap-4 relative z-10">
                                <ActionItem 
                                    href="/contacts/new" 
                                    icon={<UserPlus size={20} />} 
                                    label="Onboard Contact" 
                                    color="indigo" 
                                />
                                <ActionItem 
                                    href="/loans/new" 
                                    icon={<HandCoins size={20} />} 
                                    label="Issue New Loan" 
                                    color="emerald" 
                                />
                                <ActionItem 
                                    href="/transactions" 
                                    icon={<ArrowRightLeft size={20} />} 
                                    label="View All Logs" 
                                    color="amber" 
                                />
                            </div>
                        </div>

                        {/* Quick Add Form Container */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden">
                            <QuickTransactionAdd onSuccess={handleRefresh} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

const ActionItem = ({ href, icon, label, color }: { href: string, icon: any, label: string, color: 'indigo' | 'emerald' | 'amber' }) => {
    const colors = {
        indigo: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 shadow-indigo-100/50",
        emerald: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 shadow-emerald-100/50",
        amber: "bg-amber-50 text-amber-700 hover:bg-amber-100 shadow-amber-100/50",
    };

    return (
        <Link href={href} className={`group w-full py-4 px-6 ${colors[color]} rounded-2xl font-bold transition-all flex items-center justify-between shadow-lg`}>
            <div className="flex items-center gap-3">
                <span className="group-hover:scale-110 transition-transform">{icon}</span>
                <span className="text-sm tracking-tight">{label}</span>
            </div>
            <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </Link>
    );
};
