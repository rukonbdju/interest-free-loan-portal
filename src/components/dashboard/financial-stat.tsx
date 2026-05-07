'use client'
import React, { useState, useEffect, useCallback } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowDown, ArrowUp, Wallet, Landmark, TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { baseUrl } from "@/utils/api-url";

export interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    color: 'indigo' | 'emerald' | 'rose' | 'amber';
    loading?: boolean;
    trend?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, color, loading, trend }) => {
    const colorMap = {
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-100/50",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/50",
        rose: "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100/50",
        amber: "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100/50",
    };

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full opacity-10 transition-transform group-hover:scale-150 duration-700 ${colorMap[color].split(' ')[0]}`}></div>
            
            <div className="flex items-center justify-between relative z-10 mb-6">
                <div className={`p-4 rounded-2xl ${colorMap[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end">
                   <ArrowUpRight className="text-gray-300 group-hover:text-indigo-400 transition-colors" size={20} />
                   {trend && <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{trend}</span>}
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{title}</p>
                {loading ? (
                    <div className="h-10 w-32 bg-gray-50 animate-pulse rounded-xl" />
                ) : (
                    <p className="text-4xl font-black text-gray-900 tracking-tighter">
                        {formatCurrency(value)}
                    </p>
                )}
            </div>
        </div>
    );
};

const FinancialStat = ({ refreshKey = 0 }: { refreshKey?: number }) => {
    const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
    const [loading, setLoading] = useState(true);

    const fetchSummary = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${baseUrl}/transactions/summary`, {
                credentials: 'include'
            });
            const result = await res.json();
            if (result.success) {
                setSummary(result.data);
            }
        } catch (err) {
            console.error("Failed to fetch summary:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary, refreshKey]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <SummaryCard
                title="Available Liquidity"
                value={summary.balance}
                icon={Wallet}
                color={summary.balance >= 0 ? 'indigo' : 'rose'}
                loading={loading}
                trend="Current Net"
            />
            <SummaryCard
                title="Monthly Inflow"
                value={summary.totalIncome}
                icon={TrendingUp}
                color="emerald"
                loading={loading}
                trend="Total Income"
            />
            <SummaryCard
                title="Monthly Outflow"
                value={summary.totalExpense}
                icon={TrendingDown}
                color="rose"
                loading={loading}
                trend="Total Expenses"
            />
        </div>
    );
}

export default FinancialStat;