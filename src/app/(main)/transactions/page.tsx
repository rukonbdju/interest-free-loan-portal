'use client'
import React, { useState, useMemo, useEffect } from 'react';
import {
    Plus, X, DollarSign, ArrowUpRight, ArrowDownLeft, Filter, SortAsc, Edit, Trash2, Calendar,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';


// --- 1. TYPESCRIPT INTERFACES ---

/**
 * Note: These interfaces are kept in the JSX file for structural consistency with the provided code.
 * In a pure TSX environment, they would be external.
 */
type TransactionType = 'income' | 'expense';

interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    date: string; // YYYY-MM-DD
}

interface FilterSortState {
    typeFilter: TransactionType | 'all';
    sortBy: 'date' | 'amount';
    sortDirection: 'asc' | 'desc';
}

// --- 2. MOCK DATA ---

const initialTransactions: Transaction[] = [
    { id: '1', description: 'Monthly Salary', amount: 5000, type: 'income', date: '2025-07-25' },
    { id: '2', description: 'Grocery Shopping', amount: 150.5, type: 'expense', date: '2025-07-26' },
    { id: '3', description: 'Freelance Project', amount: 800, type: 'income', date: '2025-07-25' },
    { id: '4', description: 'Rent Payment', amount: 1200, type: 'expense', date: '2025-07-28' },
    { id: '5', description: 'Dinner Out', amount: 75.0, type: 'expense', date: '2025-07-26' },
    { id: '6', description: 'Coffee', amount: 5.5, type: 'expense', date: '2025-07-28' },
    { id: '7', description: 'Previous Month Salary', amount: 5000, type: 'income', date: '2025-06-25' },
    { id: '8', description: 'Utilities', amount: 200, type: 'expense', date: '2025-06-28' },
    { id: '9', description: 'Yearly Bonus', amount: 2000, type: 'income', date: '2025-01-15' },
    { id: '10', description: 'Gym Membership', amount: 50, type: 'expense', date: '2025-07-24' },
    { id: '11', description: 'Software Subscription', amount: 19.99, type: 'expense', date: '2025-07-01' },
    { id: '12', description: 'Book Purchase', amount: 35.0, type: 'expense', date: '2025-07-10' },
    { id: '13', description: 'Consulting Fee', amount: 1500, type: 'income', date: '2025-06-05' },
    { id: '14', description: 'Travel Expenses', amount: 450.75, type: 'expense', date: '2025-05-15' },
    { id: '15', description: 'Investment Dividend', amount: 250, type: 'income', date: '2025-05-01' },
    { id: '16', description: 'New Laptop Purchase', amount: 1800, type: 'expense', date: '2025-04-10' },
    { id: '17', description: 'Freelance Q4 2024', amount: 3500, type: 'income', date: '2024-12-01' },
    { id: '18', description: 'Holiday Shopping', amount: 600, type: 'expense', date: '2024-12-15' },
    { id: '19', description: 'Small Repair', amount: 45.0, type: 'expense', date: '2025-07-27' },
    { id: '20', description: 'Passive Income Stream', amount: 120, type: 'income', date: '2025-07-27' },
    { id: '21', description: 'Q1 2024 Salary', amount: 4500, type: 'income', date: '2024-03-25' },
    { id: '22', description: 'Q4 2024 Rent', amount: 1200, type: 'expense', date: '2024-10-01' },
];


const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown Date';
    try {
        const date = new Date(dateString + 'T00:00:00'); // Ensure date is parsed correctly (local time issue)
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

        if (dateOnly.getTime() === todayOnly.getTime()) return 'Today';
        if (dateOnly.getTime() === yesterdayOnly.getTime()) return 'Yesterday';

        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        console.error("Error formatting date:", e);
        return dateString;
    }
};

// --- 4. TRANSACTION LIST ITEM COMPONENT (Updated Style) ---

interface TransactionItemProps {
    transaction: Transaction;
    onEdit: (tx: Transaction) => void;
    onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete }) => {
    const isIncome = transaction.type === 'income';
    const amountColor = isIncome ? 'text-green-600' : 'text-red-600 ';
    const icon = isIncome ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />;
    const iconBg = isIncome ? 'bg-green-100 text-green-600  ' : 'bg-red-100 text-red-600  ';

    return (
        <div className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50  transition duration-150 ease-in-out group border-b border-gray-100  last:border-b-0">
            {/* Icon & Description */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className={`p-3 rounded-xl flex-shrink-0 ${iconBg}`}>
                    {icon}
                </div>
                <div className="flex flex-col truncate">
                    <span className="font-semibold text-gray-800  truncate">{transaction.description}</span>
                    <span className="text-sm text-gray-500  mt-0.5 capitalize">
                        {transaction.type}
                    </span>
                </div>
            </div>

            {/* Amount & Actions */}
            <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
                <span className={`font-bold text-lg whitespace-nowrap ${amountColor}`}>
                    {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                </span>

                {/* Actions (Hidden on mobile by default, shown on hover/focus) */}
                <div className="flex space-x-1 opacity-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onEdit(transaction)}
                        className="p-2 text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100  rounded-lg transition"
                        title="Edit Transaction"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(transaction.id)}
                        className="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100  rounded-lg transition"
                        title="Delete Transaction"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- 5. ADD/EDIT TRANSACTION MODAL ---

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (tx: Omit<Transaction, 'id'>, id?: string) => void;
    editingTx: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSave, editingTx }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<number | ''>('');
    const [type, setType] = useState<TransactionType>('expense');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (editingTx) {
            setDescription(editingTx.description);
            setAmount(editingTx.amount);
            setType(editingTx.type);
            setDate(editingTx.date);
        } else {
            setDescription('');
            setAmount('');
            setType('expense');
            // Set default date to today's date in YYYY-MM-DD format
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [editingTx, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || Number(amount) <= 0) return;
        onSave({ description, amount: Number(amount), type, date }, editingTx?.id);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">
            <div className="bg-white  rounded-xl shadow-2xl w-full max-w-lg transform scale-100 transition-all duration-300 border border-gray-100 ">
                <div className="flex justify-between items-center p-5 border-b ">
                    <h2 className="text-xl font-bold text-gray-800 ">
                        {editingTx ? 'Edit Transaction' : 'Add New Transaction'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600  p-1 rounded-full hover:bg-gray-100  transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Type Toggle */}
                    <div className="flex space-x-3 bg-gray-100 p-1 rounded-xl shadow-inner">
                        {['income', 'expense'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t as TransactionType)}
                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${type === t
                                    ? t === 'income' ? 'bg-green-500 text-white shadow-md' : 'bg-red-500 text-white shadow-md'
                                    : 'text-gray-700  hover:bg-white'
                                    }`}
                            >
                                {t === 'income' ? 'Income' : 'Expense'}
                            </button>
                        ))}
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700  mb-1">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., Grocery Shopping"
                            required
                            className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                        />
                    </div>
                    {/* Amount & Date */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700  mb-1">Amount ($)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value) || '')}
                                min="0.01"
                                step="0.01"
                                required
                                className="w-full px-4 py-2 border border-gray-300   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700  mb-1">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                            />
                        </div>
                    </div>
                    {/* Save Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 transform hover:scale-[1.01] active:scale-95"
                        >
                            <DollarSign className="w-5 h-5 mr-2" />
                            {editingTx ? 'Save Changes' : 'Add Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- 6. MAIN APP COMPONENT ---

export default function App() {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTx, setEditingTx] = useState<Transaction | null>(null);

    // State for List Filters
    const [filterSort, setFilterSort] = useState<FilterSortState>({
        typeFilter: 'all',
        sortBy: 'date',
        sortDirection: 'desc',
    });


    // --- Handlers ---

    const handleOpenModal = (tx: Transaction | null = null) => {
        setEditingTx(tx);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTx(null);
    };

    const handleSaveTransaction = (newTxData: Omit<Transaction, 'id'>, id?: string) => {
        if (id) {
            setTransactions(transactions.map(tx => tx.id === id ? { ...tx, ...newTxData } : tx));
        } else {
            // Use date field in ID for better mock data identification, though UUID is better practice
            const newId = crypto.randomUUID();
            setTransactions([{ ...newTxData, id: newId }, ...transactions]);
        }
    };

    const handleDeleteTransaction = (id: string) => {
        // Simple confirmation using a state-based message box would be better than window.confirm
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            setTransactions(transactions.filter(tx => tx.id !== id));
        }
    };

    const handleFilterChange = (type: TransactionType | 'all') => {
        setFilterSort(prev => ({ ...prev, typeFilter: type }));
    };

    const handleSortChange = (key: 'date' | 'amount') => {
        setFilterSort(prev => {
            const newDirection = prev.sortBy === key && prev.sortDirection === 'desc' ? 'asc' : 'desc';
            return {
                ...prev,
                sortBy: key,
                sortDirection: newDirection,
            };
        });
    };


    // 2. Transaction List Data (Filtered & Sorted)
    const filteredAndSortedTransactions = useMemo(() => {
        let list = transactions;

        // Filter
        if (filterSort.typeFilter !== 'all') {
            list = list.filter(tx => tx.type === filterSort.typeFilter);
        }

        // Sort
        return [...list].sort((a, b) => {
            let comparison = 0;

            if (filterSort.sortBy === 'date') {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                comparison = dateA - dateB;
            } else if (filterSort.sortBy === 'amount') {
                comparison = a.amount - b.amount;
            }

            // Apply direction
            return filterSort.sortDirection === 'asc' ? comparison : -comparison;
        });
    }, [transactions, filterSort]);

    // 3. Grouping for Timeline Display
    const groupedTransactions = useMemo(() => {
        return filteredAndSortedTransactions.reduce((groups, transaction) => {
            const date = transaction.date;
            if (!groups[date]) groups[date] = [];
            groups[date].push(transaction);
            return groups;
        }, {} as Record<string, Transaction[]>);
    }, [filteredAndSortedTransactions]);

    const sortedDates = useMemo(() => {
        const dates = Object.keys(groupedTransactions);
        // Date sorting direction should always match the date sort direction applied to the list
        const direction = filterSort.sortDirection;

        return dates.sort((a, b) => {
            const timeA = new Date(a).getTime();
            const timeB = new Date(b).getTime();
            const comparison = timeA - timeB;
            return direction === 'asc' ? comparison : -comparison;
        });
    }, [groupedTransactions, filterSort.sortDirection]);

    return (
        <div className="min-h-screen bg-gray-50  font-sans transition-colors duration-300">
            <div className="">

                {/* Header and Controls */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 ">
                        Finance Tracker
                    </h1>
                    <div className="flex items-center space-x-3">

                        <button
                            onClick={() => handleOpenModal()}
                            className="px-4 py-2 flex items-center bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-150 transform active:scale-95"
                        >
                            <Plus className="w-5 h-5 mr-1" />
                            New Transaction
                        </button>
                    </div>
                </header>

                {/* Transaction History Section */}
                <div className="bg-white  rounded-xl shadow-2xl p-4 sm:p-6 border border-gray-100 ">

                    {/* Filter and Sort Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100  pb-4">
                        <h2 className="text-xl font-bold text-gray-800  mb-3 sm:mb-0">
                            Transaction History
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {/* Filter Buttons */}
                            <div className="flex space-x-1 p-1 bg-gray-100  rounded-xl shadow-inner">
                                {['all', 'income', 'expense'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => handleFilterChange(type as TransactionType | 'all')}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center transition duration-150 ${filterSort.typeFilter === type
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-gray-700  hover:bg-white'
                                            }`}
                                    >
                                        <Filter className="w-4 h-4 mr-1" />
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>

                            {/* Sort Buttons */}
                            <div className="flex space-x-2">
                                {['date', 'amount'].map(key => (
                                    <button
                                        key={key}
                                        onClick={() => handleSortChange(key as 'date' | 'amount')}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-lg flex items-center transition duration-150 border ${filterSort.sortBy === key
                                            ? 'bg-blue-100  border-blue-300  text-blue-800 '
                                            : 'bg-white  border-gray-200  text-gray-600  hover:bg-gray-100 '
                                            }`}
                                    >
                                        <SortAsc className={`w-4 h-4 mr-1 transition-transform ${filterSort.sortBy === key && filterSort.sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                                        Sort {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Transaction Timeline / List */}
                    <div className="space-y-6">
                        {filteredAndSortedTransactions.length > 0 ? (
                            sortedDates.map(dateKey => (
                                // This is the new Timeline Grouping element, which replaces the fixed-height card.
                                <div key={dateKey} className="bg-white ">
                                    {/* Date Header */}
                                    <div className="sticky top-0 z-10 bg-gray-50  px-4 py-2 mb-2 rounded-lg shadow-sm flex items-center space-x-2 text-md font-bold text-gray-700  border-l-4 border-blue-500">
                                        <Calendar className="w-5 h-5 text-blue-500" />
                                        <span>{formatDate(dateKey)}</span>
                                    </div>

                                    {/* List of Transactions for that Date */}
                                    <div className="bg-white  rounded-xl shadow-md divide-y divide-gray-100  border border-gray-200 ">
                                        {groupedTransactions[dateKey].map(tx => (
                                            <TransactionItem
                                                key={tx.id}
                                                transaction={tx}
                                                onEdit={handleOpenModal}
                                                onDelete={handleDeleteTransaction}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-gray-500  bg-gray-50  rounded-xl border border-dashed border-gray-300 ">
                                <Filter className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                                <p className="text-lg font-medium">No transactions found</p>
                                <p className="text-sm">Try adjusting your filters or adding a new record.</p>
                                <button
                                    onClick={() => handleFilterChange('all')}
                                    className="mt-4 text-blue-600 hover:text-blue-800   font-medium underline underline-offset-2"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="mt-8 flex justify-between items-center pt-4 border-t border-gray-100">
                        <button
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                        </button>

                        <span className="text-sm font-medium text-gray-700">
                            Page <span className="font-bold">1</span> of <span className="font-bold">3</span>
                        </span>

                        <button
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTransaction}
                editingTx={editingTx}
            />
        </div>
    );
}