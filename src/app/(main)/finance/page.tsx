'use client';
import React, { useState, useMemo } from 'react';
import { DollarSign, ArrowUp, ArrowDown, Wallet, Clock, Tag, Search, Plus, Trash2, Edit, X } from 'lucide-react';

// --- Type Definitions ---
interface Transaction {
    id: number;
    type: 'Income' | 'Expense';
    amount: number;
    description: string;
    category: string;
    date: string; // ISO date string YYYY-MM-DD
}

type FilterType = 'All' | 'Income' | 'Expense';

interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
}

interface BudgetProgressProps {
    income: number;
    expense: number;
}

interface TransactionItemProps {
    transaction: Transaction;
    onEdit: (t: Transaction) => void;
    onDelete: (id: number) => void;
}

interface QuickAddFormData {
    type: 'Income' | 'Expense';
    amount: string;
    description: string;
    category: string;
}

interface QuickAddFormProps {
    onAdd: (t: Transaction) => void;
}

interface Message {
    text: string;
    type: 'alert' | 'confirm';
    onConfirm?: () => void;
}

// --- Configuration and Utilities ---

const PRIMARY_COLOR = 'indigo';

// Helper function to format currency
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// --- Mock Data ---

const initialTransactions: Transaction[] = [
    { id: 1, type: 'Income', amount: 4500, description: 'Monthly Salary', category: 'Work', date: '2025-11-25' },
    { id: 2, type: 'Expense', amount: 650, description: 'Rent Payment', category: 'Housing', date: '2025-11-26' },
    { id: 3, type: 'Expense', amount: 120, description: 'Groceries from Store X', category: 'Food', date: '2025-11-27' },
    { id: 4, type: 'Income', amount: 150, description: 'Freelance Gig', category: 'Side Hustle', date: '2025-11-27' },
    { id: 5, type: 'Expense', amount: 45, description: 'Gym Membership', category: 'Health', date: '2025-11-28' },
    { id: 6, type: 'Expense', amount: 30, description: 'Coffee and Snacks', category: 'Food', date: '2025-11-28' },
];

const categories: string[] = ['Work', 'Housing', 'Food', 'Side Hustle', 'Health', 'Utilities', 'Entertainment'];

// --- UI Components ---

/**
 * Global Styles Component (Fixes the jsx/global style warning)
 */
const GlobalStyles: React.FC = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
    /* Custom animation for mobile modal sliding up */
    @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    .animate-slideUp {
        animation: slideUp 0.3s ease-out forwards;
    }
    /* Ensures the Inter font is used */
    body {
        font-family: "Inter", sans-serif;
    }
  ` }} />
);


/**
 * Custom Message Box (Replaces alert/confirm)
 */
const MessageBox: React.FC<{ message: Message; onClose: () => void }> = ({ message, onClose }) => {
    const handleConfirm = () => {
        if (message.onConfirm) {
            message.onConfirm();
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900">
                        {message.type === 'confirm' ? 'Confirm Action' : 'Information'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-gray-700">{message.text}</p>
                <div className="flex justify-end space-x-3">
                    {message.type === 'confirm' && (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        onClick={message.type === 'confirm' ? handleConfirm : onClose}
                        className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition ${message.type === 'confirm' ? 'bg-red-600 hover:bg-red-700' : `bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700`
                            }`}
                    >
                        {message.type === 'confirm' ? 'Delete' : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    );
};


/**
 * Summary Card Component
 */
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl hover:scale-[1.01]">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="mt-1">
            <p className={`text-3xl font-bold ${color}`}>{formatCurrency(value)}</p>
        </div>
    </div>
);

/**
 * Progress Bar Component for Income vs Expense
 */
const BudgetProgress: React.FC<BudgetProgressProps> = ({ income, expense }) => {
    const percentage = income > 0 ? Math.min(100, (expense / income) * 100) : 0;
    const remaining = income - expense;
    const progressColor = percentage < 70 ? 'bg-green-500' : percentage < 90 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-indigo-600" />
                Monthly Budget Flow
            </h3>
            <div className="space-y-1">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Income: {formatCurrency(income)}</span>
                    <span>Expense: {formatCurrency(expense)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${progressColor} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
                Remaining Balance:
                <span className={`ml-2 font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(remaining)}
                </span>
            </p>
        </div>
    );
};

/**
 * Transaction Item Component
 */
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete }) => {
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
                        <Tag className="w-3 h-3 mr-1" />
                        <span>{transaction.category}</span>
                        <Clock className="w-3 h-3 ml-3 mr-1" />
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <p className={`text-lg font-bold w-24 text-right flex-shrink-0 ${amountColor}`}>
                    {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
                <div className="flex space-x-1 opacity-75 hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(transaction)}
                        className="p-1 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-100"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(transaction.id)}
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


/**
 * Quick Add Transaction Form (Simplified Modal/Sidebar)
 */
const QuickAddForm: React.FC<QuickAddFormProps> = ({ onAdd }) => {
    const [formData, setFormData] = useState<QuickAddFormData>({
        type: 'Expense',
        amount: '',
        description: '',
        category: categories[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.amount || !formData.description) return;

        const newTransaction: Transaction = {
            id: Date.now(), // Use timestamp as unique ID
            date: new Date().toISOString().split('T')[0],
            amount: parseFloat(formData.amount),
            type: formData.type,
            description: formData.description,
            category: formData.category,
        };

        onAdd(newTransaction);
        // Reset form
        setFormData({
            type: 'Expense',
            amount: '',
            description: '',
            category: categories[0],
        });
    };

    const inputStyle = "w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150";

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Quick Add</h3>

            <div>
                <div className="flex space-x-3">
                    <label className={`flex-1 p-3 text-center rounded-lg cursor-pointer transition-colors ${formData.type === 'Income' ? 'bg-green-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        <input
                            type="radio"
                            name="type"
                            value="Income"
                            checked={formData.type === 'Income'}
                            onChange={handleChange}
                            className="hidden"
                        />
                        Income
                    </label>
                    <label className={`flex-1 p-3 text-center rounded-lg cursor-pointer transition-colors ${formData.type === 'Expense' ? 'bg-red-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                        <input
                            type="radio"
                            name="type"
                            value="Expense"
                            checked={formData.type === 'Expense'}
                            onChange={handleChange}
                            className="hidden"
                        />
                        Expense
                    </label>
                </div>
            </div>

            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="e.g., 4500"
                    className={inputStyle}
                    required
                    min="0.01"
                    step="0.01"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="e.g., Monthly Salary"
                    className={inputStyle}
                    required
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputStyle}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className={`w-full py-3 px-4 bg-${PRIMARY_COLOR}-600 text-white font-semibold rounded-lg shadow-md hover:bg-${PRIMARY_COLOR}-700 focus:outline-none focus:ring-4 focus:ring-${PRIMARY_COLOR}-500 focus:ring-opacity-50 transition duration-150 flex items-center justify-center`}
            >
                <Plus className="w-5 h-5 mr-2" />
                Record Transaction
            </button>
        </form>
    );
};


// --- Main Application Component ---

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [filterType, setFilterType] = useState<FilterType>('All'); // 'All', 'Income', 'Expense'
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // For mobile Quick Add Modal
    const [message, setMessage] = useState<Message | null>(null); // For custom alerts/confirms

    // Calculate summary stats
    const { totalBalance, totalIncome, totalExpenses } = useMemo(() => {
        let income = 0;
        let expenses = 0;

        transactions.forEach((t: Transaction) => {
            if (t.type === 'Income') {
                income += t.amount;
            } else {
                expenses += t.amount;
            }
        });

        return {
            totalIncome: income,
            totalExpenses: expenses,
            totalBalance: income - expenses,
        };
    }, [transactions]);

    // Filtered and Sorted Transactions
    const filteredTransactions = useMemo(() => {
        return transactions
            .filter((t: Transaction) => filterType === 'All' || t.type === filterType)
            .filter((t: Transaction) => searchQuery === '' || t.description.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by newest first
    }, [transactions, filterType, searchQuery]);


    // Handlers
    const handleAddTransaction = (newTransaction: Transaction) => {
        setTransactions(prev => [newTransaction, ...prev]);
        setIsModalOpen(false); // Close quick add form if it was in a modal
    };

    const handleCloseMessage = () => setMessage(null);

    const handleDeleteTransaction = (id: number) => {
        // Show confirmation modal instead of window.confirm
        setMessage({
            text: 'Are you sure you want to delete this transaction? This action cannot be undone.',
            type: 'confirm',
            onConfirm: () => {
                setTransactions(prev => prev.filter(t => t.id !== id));
            },
        });
    };

    const handleEditTransaction = (transaction: Transaction) => {
        // Show informational alert modal instead of alert()
        setMessage({
            text: `Editing feature for transaction ID ${transaction.id} is currently under development.`,
            type: 'alert',
        });
    };

    // UI Structure
    return (
        <div className="min-h-screen bg-gray-50">
            <GlobalStyles />
            <header className="">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-1">Financial Overview</h1>
                <p className="text-lg text-gray-500">Track your cash flow with clarity and confidence.</p>
            </header>

            <main className=" mx-auto space-y-8">
                {/* 1. Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SummaryCard
                        title="Total Balance"
                        value={totalBalance}
                        icon={DollarSign}
                        color={totalBalance >= 0 ? 'text-indigo-600' : 'text-red-600'}
                    />
                    <SummaryCard
                        title="Total Income"
                        value={totalIncome}
                        icon={ArrowUp}
                        color="text-green-600"
                    />
                    <SummaryCard
                        title="Total Expenses"
                        value={totalExpenses}
                        icon={ArrowDown}
                        color="text-red-600"
                    />
                </div>

                {/* 2. Main Content Area: Transactions and Quick Add */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left/Main Column: Transactions List (Wider) */}
                    <section className="lg:col-span-2 space-y-6">
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

                            {/* Search Bar */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by description..."
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            {/* Transaction List */}
                            <ul className="divide-y divide-gray-200">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((t: Transaction) => (
                                        <TransactionItem
                                            key={t.id}
                                            transaction={t}
                                            onEdit={handleEditTransaction}
                                            onDelete={handleDeleteTransaction}
                                        />
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 p-8">No transactions found matching the criteria.</p>
                                )}
                            </ul>
                        </div>
                    </section>

                    {/* Right Column: Quick Add and Budget Progress (Sidebar) */}
                    <aside className="lg:col-span-1 space-y-8">
                        <QuickAddForm onAdd={handleAddTransaction} />
                        <BudgetProgress income={totalIncome} expense={totalExpenses} />
                    </aside>
                </div>
            </main>

            {/* Floating Action Button (Optional but great for mobile UX) */}
            <button
                onClick={() => setIsModalOpen(true)}
                className={`lg:hidden fixed bottom-6 right-6 p-4 bg-${PRIMARY_COLOR}-600 text-white rounded-full shadow-2xl hover:bg-${PRIMARY_COLOR}-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-${PRIMARY_COLOR}-500 focus:ring-opacity-50`}
                aria-label="Add new transaction"
            >
                <Plus className="w-6 h-6" />
            </button>

            {/* Simple Modal for Mobile Quick Add */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-end justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-md rounded-t-xl animate-slideUp">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-xl font-bold">Add New Transaction</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-4">
                            <QuickAddForm onAdd={handleAddTransaction} />
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Alert/Confirm Modal */}
            {message && <MessageBox message={message} onClose={handleCloseMessage} />}
        </div>
    );
};

export default App;