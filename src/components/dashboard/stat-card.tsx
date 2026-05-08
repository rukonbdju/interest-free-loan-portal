'use client'
import React from 'react';
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'indigo' | 'rose' | 'emerald' | 'amber';
    loading?: boolean;
    subtitle?: string;
    urgent?: boolean;
}

const StatCard = ({ title, value, icon, color, loading, subtitle, urgent = false }: StatCardProps) => {
    const colors = {
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        rose: "bg-rose-50 text-rose-600 border-rose-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
    };

    return (
        <div className={`p-6 bg-white rounded-2xl border border-gray-50 shadow-sm hover:shadow-lg transition-all duration-500 group relative overflow-hidden ${urgent ? 'ring-2 ring-rose-500 ring-offset-2 animate-pulse' : ''}`}>
            <div className={`absolute top-0 right-0 w-20 h-20 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-150 duration-700 ${colors[color].split(' ')[0]}`}></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
                    {icon}
                </div>
                <ArrowUpRight className="text-gray-200 group-hover:text-gray-400 transition-colors" size={16} />
            </div>
            
            <div className="relative z-10">
                <h3 className="text-gray-400 font-black text-[10px] mb-1 uppercase tracking-widest">{title}</h3>
                {loading ? (
                    <div className="h-8 w-20 bg-gray-50 animate-pulse rounded-lg" />
                ) : (
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-gray-900 tracking-tighter">{value}</span>
                        {subtitle && <span className="text-[10px] font-bold text-gray-400 mt-1">{subtitle}</span>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
