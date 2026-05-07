'use client'
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    Plus, X, Calendar,
    ChevronRight, ChevronLeft, TrendingUp, TrendingDown, Wallet,
    Clock, Edit2, Trash2, Loader2
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { baseUrl } from '@/utils/api-url';

// --- TYPES ---
type TransactionType = 'income' | 'expense';

interface Transaction {
    _id: string; // MongoDB uses _id
    description: string;
    amount: number;
    type: TransactionType;
    date: string;
}

// --- HELPERS ---
const getTodayDate = () => new Date().toISOString().split('T')[0];

const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const today = getTodayDate();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (dateString === today) return 'Today';
    if (dateString === yesterdayStr) return 'Yesterday';

    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

// --- COMPONENTS ---

const TransactionItem: React.FC<{
    transaction: Transaction;
    onEdit: (tx: Transaction) => void;
    onDelete: (id: string) => void;
}> = ({ transaction, onEdit, onDelete }) => {
    const isIncome = transaction.type === 'income';

    return (
        <div className="group relative bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300 font-sans">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                    {isIncome ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> {isIncome ? 'Income Source' : 'Expense Category'}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className={`font-bold text-lg ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </p>
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => onEdit(transaction)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button 
                        onClick={() => onDelete(transaction._id)}
                        className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const TransactionModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (tx: Partial<Transaction>, id?: string) => Promise<void>;
    editingTx: Transaction | null;
    defaultType: TransactionType;
    selectedDate: string;
}> = ({ isOpen, onClose, onSave, editingTx, defaultType, selectedDate }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<string>('');
    const [type, setType] = useState<TransactionType>(defaultType);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (editingTx) {
            setDescription(editingTx.description);
            setAmount(editingTx.amount.toString());
            setType(editingTx.type);
        } else {
            setDescription('');
            setAmount('');
            setType(defaultType);
        }
    }, [editingTx, defaultType, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount) return;
        setIsSaving(true);
        try {
            await onSave({ 
                description, 
                amount: parseFloat(amount), 
                type, 
                date: selectedDate 
            }, editingTx?._id);
            onClose();
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">
                        {editingTx ? 'Edit' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="flex p-1 bg-gray-100 rounded-2xl">
                        {(['income', 'expense'] as TransactionType[]).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    type === t 
                                    ? t === 'income' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-rose-500 text-white shadow-lg'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What's this for?"
                                className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                autoFocus
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-700 ml-1">Amount</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    step="0.01"
                                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-semibold text-lg"
                                    required
                                />
                            </div>
                        </div>
                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                            <Calendar size={20} className="text-blue-500" />
                            <div className="text-sm">
                                <p className="text-blue-600 font-semibold">Date</p>
                                <p className="text-blue-800">{formatDateDisplay(selectedDate)}</p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                            type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                        } disabled:opacity-70`}
                    >
                        {isSaving && <Loader2 className="animate-spin" size={20} />}
                        {editingTx ? 'Update' : 'Save'} Transaction
                    </button>
                </form>
            </div>
        </div>
    );
};

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<TransactionType>('expense');
    const [editingTx, setEditingTx] = useState<Transaction | null>(null);

    const fetchTransactions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`${baseUrl}/transactions?date=${selectedDate}`, {
                credentials: 'include'
            });
            const result = await res.json();
            if (result.success) {
                setTransactions(result.data);
            } else {
                setError(result.message || 'Failed to fetch transactions');
            }
        } catch (err) {
            setError('Failed to connect to the server');
        } finally {
            setLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Summary logic
    const summary = useMemo(() => {
        return transactions.reduce((acc, curr) => {
            if (curr.type === 'income') acc.income += curr.amount;
            else acc.expense += curr.amount;
            return acc;
        }, { income: 0, expense: 0 });
    }, [transactions]);

    // Handlers
    const changeDate = (offset: number) => {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + offset);
        setSelectedDate(date.toISOString().split('T')[0]);
    };

    const handleOpenAdd = (type: TransactionType) => {
        setModalType(type);
        setEditingTx(null);
        setIsModalOpen(true);
    };

    const handleEdit = (tx: Transaction) => {
        setModalType(tx.type);
        setEditingTx(tx);
        setIsModalOpen(true);
    };

    const handleSave = async (txData: Partial<Transaction>, id?: string) => {
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${baseUrl}/transactions/${id}` : `${baseUrl}/transactions`;
            
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(txData),
                credentials: 'include'
            });
            const result = await res.json();
            if (result.success) {
                fetchTransactions();
            } else {
                alert(result.message || 'Failed to save transaction');
            }
        } catch (err) {
            alert('An error occurred while saving');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this transaction?')) return;
        try {
            const res = await fetch(`${baseUrl}/transactions/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const result = await res.json();
            if (result.success) {
                fetchTransactions();
            } else {
                alert(result.message || 'Failed to delete transaction');
            }
        } catch (err) {
            alert('An error occurred while deleting');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20 font-sans">
            {/* Header & Date Navigation */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-4 h-20 flex items-center justify-between">
                    <button 
                        onClick={() => changeDate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="text-center group cursor-pointer" onClick={() => setSelectedDate(getTodayDate())}>
                        <h1 className="text-lg font-bold text-gray-900 flex items-center justify-center gap-2">
                            {formatDateDisplay(selectedDate)}
                            <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-normal underline font-sans">Reset</span>
                        </h1>
                        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Daily Transactions</p>
                    </div>

                    <button 
                        onClick={() => changeDate(1)}
                        className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8 space-y-8">
                {/* Daily Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-600 rounded-[2rem] p-6 text-white shadow-xl shadow-emerald-200/50 relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-emerald-100 text-sm font-semibold mb-1">Income</p>
                            <h2 className="text-2xl font-bold">{formatCurrency(summary.income)}</h2>
                        </div>
                        <TrendingUp className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-emerald-500/30 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div className="bg-rose-600 rounded-[2rem] p-6 text-white shadow-xl shadow-rose-200/50 relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-rose-100 text-sm font-semibold mb-1">Expenses</p>
                            <h2 className="text-2xl font-bold">{formatCurrency(summary.expense)}</h2>
                        </div>
                        <TrendingDown className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-rose-500/30 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div className="bg-white rounded-[2rem] p-6 text-gray-900 border border-gray-100 shadow-xl shadow-gray-200/30 relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-gray-500 text-sm font-semibold mb-1">Net Balance</p>
                            <h2 className={`text-2xl font-bold ${summary.income - summary.expense >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {formatCurrency(summary.income - summary.expense)}
                            </h2>
                        </div>
                        <Wallet className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-gray-100 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex gap-4">
                    <button 
                        onClick={() => handleOpenAdd('income')}
                        className="flex-1 bg-white border-2 border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50 py-4 rounded-2xl flex items-center justify-center gap-2 text-emerald-700 font-bold transition-all shadow-sm group font-sans"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <Plus size={20} />
                        </div>
                        Add Income
                    </button>
                    <button 
                        onClick={() => handleOpenAdd('expense')}
                        className="flex-1 bg-white border-2 border-rose-100 hover:border-rose-500 hover:bg-rose-50 py-4 rounded-2xl flex items-center justify-center gap-2 text-rose-700 font-bold transition-all shadow-sm group font-sans"
                    >
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <Plus size={20} />
                        </div>
                        Add Expense
                    </button>
                </div>

                {/* Transaction List */}
                <div className="space-y-4 font-sans">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Today's History</h2>
                        {!loading && (
                            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {transactions.length} Items
                            </span>
                        )}
                    </div>

                    <div className="space-y-3 min-h-[200px]">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="animate-spin text-blue-500" size={40} />
                                <p className="text-gray-500 font-medium">Loading transactions...</p>
                            </div>
                        ) : error ? (
                            <div className="py-20 text-center bg-rose-50 rounded-[2rem] border border-rose-100 text-rose-600">
                                <p className="font-bold">Error loading data</p>
                                <p className="text-sm">{error}</p>
                                <button onClick={fetchTransactions} className="mt-4 underline">Try again</button>
                            </div>
                        ) : transactions.length > 0 ? (
                            transactions.map(tx => (
                                <TransactionItem 
                                    key={tx._id} 
                                    transaction={tx} 
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="text-gray-300" size={40} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">No transactions yet</h3>
                                <p className="text-gray-500 text-sm">Start tracking by adding your first record.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingTx={editingTx}
                defaultType={modalType}
                selectedDate={selectedDate}
            />
        </div>
    );
}