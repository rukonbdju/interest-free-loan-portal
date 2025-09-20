'use client';
import React, { useState, FC, FormEvent } from 'react';
import { Wallet, Plus, Edit, Trash2, Calendar, DollarSign, X } from 'lucide-react';

// TypeScript Interfaces as per requirements
interface Repayment {
    id: string;
    installmentNo: number;
    paymentDate: string;
    amount: number;
    method: "Cash" | "Bank Transfer" | "Mobile Payment" | "Other";
    status: "On Time" | "Late";
    notes?: string;
}

interface LoanSummary {
    borrowerName: string;
    loanAmount: number;
    startDate: string;
    dueDate: string;
    totalPaid: number;
    outstandingBalance: number;
}

// Props for the main component
interface RepaymentPageProps {
    loan: LoanSummary;
    repayments: Repayment[];
    onAddRepayment: (repayment: Omit<Repayment, 'id' | 'installmentNo' | 'status'>) => Promise<void>;
    onEditRepayment: (repaymentId: string, repayment: Omit<Repayment, 'id' | 'installmentNo' | 'status'>) => Promise<void>;
    onDeleteRepayment: (repaymentId: string) => Promise<void>;
}

// --- MOCK DATA for demonstration ---
// In a real application, this data would come from props or an API call.
const mockLoanSummary: LoanSummary = {
    borrowerName: 'Jane Doe',
    loanAmount: 5000,
    startDate: '2023-01-15',
    dueDate: '2024-01-15',
    totalPaid: 2500,
    outstandingBalance: 2500,
};

const mockRepayments: Repayment[] = [
    { id: '1', installmentNo: 1, paymentDate: '2023-02-14', amount: 500, method: 'Bank Transfer', status: 'On Time' },
    { id: '2', installmentNo: 2, paymentDate: '2023-03-15', amount: 500, method: 'Mobile Payment', status: 'On Time' },
    { id: '3', installmentNo: 3, paymentDate: '2023-04-18', amount: 500, method: 'Bank Transfer', status: 'Late' },
    { id: '4', installmentNo: 4, paymentDate: '2023-05-15', amount: 500, method: 'Cash', status: 'On Time' },
    { id: '5', installmentNo: 5, paymentDate: '2023-06-15', amount: 500, method: 'Bank Transfer', status: 'On Time' },
];

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Helper to format dates
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// --- Sub-components ---

// Repayment Modal for Add/Edit
const RepaymentModal: FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    repayment: Partial<Repayment> | null;
    setRepayment: (repayment: Partial<Repayment>) => void;
}> = ({ isOpen, onClose, onSubmit, repayment, setRepayment }) => {
    if (!isOpen) return null;

    const isEditing = repayment && repayment.id;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{isEditing ? 'Edit Repayment' : 'Add New Repayment'}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="date"
                                    id="paymentDate"
                                    value={repayment?.paymentDate || ''}
                                    onChange={(e) => setRepayment({ ...repayment, paymentDate: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount Paid</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    id="amount"
                                    placeholder="0.00"
                                    step="0.01"
                                    value={repayment?.amount || ''}
                                    onChange={(e) => setRepayment({ ...repayment, amount: parseFloat(e.target.value) })}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="method" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
                            <select
                                id="method"
                                value={repayment?.method || ''}
                                onChange={(e) => setRepayment({ ...repayment, method: e.target.value as Repayment['method'] })}
                                className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            >
                                <option value="" disabled>Select a method</option>
                                <option>Cash</option>
                                <option>Bank Transfer</option>
                                <option>Mobile Payment</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes (Optional)</label>
                            <textarea
                                id="notes"
                                rows={3}
                                value={repayment?.notes || ''}
                                onChange={(e) => setRepayment({ ...repayment, notes: e.target.value })}
                                placeholder="Add any relevant notes here..."
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-b-lg space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            ✅ {isEditing ? 'Save Changes' : 'Save Repayment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Main Page Component ---
const RepaymentManagementPage: FC<Partial<RepaymentPageProps>> = ({
    loan = mockLoanSummary,
    repayments = mockRepayments,
    onAddRepayment = async (data) => console.log("Add Repayment:", data),
    onEditRepayment = async (id, data) => console.log("Edit Repayment:", id, data),
    onDeleteRepayment = async (id) => console.log("Delete Repayment:", id),
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRepayment, setCurrentRepayment] = useState<Partial<Repayment> | null>(null);

    const handleOpenModal = (repayment?: Repayment) => {
        setCurrentRepayment(repayment || {});
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentRepayment(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentRepayment) return;

        const dataToSubmit = {
            paymentDate: currentRepayment.paymentDate!,
            amount: currentRepayment.amount!,
            method: currentRepayment.method!,
            notes: currentRepayment.notes,
        };

        try {
            if (currentRepayment.id) {
                // Editing existing repayment
                await onEditRepayment(currentRepayment.id, dataToSubmit);
            } else {
                // Adding new repayment
                await onAddRepayment(dataToSubmit);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save repayment:", error);
            // Here you could show an error message to the user
        }
    };

    // Quick Stats calculation
    const nextDueDate = new Date(loan.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((nextDueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));


    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Repayment Management</h1>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Loan Summary & Repayment History */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Loan Summary Card */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Loan Summary</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Borrower</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{loan.borrowerName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Loan Amount</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(loan.loanAmount)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Start Date</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(loan.startDate)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(loan.dueDate)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Total Paid</p>
                                    <p className="font-medium text-green-600 dark:text-green-400">{formatCurrency(loan.totalPaid)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Outstanding</p>
                                    <p className="font-medium text-red-600 dark:text-red-400">{formatCurrency(loan.outstandingBalance)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Repayment History Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="flex justify-between items-center p-4 sm:p-6 border-b dark:border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <Wallet className="text-indigo-600 dark:text-indigo-400" size={24} />
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Repayment History</h2>
                                </div>
                                <button
                                    onClick={() => handleOpenModal()}
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <Plus size={16} className="mr-2" />
                                    Add Repayment
                                </button>
                            </div>

                            {/* Repayments Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Installment</th>
                                            <th scope="col" className="px-6 py-3">Payment Date</th>
                                            <th scope="col" className="px-6 py-3">Amount Paid</th>
                                            <th scope="col" className="px-6 py-3">Method</th>
                                            <th scope="col" className="px-6 py-3">Status</th>
                                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {repayments.map((repayment) => (
                                            <tr key={repayment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">#{repayment.installmentNo}</td>
                                                <td className="px-6 py-4">{formatDate(repayment.paymentDate)}</td>
                                                <td className="px-6 py-4 font-medium">{formatCurrency(repayment.amount)}</td>
                                                <td className="px-6 py-4">{repayment.method}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${repayment.status === 'On Time'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                        }`}>
                                                        {repayment.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <button onClick={() => handleOpenModal(repayment)} className="p-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-700">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => onDeleteRepayment(repayment.id)} className="p-2 text-gray-500 rounded-md hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Stats</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-gray-500 dark:text-gray-400">Total Loan Amount</span>
                                    <span className="font-bold text-lg text-gray-900 dark:text-white">{formatCurrency(loan.loanAmount)}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-gray-500 dark:text-gray-400">Total Paid</span>
                                    <span className="font-bold text-lg text-green-600 dark:text-green-400">{formatCurrency(loan.totalPaid)}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-gray-500 dark:text-gray-400">Remaining Balance</span>
                                    <span className="font-bold text-lg text-red-600 dark:text-red-400">{formatCurrency(loan.outstandingBalance)}</span>
                                </div>
                                <div className="pt-2 border-t dark:border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 dark:text-gray-400">Next Due Date</span>
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${daysUntilDue <= 7 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                            }`}>
                                            {daysUntilDue > 0 ? `Due in ${daysUntilDue} days` : 'Overdue'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Component */}
            <RepaymentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                repayment={currentRepayment}
                setRepayment={(rep) => setCurrentRepayment(prev => ({ ...prev, ...rep }))}
            />
        </div>
    );
};

export default RepaymentManagementPage;
