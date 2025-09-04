'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, X, CalendarDays, Wallet, Banknote, User, FileText, CheckCircle, Clock } from 'lucide-react';

// NOTE: This page uses the `lucide-react` library for icons.
// To use these components, ensure you have the library installed:
// `npm install lucide-react`

// Types for the data
interface RepaymentHistory {
    date: string;
    amount: number;
    status: 'Paid' | 'Pending';
}
type Status = 'Pending' | 'Paid' | 'Late' | 'Forgiven' | 'Upcoming' | 'Completed' | 'Forgiven';

interface Repayment {
    id: string;
    loanPurpose: string;
    borrower: string;
    lender: string;
    installment: number;
    totalInstallments: number;
    dueDate: string;
    amount: number;
    status: Status;
    paidDate?: string;
    repaymentHistory?: RepaymentHistory[];
}

// Mock data for the user and repayments
const mockUser = {
    id: 'borrower-123',
    name: 'Yusuf Ali',
    role: 'borrower', // Or 'lender' to test the other view
};

const mockRepayments: Repayment[] = [
    {
        id: '1',
        loanPurpose: "Business Expansion",
        borrower: 'Yusuf Ali',
        lender: 'Fatima',
        installment: 2,
        totalInstallments: 6,
        dueDate: "2024-09-20",
        amount: 150,
        status: "Pending",
        repaymentHistory: [
            { date: '2024-08-20', amount: 150, status: 'Paid' }
        ]
    },
    {
        id: '2',
        loanPurpose: "House Downpayment",
        borrower: 'Yusuf Ali',
        lender: 'Ahmed Khan',
        installment: 4,
        totalInstallments: 12,
        dueDate: "2024-09-15",
        amount: 500,
        status: "Paid",
        paidDate: '2024-09-14',
        repaymentHistory: [
            { date: '2024-06-15', amount: 500, status: 'Paid' },
            { date: '2024-07-15', amount: 500, status: 'Paid' },
            { date: '2024-08-15', amount: 500, status: 'Paid' }
        ]
    },
    {
        id: '3',
        loanPurpose: "Car Purchase",
        borrower: 'Sami Abdul',
        lender: 'Yusuf Ali',
        installment: 1,
        totalInstallments: 4,
        dueDate: "2024-08-01",
        amount: 300,
        status: "Late",
        repaymentHistory: []
    },
    {
        id: '4',
        loanPurpose: "Medical Expenses",
        borrower: 'Yusuf Ali',
        lender: 'Aliya',
        installment: 3,
        totalInstallments: 6,
        dueDate: "2024-07-25",
        amount: 200,
        status: "Forgiven",
        repaymentHistory: [
            { date: '2024-05-25', amount: 200, status: 'Paid' },
            { date: '2024-06-25', amount: 200, status: 'Paid' }
        ]
    },
    {
        id: '5',
        loanPurpose: "New Laptop",
        borrower: 'Yusuf Ali',
        lender: 'Zainab',
        installment: 1,
        totalInstallments: 3,
        dueDate: "2024-10-01",
        amount: 75,
        status: "Pending",
        repaymentHistory: []
    },
];

// Helper component for status badges
const StatusBadge: React.FC<{ status: Repayment['status'] }> = ({ status }) => {
    let colorClass = '';
    switch (status) {
        case 'Pending':
            colorClass = 'bg-gray-100 text-gray-800';
            break;
        case 'Paid':
            colorClass = 'bg-green-100 text-green-800';
            break;
        case 'Late':
            colorClass = 'bg-red-100 text-red-800';
            break;
        case 'Forgiven':
            colorClass = 'bg-blue-100 text-blue-800';
            break;
    }
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
            {status}
        </span>
    );
};

// Repayment Details Modal component
const RepaymentDetailsModal: React.FC<{ repayment: Repayment | null; onClose: () => void; userRole: string }> = ({ repayment, onClose, userRole }) => {
    if (!repayment) return null;

    const totalFunded = repayment.amount * repayment.totalInstallments;
    const installmentsPaid = repayment.repaymentHistory?.filter(h => h.status === 'Paid').length || 0;
    const progress = (installmentsPaid / repayment.totalInstallments) * 100;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl transform transition-all p-6 relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={24} />
                </button>
                <div className="flex flex-col space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Repayment Details</h2>

                    {/* Loan Summary */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Loan Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div className="flex items-center space-x-2">
                                <FileText size={18} className="text-gray-500" />
                                <span><span className="font-medium">Purpose:</span> {repayment.loanPurpose}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Banknote size={18} className="text-gray-500" />
                                <span><span className="font-medium">Total Funded:</span> ${totalFunded}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle size={18} className="text-gray-500" />
                                <span><span className="font-medium">Installments:</span> {repayment.totalInstallments}</span>
                            </div>
                        </div>
                    </div>

                    {/* Installment Details */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Installment #{repayment.installment} of {repayment.totalInstallments}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div className="flex items-center space-x-2">
                                <CalendarDays size={18} className="text-gray-500" />
                                <span><span className="font-medium">Due Date:</span> {repayment.dueDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Wallet size={18} className="text-gray-500" />
                                <span><span className="font-medium">Amount:</span> ${repayment.amount}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock size={18} className="text-gray-500" />
                                <span><span className="font-medium">Status:</span> <StatusBadge status={repayment.status} /></span>
                            </div>
                            {repayment.paidDate && (
                                <div className="flex items-center space-x-2">
                                    <CheckCircle size={18} className="text-gray-500" />
                                    <span><span className="font-medium">Paid On:</span> {repayment.paidDate}</span>
                                </div>
                            )}
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-1 font-medium">Progress</p>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                <span>{installmentsPaid} of {repayment.totalInstallments} paid</span>
                                <span>{progress.toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Repayment History */}
                    {repayment.repaymentHistory && repayment.repaymentHistory.length > 0 && (
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Repayment History</h3>
                            <ul className="divide-y divide-gray-200">
                                {repayment.repaymentHistory.map((history, index) => (
                                    <li key={index} className="py-2 text-sm text-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <CalendarDays size={16} className="text-gray-500" />
                                                <span>{history.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span>${history.amount}</span>
                                                <StatusBadge status={history.status} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Borrower specific action */}
                    {userRole === 'borrower' && repayment.status === 'Pending' && (
                        <div className="flex justify-center mt-6">
                            <button className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-full font-medium shadow-md hover:bg-indigo-700 transition-colors">
                                <FileText size={18} className="mr-2" />
                                Request Rescheduling
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

// Repayment Row component for desktop view
const RepaymentRow: React.FC<{ repayment: Repayment; userRole: string; onOpenModal: () => void }> = ({ repayment, userRole, onOpenModal }) => {
    const isBorrower = userRole === 'borrower';
    const displayPartnerName = isBorrower ? repayment.lender : repayment.borrower;
    const payNowButtonVisible = isBorrower && repayment.status === 'Pending';

    return (
        <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors last:border-b-0">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{repayment.loanPurpose}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-400" />
                    <span>{displayPartnerName}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{repayment.installment} of {repayment.totalInstallments}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                    <span>{repayment.dueDate}</span>
                    <StatusBadge status={repayment.status} />
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">${repayment.amount}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-3">
                    {payNowButtonVisible && (
                        <button className="px-4 py-2 bg-green-500 text-white rounded-full text-xs font-semibold hover:bg-green-600 transition-colors">
                            Pay Now
                        </button>
                    )}
                    <button
                        onClick={onOpenModal}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors flex items-center"
                    >
                        <span className="mr-1">View Details</span>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

// Repayment Card component for mobile view
const RepaymentCard: React.FC<{ repayment: Repayment; userRole: string; onOpenModal: () => void }> = ({ repayment, userRole, onOpenModal }) => {
    const isBorrower = userRole === 'borrower';
    const displayPartnerName = isBorrower ? repayment.lender : repayment.borrower;
    const payNowButtonVisible = isBorrower && repayment.status === 'Pending';

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-900">{repayment.loanPurpose}</h3>
                <StatusBadge status={repayment.status} />
            </div>

            <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                        <User size={16} className="text-gray-400" />
                        <span>{isBorrower ? 'Lender' : 'Borrower'}:</span>
                    </span>
                    <span className="font-medium text-gray-800">{displayPartnerName}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                        <CalendarDays size={16} className="text-gray-400" />
                        <span>Due Date:</span>
                    </span>
                    <span className="font-medium text-gray-800">{repayment.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                        <Banknote size={16} className="text-gray-400" />
                        <span>Amount:</span>
                    </span>
                    <span className="font-bold text-lg text-gray-900">${repayment.amount}</span>
                </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                {payNowButtonVisible && (
                    <button className="flex-1 px-4 py-2 text-sm bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors">
                        Pay Now
                    </button>
                )}
                <button
                    onClick={onOpenModal}
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

// Main page component
const RepaymentsPage = () => {
    const [activeTab, setActiveTab] = useState<Status>('Upcoming');
    const [selectedRepayment, setSelectedRepayment] = useState<Repayment | null>(null);
    const [repayments, setRepayments] = useState<Repayment[]>([]);
    const userRole = mockUser.role;

    useEffect(() => {
        // In a real app, you would fetch data here.
        // For now, we filter the mock data based on the user's role.
        const filteredData = mockRepayments.filter(repayment => {
            if (userRole === 'borrower') {
                return repayment.borrower === mockUser.name;
            } else { // lender
                return repayment.lender === mockUser.name;
            }
        });
        setRepayments(filteredData);
    }, [userRole]);

    const getFilteredRepayments = () => {
        switch (activeTab) {
            case 'Upcoming':
                return repayments.filter(r => r.status === 'Pending');
            case 'Completed':
                return repayments.filter(r => r.status === 'Paid');
            case 'Late':
                return repayments.filter(r => r.status === 'Late');
            case 'Forgiven':
                return repayments.filter(r => r.status === 'Forgiven');
            default:
                return repayments;
        }
    };

    const handleOpenModal = (repayment: Repayment) => {
        setSelectedRepayment(repayment);
    };

    const handleCloseModal = () => {
        setSelectedRepayment(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 md:mb-8">Repayments</h1>

                {/* Tabs */}
                <div className="flex flex-wrap space-x-2 md:space-x-4 mb-6">
                    {['Upcoming', 'Completed', 'Late', 'Forgiven'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as Status)}
                            className={`
                px-4 py-2 rounded-full font-medium text-sm transition-colors
                ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}
              `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Repayments Table (Desktop View) */}
                <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Loan Purpose
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {userRole === 'borrower' ? 'Lender' : 'Borrower'}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Installment
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Due Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {getFilteredRepayments().map(repayment => (
                                <RepaymentRow
                                    key={repayment.id}
                                    repayment={repayment}
                                    userRole={userRole}
                                    onOpenModal={() => handleOpenModal(repayment)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Repayments Cards (Mobile View) */}
                <div className="md:hidden space-y-4">
                    {getFilteredRepayments().map(repayment => (
                        <RepaymentCard
                            key={repayment.id}
                            repayment={repayment}
                            userRole={userRole}
                            onOpenModal={() => handleOpenModal(repayment)}
                        />
                    ))}
                </div>
            </div>
            <RepaymentDetailsModal
                repayment={selectedRepayment}
                onClose={handleCloseModal}
                userRole={userRole}
            />
        </div>
    );
};

export default RepaymentsPage;
