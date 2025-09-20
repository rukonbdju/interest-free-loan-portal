'use client';
import React, { useState, useMemo } from 'react';
import type { FC } from 'react';
import { Search, Edit, Trash2, Calendar, DollarSign, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, MoreHorizontal, Filter } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type PaymentMethod = "Cash" | "Bank" | "Mobile" | "Other";
type RepaymentStatus = "On Time" | "Late";
type LoanStatusFilter = "All" | "Active" | "Completed";

interface Repayment {
    id: string;
    borrowerName: string;
    loanId: string;
    loanAmount: number;
    installmentNo: number;
    paymentDate: string; // ISO string format for sorting
    amount: number;
    method: PaymentMethod;
    status: RepaymentStatus;
    notes?: string;
    loanStatus: 'Active' | 'Completed';
}

// --- MOCK DATA ---
const mockRepayments: Repayment[] = [
    { id: 'REPAY001', borrowerName: 'Alice Johnson', loanId: 'LOAN101', loanAmount: 5000, installmentNo: 3, paymentDate: '2025-09-15T10:00:00Z', amount: 500, method: 'Bank', status: 'On Time', loanStatus: 'Active', notes: 'Monthly payment' },
    { id: 'REPAY002', borrowerName: 'Bob Smith', loanId: 'LOAN102', loanAmount: 10000, installmentNo: 12, paymentDate: '2025-09-14T14:30:00Z', amount: 833.33, method: 'Mobile', status: 'Late', loanStatus: 'Active', notes: 'Payment delayed by 2 days' },
    { id: 'REPAY003', borrowerName: 'Charlie Brown', loanId: 'LOAN103', loanAmount: 2500, installmentNo: 1, paymentDate: '2025-09-12T11:00:00Z', amount: 250, method: 'Cash', status: 'On Time', loanStatus: 'Active' },
    { id: 'REPAY004', borrowerName: 'Diana Prince', loanId: 'LOAN104', loanAmount: 7500, installmentNo: 6, paymentDate: '2025-09-10T09:00:00Z', amount: 1250, method: 'Bank', status: 'On Time', loanStatus: 'Completed' },
    { id: 'REPAY005', borrowerName: 'Ethan Hunt', loanId: 'LOAN105', loanAmount: 15000, installmentNo: 8, paymentDate: '2025-09-08T18:00:00Z', amount: 1250, method: 'Other', status: 'Late', loanStatus: 'Active' },
    { id: 'REPAY006', borrowerName: 'Fiona Glenanne', loanId: 'LOAN106', loanAmount: 3000, installmentNo: 2, paymentDate: '2025-09-05T13:45:00Z', amount: 500, method: 'Mobile', status: 'On Time', loanStatus: 'Active' },
    { id: 'REPAY007', borrowerName: 'George Costanza', loanId: 'LOAN107', loanAmount: 1000, installmentNo: 1, paymentDate: '2025-08-30T16:20:00Z', amount: 100, method: 'Cash', status: 'On Time', loanStatus: 'Active' },
    { id: 'REPAY008', borrowerName: 'Alice Johnson', loanId: 'LOAN101', loanAmount: 5000, installmentNo: 2, paymentDate: '2025-08-15T10:00:00Z', amount: 500, method: 'Bank', status: 'On Time', loanStatus: 'Active' },
    { id: 'REPAY009', borrowerName: 'Bob Smith', loanId: 'LOAN102', loanAmount: 10000, installmentNo: 11, paymentDate: '2025-08-12T14:30:00Z', amount: 833.33, method: 'Mobile', status: 'On Time', loanStatus: 'Active' },
    { id: 'REPAY010', borrowerName: 'Diana Prince', loanId: 'LOAN104', loanAmount: 7500, installmentNo: 5, paymentDate: '2025-08-10T09:00:00Z', amount: 1250, method: 'Bank', status: 'On Time', loanStatus: 'Completed' },
    { id: 'REPAY011', borrowerName: 'Ethan Hunt', loanId: 'LOAN105', loanAmount: 15000, installmentNo: 7, paymentDate: '2025-08-08T18:00:00Z', amount: 1250, method: 'Other', status: 'On Time', loanStatus: 'Active' },
    { id: 'REPAY012', borrowerName: 'Alice Johnson', loanId: 'LOAN101', loanAmount: 5000, installmentNo: 1, paymentDate: '2025-07-15T10:00:00Z', amount: 500, method: 'Bank', status: 'On Time', loanStatus: 'Active' },
];

// --- HELPER COMPONENTS ---

const StatCard: FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex items-center space-x-4">
        <div className="bg-slate-100 text-slate-600 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-500 font-medium">{title}</p>
            <p className="text-2xl font-semibold text-slate-800">{value}</p>
        </div>
    </div>
);

const RepaymentStatusBadge: FC<{ status: RepaymentStatus }> = ({ status }) => (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status === 'Late'
        ? 'bg-red-100 text-red-700'
        : 'bg-green-100 text-green-700'
        }`}>
        {status}
    </span>
);

const PaymentMethodBadge: FC<{ method: PaymentMethod }> = ({ method }) => {
    const styles = {
        'Bank': 'bg-blue-100 text-blue-700',
        'Mobile': 'bg-purple-100 text-purple-700',
        'Cash': 'bg-yellow-100 text-yellow-700',
        'Other': 'bg-slate-100 text-slate-700',
    };
    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[method]}`}>
            {method}
        </span>
    );
};


// --- MAIN PAGE COMPONENT ---

const App: FC = () => {
    const [repayments] = useState<Repayment[]>(mockRepayments);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<"All" | RepaymentStatus>('All');
    const [loanStatusFilter, setLoanStatusFilter] = useState<LoanStatusFilter>('All');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [sortConfig, setSortConfig] = useState<{ key: keyof Repayment; direction: 'ascending' | 'descending' } | null>({ key: 'paymentDate', direction: 'descending' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const onEditRepayment = (id: string) => alert(`Editing repayment: ${id}`);
    const onDeleteRepayment = (id: string) => alert(`Deleting repayment: ${id}`);

    const paginatedRepayments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return repayments.slice(startIndex, startIndex + itemsPerPage);
    }, [repayments, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(repayments.length / itemsPerPage);

    const requestSort = (key: keyof Repayment) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof Repayment) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ChevronDown className="h-4 w-4 text-slate-400" />;
        }
        return sortConfig.direction === 'ascending' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
    };

    const totalCollected = repayments.reduce((acc, r) => acc + r.amount, 0);
    const totalLoanValue = repayments.reduce((acc, r) => acc + r.loanAmount, 0); // Simplified for demo
    const outstandingBalance = totalLoanValue - totalCollected;

    return (
        <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* --- Header --- */}
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-6">All Repayments</h1>

                {/* --- Summary Widgets --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Loan Amount Collected" value={totalCollected.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} icon={<DollarSign className="h-6 w-6" />} />
                    <StatCard title="Total Outstanding Balance" value={outstandingBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} icon={<DollarSign className="h-6 w-6 text-orange-500" />} />
                    <StatCard title="Total Number of Repayments" value={repayments.length.toString()} icon={<Filter className="h-6 w-6" />} />
                </div>

                {/* --- Filter & Search Bar --- */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-6 sticky top-4 z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search Borrower or Loan ID..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                        </div>
                        {/* Repayment Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value as "All" | RepaymentStatus); setCurrentPage(1); }}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                        >
                            <option value="All">All Repayment Statuses</option>
                            <option value="On Time">On Time</option>
                            <option value="Late">Late</option>
                        </select>
                        {/* Loan Status Filter */}
                        <select
                            value={loanStatusFilter}
                            onChange={(e) => { setLoanStatusFilter(e.target.value as LoanStatusFilter); setCurrentPage(1); }}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                        >
                            <option value="All">All Loan Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </select>
                        {/* Date Range Filter */}
                        <div className="flex items-center space-x-2">
                            <div className="relative w-full">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="date"
                                    value={dateRange.start}
                                    onChange={(e) => { setDateRange({ ...dateRange, start: e.target.value }); setCurrentPage(1); }}
                                    className="w-full pl-10 pr-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </div>
                            <span className="text-slate-500">-</span>
                            <div className="relative w-full">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="date"
                                    value={dateRange.end}
                                    onChange={(e) => { setDateRange({ ...dateRange, end: e.target.value }); setCurrentPage(1); }}
                                    className="w-full pl-10 pr-2 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Repayments Table / Cards --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden lg:block">
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="bg-slate-100 text-xs text-slate-500 uppercase font-semibold">
                                <tr>
                                    <th scope="col" className="p-4 cursor-pointer" onClick={() => requestSort('id')}>
                                        <div className="flex items-center">Repayment ID {getSortIcon('id')}</div>
                                    </th>
                                    <th scope="col" className="p-4 cursor-pointer" onClick={() => requestSort('borrowerName')}>
                                        <div className="flex items-center">Borrower {getSortIcon('borrowerName')}</div>
                                    </th>
                                    <th scope="col" className="p-4 cursor-pointer" onClick={() => requestSort('loanId')}>
                                        <div className="flex items-center">Loan Details {getSortIcon('loanId')}</div>
                                    </th>
                                    <th scope="col" className="p-4 cursor-pointer" onClick={() => requestSort('paymentDate')}>
                                        <div className="flex items-center">Payment Date {getSortIcon('paymentDate')}</div>
                                    </th>
                                    <th scope="col" className="p-4 cursor-pointer" onClick={() => requestSort('amount')}>
                                        <div className="flex items-center">Amount Paid {getSortIcon('amount')}</div>
                                    </th>
                                    <th scope="col" className="p-4">Payment Method</th>
                                    <th scope="col" className="p-4">Status</th>
                                    <th scope="col" className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRepayments.map((repayment) => (
                                    <tr key={repayment.id} className="bg-white border-b border-slate-200/80 hover:bg-slate-50 transition">
                                        <td className="p-4 font-mono text-xs text-slate-500">{repayment.id}</td>
                                        <td className="p-4 font-medium text-slate-800">{repayment.borrowerName}</td>
                                        <td className="p-4">
                                            <div>{repayment.loanId}</div>
                                            <div className="text-xs text-slate-500">
                                                {repayment.loanAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                            </div>
                                        </td>
                                        <td className="p-4">{new Date(repayment.paymentDate).toLocaleDateString()}</td>
                                        <td className="p-4 font-semibold text-slate-900">
                                            {repayment.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </td>
                                        <td className="p-4"><PaymentMethodBadge method={repayment.method} /></td>
                                        <td className="p-4"><RepaymentStatusBadge status={repayment.status} /></td>
                                        <td className="p-4">
                                            <div className="flex justify-center items-center space-x-2">
                                                <button onClick={() => onEditRepayment(repayment.id)} className="p-2 text-slate-500 hover:bg-slate-200 rounded-full transition group relative">
                                                    <Edit className="h-4 w-4" />
                                                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Edit</span>
                                                </button>
                                                <button onClick={() => onDeleteRepayment(repayment.id)} className="p-2 text-slate-500 hover:bg-red-100 hover:text-red-600 rounded-full transition group relative">
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 p-4">
                        {paginatedRepayments.map((repayment) => (
                            <div key={repayment.id} className="bg-white border border-slate-200/80 rounded-xl shadow-sm p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-slate-800">{repayment.borrowerName}</p>
                                        <p className="text-sm text-slate-500">{repayment.loanId}</p>
                                        <p className="text-xs font-mono text-slate-400 pt-1">{repayment.id}</p>
                                    </div>
                                    <div className="relative group">
                                        <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-full">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                        <div className="absolute right-0 mt-1 w-28 bg-white border rounded-lg shadow-lg opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none group-focus-within:pointer-events-auto z-10">
                                            <a href="#" onClick={() => onEditRepayment(repayment.id)} className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"><Edit className="h-4 w-4 mr-2" /> Edit</a>
                                            <a href="#" onClick={() => onDeleteRepayment(repayment.id)} className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4 mr-2" /> Delete</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200/80 my-2"></div>
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-semibold text-slate-900">
                                        {repayment.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </div>
                                    <RepaymentStatusBadge status={repayment.status} />
                                </div>
                                <div className="text-sm text-slate-500 space-y-1">
                                    <p><strong>Date:</strong> {new Date(repayment.paymentDate).toLocaleDateString()}</p>
                                    <p><strong>Method:</strong> <PaymentMethodBadge method={repayment.method} /></p>
                                    {repayment.notes && <p className="text-xs italic text-slate-400 pt-1">Note: {repayment.notes}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Pagination --- */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 px-4">
                        <span className="text-sm text-slate-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <span className="text-sm font-medium px-2">{currentPage}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-md hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
                {paginatedRepayments.length === 0 && (
                    <div className="text-center py-16 text-slate-500">
                        <p className="font-semibold text-lg">No Repayments Found</p>
                        <p className="mt-1">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
