'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { 
    Clock, TrendingUp, TrendingDown, Loader2, ArrowRight
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { baseUrl } from '@/utils/api-url';
import Link from 'next/link';

interface Transaction {
    _id: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isIncome = transaction.type === 'income';

    return (
        <div className="group relative bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300">
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

            <div className="text-right">
                <p className={`font-bold text-lg ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isIncome ? '+' : '-'} {formatCurrency(transaction.amount)}
                </p>
            </div>
        </div>
    );
};

const TodaysTransactions = ({ refreshKey = 0 }: { refreshKey?: number }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        try {
            const today = new Date().toISOString().split('T')[0];
            const res = await fetch(`${baseUrl}/transactions?date=${today}`, {
                credentials: 'include'
            });
            const result = await res.json();
            if (result.success) {
                setTransactions(result.data);
            } else {
                setError(result.message || 'Failed to fetch');
            }
        } catch (err) {
            setError('Failed to connect');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions, refreshKey]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Today's Transactions</h2>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Daily Overview</p>
                </div>
                <Link 
                    href="/transactions" 
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                    View All <ArrowRight size={16} />
                </Link>
            </div>

            <div className="space-y-3 min-h-[100px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-2 bg-white rounded-3xl border border-gray-100">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                        <p className="text-gray-500 text-sm font-medium">Updating...</p>
                    </div>
                ) : error ? (
                    <div className="py-10 text-center bg-rose-50 rounded-3xl border border-rose-100 text-rose-600 text-sm">
                        <p className="font-bold">Error loading today's data</p>
                        <button onClick={fetchTransactions} className="mt-2 underline">Retry</button>
                    </div>
                ) : transactions.length > 0 ? (
                    transactions.map(tx => (
                        <TransactionItem key={tx._id} transaction={tx} />
                    ))
                ) : (
                    <div className="py-12 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">No transactions today</h3>
                        <p className="text-gray-500 text-xs">Your daily history will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodaysTransactions;
