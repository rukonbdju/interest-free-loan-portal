'use client'
import { useFetchData } from "@/hooks/useFetchData";
import { Loan } from "@/types";
import { formatDate } from "@/utils/date-format";
import Link from "next/link";
import LoanStatus from "../shared/loan-status-calculation";
import { Eye, HandCoins, Calendar, Wallet } from "lucide-react";

const LoanHistory = ({ id }: { id: string }) => {
    const { data: loanHistory, loading } = useFetchData<Loan[]>(`/loans/contact/${id}`)

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <HandCoins size={20} />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Loan History</h2>
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-full">
                    {loanHistory?.length || 0} Records
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
                            <th className="px-6 py-2 text-left">Loan ID</th>
                            <th className="px-6 py-2 text-left">Principal Amount</th>
                            <th className="px-6 py-2 text-left">Disbursement</th>
                            <th className="px-6 py-2 text-left">Status</th>
                            <th className="px-6 py-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                             <tr>
                                <td colSpan={5} className="py-20 text-center">
                                    <div className="w-10 h-10 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                                </td>
                            </tr>
                        ) : loanHistory && loanHistory.length > 0 ? (
                            loanHistory.map((loan, index) => (
                                <tr key={index} className="group bg-white hover:bg-indigo-50/50 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md">
                                    <td className="px-6 py-5 first:rounded-l-2xl">
                                        <p className="text-sm font-black text-indigo-600 tracking-tight">{loan.loanId}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                                                <Wallet size={14} />
                                            </div>
                                            <span className="text-sm font-black text-gray-800">{loan.amount.toLocaleString()} <span className="text-[10px] text-gray-400">{loan.currency}</span></span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Calendar size={14} className="text-gray-300" />
                                            <span className="text-xs font-bold">{formatDate(loan.disbursementDate)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <LoanStatus loan={loan} />
                                    </td>
                                    <td className="px-6 py-5 last:rounded-r-2xl text-right">
                                        <Link 
                                            href={`/loans/${loan._id}`} 
                                            className="inline-flex items-center justify-center w-10 h-10 bg-gray-50 text-gray-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-20 text-center text-gray-400 font-bold italic">
                                    No loan history found for this contact.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoanHistory;