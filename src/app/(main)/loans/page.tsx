'use client';

import React, { useMemo } from 'react';
import LoansTable from '@/components/loans/loans-table';
import { Button } from '@/components/shared/button';
import { LoanProvider, useLoans } from '@/contexts/loan-context';
import {
    Plus,
    Search,
    TrendingUp,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

const LoansPageContent = () => {
    const { loans } = useLoans();

    // Calculate Summary Stats
    const stats = useMemo(() => {
        const total = loans.length;
        const active = loans.filter(l => {
            const totalPaid = l.payments?.reduce((sum, p) => sum + p.paymentAmount, 0) || 0;
            const remaining = l.amount - totalPaid;
            const isOverdue = new Date(l.dueDate) < new Date();
            return remaining > 0 && !isOverdue;
        }).length;
        
        const overdue = loans.filter(l => {
            const totalPaid = l.payments?.reduce((sum, p) => sum + p.paymentAmount, 0) || 0;
            const remaining = l.amount - totalPaid;
            const isOverdue = new Date(l.dueDate) < new Date();
            return remaining > 0 && isOverdue;
        }).length;

        const paid = loans.filter(l => {
            const totalPaid = l.payments?.reduce((sum, p) => sum + p.paymentAmount, 0) || 0;
            return totalPaid >= l.amount;
        }).length;

        return { total, active, overdue, paid };
    }, [loans]);

    return (
        <div className="min-h-screen pb-20">
            <div className="w-full mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Loan Portfolio</h1>
                        <p className="text-gray-500 font-medium">Manage and track your sudtree-free financial assistance.</p>
                    </div>
                    <Link href={'/loans/new'}>
                        <Button 
                            className="bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-xl py-4 px-8 rounded-2xl" 
                            icon={<Plus size={20} className="stroke-[3]" />}
                        >
                            Issue New Loan
                        </Button>
                    </Link>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard 
                        label="Active Loans" 
                        value={stats.active} 
                        icon={<TrendingUp className="text-blue-600" />} 
                        color="blue"
                        trend={`${stats.total > 0 ? Math.round((stats.active/stats.total)*100) : 0}% of total`}
                    />
                    <StatCard 
                        label="Overdue" 
                        value={stats.overdue} 
                        icon={<AlertCircle className="text-rose-600" />} 
                        color="rose"
                        trend="Action required"
                        urgent={stats.overdue > 0}
                    />
                    <StatCard 
                        label="Fully Paid" 
                        value={stats.paid} 
                        icon={<CheckCircle2 className="text-emerald-600" />} 
                        color="emerald"
                        trend="Success rate"
                    />
                    <StatCard 
                        label="Total Issued" 
                        value={stats.total} 
                        icon={<Clock className="text-amber-600" />} 
                        color="amber"
                        trend="All time records"
                    />
                </div>

                {/* Main Content Area */}
                <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-2xl">
                    <LoansTable />
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon, color, trend, urgent = false }: any) => {
    const colors: any = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        rose: "bg-rose-50 text-rose-600 border-rose-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
    };

    return (
        <div className={`p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden ${urgent ? 'ring-2 ring-rose-500 ring-offset-2' : ''}`}>
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-700 ${colors[color].split(' ')[0]}`}></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
                    {icon}
                </div>
                <ArrowUpRight className="text-gray-300 group-hover:text-gray-400 transition-colors" size={20} />
            </div>
            
            <div className="relative z-10">
                <h3 className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">{label}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">{value}</span>
                    <span className="text-xs font-bold text-gray-400">{trend}</span>
                </div>
            </div>
        </div>
    );
};

const LoansPage = () => (
    <LoanProvider>
        <LoansPageContent />
    </LoanProvider>
);

export default LoansPage;
