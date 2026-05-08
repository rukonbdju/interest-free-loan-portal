'use client'
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
    Plus, X, Calendar,
    ChevronRight, ChevronLeft, TrendingUp, TrendingDown, Wallet,
    Clock, Edit2, Trash2, Loader2, Heart
} from 'lucide-react';

import { formatCurrency } from '@/utils/formatCurrency';
import { baseUrl } from '@/utils/api-url';
import StatCard from '@/components/dashboard/stat-card';


// --- TYPES ---
type TransactionType = 'income' | 'expense' | 'donation';

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
    const isDonation = transaction.type === 'donation';

    const getIcon = () => {
        if (isIncome) return <TrendingUp size={24} />;
        if (isDonation) return <Heart size={24} />;
        return <TrendingDown size={24} />;
    };

    const getColors = () => {
        if (isIncome) return 'bg-emerald-50 text-emerald-600';
        if (isDonation) return 'bg-amber-50 text-amber-600';
        return 'bg-rose-50 text-rose-600';
    };

    const getLabel = () => {
        if (isIncome) return 'Income Source';
        if (isDonation) return 'Donation Support';
        return 'Expense Category';
    };

    return (
        <div className="group relative bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${getColors()}`}>
                    {getIcon()}
                </div>
                <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate pr-2" title={transaction.description}>
                        {transaction.description}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} className="flex-shrink-0" /> {getLabel()}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
                <div className="text-right">
                    <p className={`font-bold text-sm sm:text-lg whitespace-nowrap ${
                        isIncome ? 'text-emerald-600' : isDonation ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                        {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </p>
                </div>
                
                <div className="flex gap-1">
                    <button 
                        onClick={() => onEdit(transaction)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors opacity-40 group-hover:opacity-100"
                        title="Edit"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button 
                        onClick={() => onDelete(transaction._id)}
                        className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors opacity-40 group-hover:opacity-100"
                        title="Delete"
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
                    <div className="flex p-1 bg-gray-100 rounded-2xl gap-1">
                        {(['income', 'expense', 'donation'] as TransactionType[]).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setType(t)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    type === t 
                                    ? t === 'income' ? 'bg-emerald-500 text-white shadow-lg' 
                                      : t === 'donation' ? 'bg-amber-500 text-white shadow-lg'
                                      : 'bg-rose-500 text-white shadow-lg'
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
                            type === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' 
                            : type === 'donation' ? 'bg-amber-600 hover:bg-amber-700'
                            : 'bg-rose-600 hover:bg-rose-700'
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
            else if (curr.type === 'donation') acc.donation += curr.amount;
            else acc.expense += curr.amount;
            return acc;
        }, { income: 0, expense: 0, donation: 0 });
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
        <div className="min-h-screen font-sans">
            <div className="space-y-6 mt-2">



                {/* Daily Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <StatCard 
                        title="Income" 
                        value={formatCurrency(summary.income)} 
                        color="emerald" 
                        icon={<TrendingUp size={20} />} 
                        subtitle="Daily total"
                    />
                    <StatCard 
                        title="Expenses" 
                        value={formatCurrency(summary.expense)} 
                        color="rose" 
                        icon={<TrendingDown size={20} />} 
                        subtitle="Daily total"
                    />
                    <StatCard 
                        title="Donation" 
                        value={formatCurrency(summary.donation)} 
                        color="amber" 
                        icon={<Heart size={20} />} 
                        subtitle="Daily total"
                    />
                    <StatCard 
                        title="Net Flow" 
                        value={formatCurrency(summary.income - summary.expense - summary.donation)} 
                        color={summary.income - summary.expense - summary.donation >= 0 ? 'emerald' : 'rose'} 
                        icon={<Wallet size={20} />} 
                        subtitle="Daily balance"
                    />
                </div>


                {/* Quick Action Buttons */}
                <div className="grid grid-cols-3 gap-3">
                    <AddButton type="income" color="emerald" onClick={() => handleOpenAdd('income')} />
                    <AddButton type="expense" color="rose" onClick={() => handleOpenAdd('expense')} />
                    <AddButton type="donation" color="amber" onClick={() => handleOpenAdd('donation')} />
                </div>


                {/* Transaction List */}
                <div className="space-y-4 font-sans">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => changeDate(-1)}
                                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all active:scale-90"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            
                            <div className="cursor-pointer group" onClick={() => setSelectedDate(getTodayDate())}>
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    {formatDateDisplay(selectedDate)}'s History
                                    <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold underline decoration-2 underline-offset-2">Today</span>
                                </h2>
                                <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Daily Logs</p>
                            </div>

                            <button 
                                onClick={() => changeDate(1)}
                                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all active:scale-90"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {!loading && (
                            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 self-start sm:self-center">
                                {transactions.length} Records Found
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
                            <div className="py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-300">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">No transactions yet</h3>
                                <p className="text-gray-500 text-xs">Start tracking by adding your first record.</p>
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

// --- SUB-COMPONENTS ---

const AddButton = ({ type, color, onClick }: { type: TransactionType, color: 'emerald' | 'rose' | 'amber', onClick: () => void }) => {

    const borders = {
        emerald: 'border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-700',
        rose: 'border-rose-100 hover:border-rose-500 hover:bg-rose-50 text-rose-700',
        amber: 'border-amber-100 hover:border-amber-500 hover:bg-amber-50 text-amber-700'
    };
    const iconBgs = {
        emerald: 'bg-emerald-100 group-hover:bg-emerald-500',
        rose: 'bg-rose-100 group-hover:bg-rose-500',
        amber: 'bg-amber-100 group-hover:bg-amber-500'
    };

    return (
        <button 
            onClick={onClick}
            className={`flex-1 bg-white border-2 ${borders[color]} py-2.5 sm:py-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-2 font-bold transition-all shadow-sm group`}
        >
            <div className={`w-7 h-7 rounded-full ${iconBgs[color]} flex items-center justify-center group-hover:text-white transition-colors`}>
                <Plus size={16} />
            </div>
            <span className="text-[11px] sm:text-xs">Add {type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </button>
    );
};