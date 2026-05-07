'use client'
import { useLoans } from "@/contexts/loan-context";
import { formatDate } from "@/utils/date-format";
import { Eye, Trash2, Wallet, Calendar, User, ArrowRight, BadgeCheck, AlertCircle, Clock, Search } from "lucide-react";
import Link from "next/link";
import DeleteLoan from "./delete-loan";
import LoanStatus from "../shared/loan-status-calculation";
import Pagination from "../shared/pagination";

const LoansTable = () => {
    const { loans, loading, search, setSearch, status, setStatus } = useLoans();

    return (
        <div className="w-full">
            {/* Search & Filter Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
                <div className="relative w-full lg:max-w-md group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by Borrower, ID or Contact ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all shadow-sm"
                    />
                </div>

                <div className="flex items-center p-1.5 bg-gray-100 rounded-2xl w-full lg:w-auto">
                    {['All', 'Active', 'Overdue', 'Paid'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setStatus(filter)}
                            className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${status === filter
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-widest font-bold">
                            <th className="px-6 py-2 text-left">Loan Details</th>
                            <th className="px-6 py-2 text-left">Borrower</th>
                            <th className="px-6 py-2 text-left">Schedule</th>
                            <th className="px-6 py-2 text-left">Due Date</th>
                            <th className="px-6 py-2 text-left">Status</th>
                            <th className="px-6 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                        <p className="text-gray-400 font-medium italic text-sm">Searching records...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : loans.length > 0 ? (
                            loans.map((loan) => (
                                <tr
                                    key={loan._id}
                                    className="group bg-white hover:bg-indigo-50/30 transition-all duration-300 shadow-sm hover:shadow-md rounded-2xl"
                                >
                                    <td className="px-6 py-5 first:rounded-l-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <Wallet size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{loan.amount.toLocaleString()} {loan.currency}</p>
                                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">{loan.loanId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center font-bold text-xs">
                                                {loan?.contact?.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{loan?.contact?.name}</p>
                                                <p className="text-xs text-gray-400">{loan?.disbursementMethod}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit uppercase ${loan.loanType === 'installment' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                                }`}>
                                                {loan.loanType || 'one-time'}
                                            </span>
                                            {loan.loanType === 'installment' && (
                                                <p className="text-xs text-gray-400 mt-1">{loan.installments} Months</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar size={14} className="text-gray-400" />
                                            <span className="text-sm font-medium">{formatDate(loan?.dueDate)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <LoanStatus loan={loan} />
                                    </td>
                                    <td className="px-6 py-5 last:rounded-r-2xl text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                title='View'
                                                className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                href={"/loans/" + loan._id}
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <div className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                                <DeleteLoan id={loan._id} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center opacity-40">
                                        <FileText size={48} className="mb-4" />
                                        <p className="text-lg font-bold">No loans records yet</p>
                                        <p className="text-sm">When you add loans, they will appear here.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 flex justify-center">
                <Pagination page={1} totalPages={1} onPageChange={v => console.log(v)} />
            </div>
        </div>
    );
};

const FileText = ({ size, className }: { size?: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
);

export default LoansTable;