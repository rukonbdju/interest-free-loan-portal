'use client'
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowDown, ArrowUp, Clock, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
const PRIMARY_COLOR = 'indigo';
export interface Transaction {
    id: number;
    type: 'Income' | 'Expense';
    amount: number;
    description: string;
    date: string;
}

export type FilterType = 'All' | 'Income' | 'Expense';

export interface TransactionItemProps {
    transaction: Transaction;
}

const initialTransactions: Transaction[] = [
    { id: 1, type: 'Income', amount: 450000, description: 'Monthly Salary', date: '2025-11-25' },
    { id: 2, type: 'Expense', amount: 650, description: 'Rent Payment', date: '2025-11-26' },
    { id: 3, type: 'Expense', amount: 120, description: 'Groceries from Store X', date: '2025-11-27' },
    { id: 4, type: 'Income', amount: 150, description: 'Freelance Gig', date: '2025-11-27' },
    { id: 5, type: 'Expense', amount: 45, description: 'Gym Membership', date: '2025-11-28' },
    { id: 6, type: 'Expense', amount: 30, description: 'Coffee and Snacks', date: '2025-11-28' },
];

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    const isIncome = transaction.type === 'Income';
    const amountColor = isIncome ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
    const Icon = isIncome ? ArrowUp : ArrowDown;

    return (
        <li className="flex items-center justify-between p-4 border-b last:border-b-0 transition duration-150 hover:bg-gray-50">
            <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className={`p-2 rounded-full ${amountColor}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                    <p className="text-base font-semibold text-gray-800 truncate">{transaction.description}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <p className={`text-lg font-bold px-1.5 rounded text-right flex-shrink-0 ${amountColor}`}>
                    {formatCurrency(transaction.amount)}
                </p>
                <div className="flex space-x-1 opacity-75 hover:opacity-100 transition-opacity">
                    <button

                        className="p-1 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-100"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </li>
    );
};


const RecentTransactions = () => {
    const [filterType, setFilterType] = useState<FilterType>('All');
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Recent Transactions</h2>

                <div className="flex space-x-3 w-full sm:w-auto">
                    {/* Filter Buttons */}
                    <div className="inline-flex rounded-lg shadow-sm">
                        {(['All', 'Income', 'Expense'] as FilterType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-2 text-sm font-medium transition-colors border ${filterType === type
                                    ? `bg-${PRIMARY_COLOR}-600 text-white border-${PRIMARY_COLOR}-600`
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                    } first:rounded-l-lg last:rounded-r-lg -ml-px`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                </div>

            </div>

            {/* Transaction List */}
            <ul className="divide-y divide-gray-200">
                {initialTransactions.length > 0 ? (
                    initialTransactions.map((t: Transaction) => (
                        <TransactionItem
                            key={t.id}
                            transaction={t}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 p-8">No transactions found matching the criteria.</p>
                )}
            </ul>
        </div>
    )
}

export default RecentTransactions;