'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { 
    Clock, TrendingUp, TrendingDown, Loader2, ArrowRight, Heart
} from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { baseUrl } from '@/utils/api-url';
import Link from 'next/link';

interface Transaction {
    _id: string;
    description: string;
    amount: number;
    type: 'income' | 'expense' | 'donation';
    date: string;
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
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

            <div className="text-right flex-shrink-0">
                <p className={`font-bold text-sm sm:text-lg whitespace-nowrap ${
                    isIncome ? 'text-emerald-600' : isDonation ? 'text-amber-600' : 'text-rose-600'
                }`}>
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
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white shadow-xl overflow-hidden p-2">


            <div className="p-6 md:p-8 space-y-4">
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
        </div>
    );

};

export default TodaysTransactions;
