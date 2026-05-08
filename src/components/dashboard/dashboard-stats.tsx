'use client'
import React from 'react';
import { useFetchData } from "@/hooks/useFetchData";
import { 
    Wallet, 
    TrendingUp, 
    TrendingDown, 
    Heart, 
    Landmark, 
    Clock, 
    TriangleAlert, 
    CircleCheck 
} from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import StatCard from "./stat-card";

interface DashboardSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    totalLent: number;
    activeLoans: number;
    overdueLoans: number;
    totalCollected: number;
    totalDonation: number;
}

const DashboardStats = ({ refreshKey = 0 }: { refreshKey?: number }) => {
    const { data, loading } = useFetchData<DashboardSummary>(`/reports/summary?refresh=${refreshKey}`);

    return (
        <div className="space-y-12">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Balance"
                    value={data ? formatCurrency(data.balance) : "$0.00"}
                    icon={<Wallet size={20} />}
                    color={data && data.balance >= 0 ? 'indigo' : 'rose'}
                    loading={loading}
                    subtitle="Current liquidity"
                />
                <StatCard
                    title="Total Income"
                    value={data ? formatCurrency(data.totalIncome) : "$0.00"}
                    icon={<TrendingUp size={20} />}
                    color="emerald"
                    loading={loading}
                    subtitle="Monthly inflow"
                />
                <StatCard
                    title="Total Expenses"
                    value={data ? formatCurrency(data.totalExpense) : "$0.00"}
                    icon={<TrendingDown size={20} />}
                    color="rose"
                    loading={loading}
                    subtitle="Monthly outflow"
                />
                <StatCard
                    title="Total Donation"
                    value={data ? formatCurrency(data.totalDonation) : "$0.00"}
                    icon={<Heart size={20} />}
                    color="amber"
                    loading={loading}
                    subtitle="Community support"
                />
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Lent" 
                    value={data ? formatCurrency(data.totalLent) : "$0.00"} 
                    icon={<Landmark size={20} />} 
                    color="indigo" 
                    loading={loading}
                    subtitle="Overall principal"
                />
                <StatCard 
                    title="Active Loans" 
                    value={data ? String(data.activeLoans) : "0"} 
                    icon={<Clock size={20} />} 
                    color="amber" 
                    loading={loading}
                    subtitle="Ongoing agreements"
                />
                <StatCard 
                    title="Overdue Loans" 
                    value={data ? String(data.overdueLoans) : "0"} 
                    icon={<TriangleAlert size={20} />} 
                    color="rose" 
                    loading={loading}
                    urgent={data ? data.overdueLoans > 0 : false}
                    subtitle="Requires attention"
                />
                <StatCard 
                    title="Total Collected" 
                    value={data ? formatCurrency(data.totalCollected) : "$0.00"} 
                    icon={<CircleCheck size={20} />} 
                    color="emerald" 
                    loading={loading}
                    subtitle="Total repayments"
                />
            </div>
        </div>
    );
}


export default DashboardStats;
