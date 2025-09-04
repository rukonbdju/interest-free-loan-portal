'use client';
// This is a single-file Next.js component for the "My Pledges" page UI.
// It uses functional components with TypeScript syntax and Tailwind CSS classes.
//
// To use, ensure you have Tailwind CSS configured in your Next.js project.
// This component is designed to be a self-contained page.
//
// The code includes mock data, state management for tabs and a modal,
// and separate sub-components for a clean structure.

import { useState } from 'react';

// --- Types ---
// Define the data structures for a Pledge and its Repayment schedule.
// These types help ensure data consistency.
interface Repayment {
    installment: number;
    dueDate: string;
    amount: number;
    status: 'paid' | 'pending';
}

interface Pledge {
    id: string;
    borrower: string;
    purpose: string;
    totalLoan: number;
    amountPledged: number;
    status: 'funding' | 'active' | 'completed' | 'defaulted';
    repaymentProgress: number;
    nextDueDate: string | null;
    nextDueAmount: number | null;
    repaymentSchedule: Repayment[];
    reputation: 'verified' | 'gold-tier';
}

// --- Mock Data ---
// A collection of sample pledges to demonstrate all possible statuses and data points.
// In a real application, this data would be fetched from a backend API.
const mockPledges: Pledge[] = [
    {
        id: 'pledge-1',
        borrower: 'Aisha Abdullah',
        purpose: 'Small Business Expansion',
        totalLoan: 5000,
        amountPledged: 1200,
        status: 'active',
        repaymentProgress: 60,
        nextDueDate: '2025-10-15',
        nextDueAmount: 120,
        repaymentSchedule: [
            { installment: 1, dueDate: '2025-08-15', amount: 120, status: 'paid' },
            { installment: 2, dueDate: '2025-09-15', amount: 120, status: 'paid' },
            { installment: 3, dueDate: '2025-10-15', amount: 120, status: 'pending' },
        ],
        reputation: 'gold-tier',
    },
    {
        id: 'pledge-2',
        borrower: 'Mohammed Tariq',
        purpose: 'Family Medical Expenses',
        totalLoan: 3500,
        amountPledged: 750,
        status: 'completed',
        repaymentProgress: 100,
        nextDueDate: null,
        nextDueAmount: null,
        repaymentSchedule: [
            { installment: 1, dueDate: '2024-05-20', amount: 75, status: 'paid' },
            { installment: 2, dueDate: '2024-06-20', amount: 75, status: 'paid' },
        ],
        reputation: 'verified',
    },
    {
        id: 'pledge-3',
        borrower: 'Fatima Zohra',
        purpose: 'Higher Education Tuition',
        totalLoan: 8000,
        amountPledged: 2000,
        status: 'funding',
        repaymentProgress: 0,
        nextDueDate: null,
        nextDueAmount: null,
        repaymentSchedule: [],
        reputation: 'verified',
    },
    {
        id: 'pledge-4',
        borrower: 'Ali Khan',
        purpose: 'Car Repair',
        totalLoan: 1500,
        amountPledged: 300,
        status: 'defaulted',
        repaymentProgress: 20,
        nextDueDate: '2025-12-05',
        nextDueAmount: 30,
        repaymentSchedule: [
            { installment: 1, dueDate: '2025-10-05', amount: 30, status: 'paid' },
            { installment: 2, dueDate: '2025-11-05', amount: 30, status: 'pending' },
        ],
        reputation: 'verified',
    },
];

// --- StatusBadge Component ---
// Renders a colored badge based on the pledge status.
const StatusBadge = ({ status }: { status: Pledge['status'] }) => {
    let colorClass = '';
    switch (status) {
        case 'funding':
            colorClass = 'bg-yellow-100 text-yellow-800';
            break;
        case 'active':
            colorClass = 'bg-emerald-100 text-emerald-800';
            break;
        case 'completed':
            colorClass = 'bg-blue-100 text-blue-800';
            break;
        case 'defaulted':
            colorClass = 'bg-red-100 text-red-800';
            break;
        default:
            colorClass = 'bg-gray-100 text-gray-800';
    }
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${colorClass}`}
        >
            {status}
        </span>
    );
};

// --- ProgressBar Component ---
// Displays a progress bar for loan repayment.
const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
        />
    </div>
);

// --- PledgeCard Component ---
// Renders a card for each individual pledge.
const PledgeCard = ({ pledge, onDetailsClick }: { pledge: Pledge; onDetailsClick: () => void }) => {
    const isDefaultedOrCompleted = pledge.status === 'defaulted' || pledge.status === 'completed';

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transform transition-transform hover:scale-[1.01]">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {pledge.borrower}
                        {pledge.reputation === 'gold-tier' && (
                            <span className="ml-2 text-yellow-500" title="Gold Tier Lender">★</span>
                        )}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {pledge.purpose}
                    </p>
                </div>
                <StatusBadge status={pledge.status} />
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <div className="flex justify-between text-sm text-gray-600 font-medium">
                        <span>Pledged: <span className="text-emerald-600 font-bold">${pledge.amountPledged}</span></span>
                        <span>Total Loan: ${pledge.totalLoan}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        {((pledge.amountPledged / pledge.totalLoan) * 100).toFixed(0)}% of total loan
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Repayment Progress</p>
                    <ProgressBar progress={pledge.repaymentProgress} />
                </div>

                {!isDefaultedOrCompleted && pledge.nextDueDate && (
                    <div>
                        <p className="text-sm text-gray-600 font-medium mb-1">Next Installment</p>
                        <p className="text-gray-800 font-semibold text-lg">
                            ${pledge.nextDueAmount} <span className="text-gray-500 font-normal text-sm">on {new Date(pledge.nextDueDate).toLocaleDateString()}</span>
                        </p>
                    </div>
                )}
            </div>

            <button
                onClick={onDetailsClick}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
                View Details
            </button>
        </div>
    );
};

// --- PledgeDetailsModal Component ---
// Displays a modal with detailed information about a selected pledge.
const PledgeDetailsModal = ({ pledge, onClose }: { pledge: Pledge | null; onClose: () => void }) => {
    if (!pledge) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all scale-100 opacity-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Pledge Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Borrower Profile</h3>
                        <p className="text-gray-600">
                            <span className="font-bold">{pledge.borrower}</span>
                            <span className="ml-2 text-sm">({pledge.reputation})</span>
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Loan Details</h3>
                        <p className="text-gray-600">Purpose: <span className="font-medium">{pledge.purpose}</span></p>
                        <p className="text-gray-600">Total Loan Amount: <span className="font-medium">${pledge.totalLoan}</span></p>
                        <p className="text-gray-600">Your Pledged Amount: <span className="font-medium text-emerald-600">${pledge.amountPledged}</span></p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Repayment Schedule</h3>
                        {pledge.repaymentSchedule.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {pledge.repaymentSchedule.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.installment}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(item.dueDate).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600">${item.amount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${item.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No repayment schedule available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---
export default function MyPledgesPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);

    // Filter pledges based on the active tab
    const filteredPledges = mockPledges.filter(pledge => {
        if (activeTab === 'all') {
            return true;
        }
        return pledge.status === activeTab;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Pledges </h1>

                {/* --- Tab Filters --- */}
                <div className="flex items-center justify-start gap-2 sm:gap-4 mb-8 flex-wrap">
                    {['all', 'active', 'completed', 'defaulted'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                px-4 py-2 rounded-full font-semibold capitalize transition-all duration-200
                ${activeTab === tab
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }
              `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* --- Pledge Cards Grid/List --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPledges.map(pledge => (
                        <PledgeCard
                            key={pledge.id}
                            pledge={pledge}
                            onDetailsClick={() => setSelectedPledge(pledge)}
                        />
                    ))}
                </div>

                {/* --- Pledge Details Modal --- */}
                <PledgeDetailsModal
                    pledge={selectedPledge}
                    onClose={() => setSelectedPledge(null)}
                />
            </div>
        </div>
    );
}
