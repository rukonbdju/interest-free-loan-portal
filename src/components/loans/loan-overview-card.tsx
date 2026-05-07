'use client'
import { useLoanPayment } from "@/contexts/loan-payment-context";
import { formatDate } from "@/utils/date-format";
import { Calendar, Clock, Wallet, TrendingUp, DollarSign } from "lucide-react";
import { useMemo } from "react";
import LoanStatus, { getDaysRemaining } from "../shared/loan-status-calculation";

const LoanOverviewCard = () => {
    const { loan } = useLoanPayment()
    
    const balance = useMemo(() => {
        const totalPaid = loan?.payments.reduce((total, payment) => total + payment.paymentAmount, 0) || 0
        const remainingBalance = loan?.amount ? loan.amount - totalPaid : 0;
        const progressPercentage = loan?.amount ? (totalPaid / loan.amount) * 100 : 0;
        const remainingDays = getDaysRemaining(loan?.dueDate || '');
        return { totalPaid, remainingBalance, progressPercentage, remainingDays }
    }, [loan])

    if (!loan) return (
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-white animate-pulse">
            <div className="h-8 bg-gray-100 rounded-full w-1/3 mb-6"></div>
            <div className="h-24 bg-gray-50 rounded-3xl mb-6"></div>
            <div className="grid grid-cols-3 gap-4">
                <div className="h-16 bg-gray-50 rounded-2xl"></div>
                <div className="h-16 bg-gray-50 rounded-2xl"></div>
                <div className="h-16 bg-gray-50 rounded-2xl"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl p-8 border border-white/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-50 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Repayment Status</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm font-black text-indigo-600">{loan.currency}</span>
                            <span className="text-5xl font-black text-gray-900 tracking-tighter">
                                {balance.remainingBalance.toLocaleString()}
                            </span>
                            <span className="text-sm font-bold text-gray-400">Remaining</span>
                        </div>
                    </div>
                    <LoanStatus loan={loan} />
                </div>

                {/* Modern Progress Section */}
                <div className="mb-10">
                    <div className="flex justify-between items-end mb-3 px-1">
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                            <TrendingUp size={14} /> {Math.round(balance.progressPercentage)}% Recovered
                        </span>
                        <span className="text-xs font-bold text-gray-400">
                            Goal: {loan.amount.toLocaleString()} {loan.currency}
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 p-1">
                        <div
                            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-indigo-200"
                            style={{ width: `${balance.progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <OverviewStat 
                        icon={<Wallet size={20} className="text-emerald-600" />} 
                        label="Total Paid" 
                        value={`${balance.totalPaid.toLocaleString()} ${loan.currency}`}
                        bgColor="bg-emerald-50"
                    />
                    <OverviewStat 
                        icon={<Calendar size={20} className="text-rose-600" />} 
                        label="Due Date" 
                        value={formatDate(loan.dueDate)}
                        bgColor="bg-rose-50"
                    />
                    <OverviewStat 
                        icon={<Clock size={20} className="text-amber-600" />} 
                        label="Days Left" 
                        value={`${balance.remainingDays < 0 ? 0 : balance.remainingDays} Days`}
                        bgColor="bg-amber-50"
                    />
                </div>
            </div>
        </div>
    )
}

const OverviewStat = ({ icon, label, value, bgColor }: any) => (
    <div className="flex flex-col gap-3 p-5 rounded-3xl bg-white border border-gray-50 shadow-sm hover:shadow-md transition-all duration-300">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${bgColor}`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-black text-gray-900">{value}</p>
        </div>
    </div>
);

export default LoanOverviewCard;