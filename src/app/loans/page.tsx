'use client';
import React, { useState } from 'react';

// --- TYPES ---
type LoanStatus = "pending" | "funding" | "active" | "completed" | "defaulted";
type RepaymentStatus = "paid" | "pending" | "late";

interface Lender {
    name: string;
    amount: number;
}

interface Repayment {
    installment: number;
    dueDate: string;
    amount: number;
    status: RepaymentStatus;
}

interface Loan {
    id: number;
    purpose: string;
    amountRequested: number;
    amountFunded: number;
    status: LoanStatus;
    repaymentProgress: number;
    nextDueDate: string | null;
    nextDueAmount: number | null;
    lenders: Lender[];
    repaymentSchedule: Repayment[];
}

// --- MOCK DATA ---
const mockLoans: Loan[] = [
    {
        id: 1,
        purpose: "Small Business Startup",
        amountRequested: 5000,
        amountFunded: 5000,
        status: "active",
        repaymentProgress: 40,
        nextDueDate: "2025-09-15",
        nextDueAmount: 500,
        lenders: [
            { name: "Fatima Yusuf", amount: 3000 },
            { name: "Omar Al-Farsi", amount: 2000 }
        ],
        repaymentSchedule: [
            { installment: 1, dueDate: "2025-06-15", amount: 500, status: "paid" },
            { installment: 2, dueDate: "2025-07-15", amount: 500, status: "paid" },
            { installment: 3, dueDate: "2025-08-15", amount: 500, status: "paid" },
            { installment: 4, dueDate: "2025-09-15", amount: 500, status: "pending" },
            { installment: 5, dueDate: "2025-10-15", amount: 500, status: "pending" },
            { installment: 6, dueDate: "2025-11-15", amount: 500, status: "pending" },
            { installment: 7, dueDate: "2025-12-15", amount: 500, status: "pending" },
            { installment: 8, dueDate: "2026-01-15", amount: 500, status: "pending" },
            { installment: 9, dueDate: "2026-02-15", amount: 500, status: "pending" },
            { installment: 10, dueDate: "2026-03-15", amount: 500, status: "pending" },
        ]
    },
    {
        id: 2,
        purpose: "Home Office Renovation",
        amountRequested: 3000,
        amountFunded: 1200,
        status: "funding",
        repaymentProgress: 0,
        nextDueDate: null,
        nextDueAmount: null,
        lenders: [
            { name: "Aisha Khan", amount: 1200 }
        ],
        repaymentSchedule: []
    },
    {
        id: 3,
        purpose: "Educational Course Fees",
        amountRequested: 1500,
        amountFunded: 0,
        status: "pending",
        repaymentProgress: 0,
        nextDueDate: null,
        nextDueAmount: null,
        lenders: [],
        repaymentSchedule: []
    },
    {
        id: 4,
        purpose: "Emergency Medical Expenses",
        amountRequested: 2000,
        amountFunded: 2000,
        status: "completed",
        repaymentProgress: 100,
        nextDueDate: null,
        nextDueAmount: null,
        lenders: [
            { name: "Ali Bakr", amount: 1000 },
            { name: "Khadija Ahmed", amount: 500 },
            { name: "Zainab Ibrahim", amount: 500 },
        ],
        repaymentSchedule: [
            { installment: 1, dueDate: "2025-01-15", amount: 500, status: "paid" },
            { installment: 2, dueDate: "2025-02-15", amount: 500, status: "paid" },
            { installment: 3, dueDate: "2025-03-15", amount: 500, status: "paid" },
            { installment: 4, dueDate: "2025-04-15", amount: 500, status: "paid" },
        ]
    },
    {
        id: 5,
        purpose: "Used Car Purchase",
        amountRequested: 4000,
        amountFunded: 4000,
        status: "defaulted",
        repaymentProgress: 25,
        nextDueDate: "2025-05-15",
        nextDueAmount: 400,
        lenders: [
            { name: "Yusuf Abdullah", amount: 4000 }
        ],
        repaymentSchedule: [
            { installment: 1, dueDate: "2025-03-15", amount: 400, status: "paid" },
            { installment: 2, dueDate: "2025-04-15", amount: 400, status: "paid" },
            { installment: 3, dueDate: "2025-05-15", amount: 400, status: "late" },
            { installment: 4, dueDate: "2025-06-15", amount: 400, status: "late" },
        ]
    }
];

// --- SVG ICONS ---
const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// --- INDIVIDUAL COMPONENTS ---
const StatusBadge: React.FC<{ status: LoanStatus }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-sm font-medium rounded-full capitalize";
    const statusStyles: Record<LoanStatus, string> = {
        pending: "bg-gray-200 text-gray-800",
        funding: "bg-yellow-200 text-yellow-800",
        active: "bg-emerald-200 text-emerald-800",
        completed: "bg-blue-200 text-blue-800",
        defaulted: "bg-red-200 text-red-800",
    };
    return <span className={`${baseClasses} ${statusStyles[status]}`}>{status}</span>;
};

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
    </div>
);

const LoanCard: React.FC<{ loan: Loan; onDetailsClick: (loan: Loan) => void }> = ({ loan, onDetailsClick }) => {
    const { purpose, amountRequested, amountFunded, status, repaymentProgress, nextDueDate, nextDueAmount } = loan;

    const formattedAmountFunded = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amountFunded);
    const formattedAmountRequested = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amountRequested);
    const formattedNextDueAmount = nextDueAmount ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(nextDueAmount) : null;

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{purpose}</h3>
                    <StatusBadge status={status} />
                </div>
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Funding Progress</p>
                    <div className="flex items-center">
                        <span className="text-lg font-semibold text-emerald-600 mr-2">{formattedAmountFunded}</span>
                        <span className="text-gray-600">/ {formattedAmountRequested}</span>
                    </div>
                </div>
                {status === 'active' || status === 'defaulted' ? (
                    <>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Repayment Progress ({repaymentProgress}%)</p>
                            <ProgressBar progress={repaymentProgress} />
                        </div>
                        {nextDueDate && formattedNextDueAmount && (
                            <div className="bg-gray-50 rounded-lg p-3 text-center">
                                <p className="text-sm text-gray-500">Next Installment</p>
                                <p className="font-semibold text-gray-800">{formattedNextDueAmount} on {new Date(nextDueDate).toLocaleDateString()}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-gray-50 rounded-lg p-3 text-center h-[76px] flex items-center justify-center">
                        <p className="text-gray-500">No active repayments.</p>
                    </div>
                )}
            </div>
            <div className="flex items-center mt-6 space-x-3">
                <button
                    onClick={() => onDetailsClick(loan)}
                    className="w-full text-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                >
                    View Details
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <DownloadIcon />
                    Contract
                </button>
            </div>
        </div>
    );
};

const LoanDetailsModal: React.FC<{ loan: Loan | null; onClose: () => void }> = ({ loan, onClose }) => {
    if (!loan) return null;

    const formattedAmountFunded = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(loan.amountFunded);
    const formattedAmountRequested = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(loan.amountRequested);

    const repaymentStatusColors: Record<RepaymentStatus, string> = {
        paid: "bg-emerald-100 text-emerald-800",
        pending: "bg-gray-100 text-gray-800",
        late: "bg-red-100 text-red-800",
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="p-6 sticky top-0 bg-white border-b z-10 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">{loan.purpose}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-6">
                    {/* Loan Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                        <div>
                            <p className="text-sm text-gray-500">Total Requested</p>
                            <p className="text-xl font-semibold text-gray-800">{formattedAmountRequested}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Amount Funded</p>
                            <p className="text-xl font-semibold text-emerald-600">{formattedAmountFunded}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Status</p>
                            <div className="mt-1 inline-block"><StatusBadge status={loan.status} /></div>
                        </div>
                    </div>

                    {/* Lenders List */}
                    {loan.lenders.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-700 mb-3">Lenders</h3>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                {loan.lenders.map((lender, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <p className="text-gray-600">{lender.name}</p>
                                        <p className="font-medium text-gray-800">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lender.amount)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Repayment Schedule */}
                    {loan.repaymentSchedule.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-3">Repayment Schedule</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-sm text-gray-600">
                                        <tr>
                                            <th className="p-3 rounded-l-lg">Installment</th>
                                            <th className="p-3">Due Date</th>
                                            <th className="p-3">Amount</th>
                                            <th className="p-3 rounded-r-lg">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loan.repaymentSchedule.map((item) => (
                                            <tr key={item.installment} className="border-b last:border-0">
                                                <td className="p-3">#{item.installment}</td>
                                                <td className="p-3">{new Date(item.dueDate).toLocaleDateString()}</td>
                                                <td className="p-3">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.amount)}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${repaymentStatusColors[item.status]}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-6 sticky bottom-0 bg-gray-50 border-t">
                    <button className="w-full text-center px-4 py-2.5 bg-yellow-500 text-yellow-900 font-semibold rounded-lg hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                        Request Rescheduling
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">Facing difficulties? You can request to reschedule your payment plan.</p>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function MyLoansPage() {
    const [activeTab, setActiveTab] = useState<LoanStatus | "all">('all');
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const tabs: (LoanStatus | "all")[] = ['all', 'pending', 'funding', 'active', 'completed', 'defaulted'];

    const filteredLoans = activeTab === 'all'
        ? mockLoans
        : mockLoans.filter(loan => loan.status === activeTab);

    const handleOpenModal = (loan: Loan) => setSelectedLoan(loan);
    const handleCloseModal = () => setSelectedLoan(null);

    const TabButton: React.FC<{ tabName: LoanStatus | "all" }> = ({ tabName }) => {
        const isActive = activeTab === tabName;
        return (
            <button
                onClick={() => setActiveTab(tabName)}
                className={`px-4 py-2 font-semibold text-sm rounded-lg capitalize transition-colors duration-300 ${isActive
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-gray-600 hover:bg-emerald-100'
                    }`}
            >
                {tabName}
            </button>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">My Loans</h1>
                    <p className="text-gray-600 mt-1">Track your loan requests and repayment progress.</p>
                </header>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="bg-white p-2 rounded-xl shadow-sm inline-flex flex-wrap items-center gap-2">
                        {tabs.map(tab => <TabButton key={tab} tabName={tab} />)}
                    </div>
                </div>

                {/* Loan Cards Grid */}
                {filteredLoans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredLoans.map(loan => (
                            <LoanCard key={loan.id} loan={loan} onDetailsClick={handleOpenModal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                        <p className="text-gray-500">No loans found for this category.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <LoanDetailsModal loan={selectedLoan} onClose={handleCloseModal} />
        </div>
    );
}
