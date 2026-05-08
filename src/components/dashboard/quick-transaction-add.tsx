'use client'
import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { baseUrl } from "@/utils/api-url";

interface QuickTransactionAddProps {
    onSuccess?: () => void;
}

const QuickTransactionAdd: React.FC<QuickTransactionAddProps> = ({ onSuccess }) => {
    const [type, setType] = useState<'income' | 'expense' | 'donation'>('expense');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputStyle = "w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !description) return;

        setIsSubmitting(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            const res = await fetch(`${baseUrl}/transactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    description,
                    type,
                    date: today
                }),
                credentials: 'include'
            });

            const result = await res.json();
            if (result.success) {
                setAmount('');
                setDescription('');
                onSuccess?.();
            } else {
                alert(result.message || 'Failed to record transaction');
            }
        } catch (error) {
            alert('Connection error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white shadow-xl overflow-hidden p-2">


            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Quick Record</h3>
                    <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">New Transaction</p>
                </div>

                <div className="flex p-1 bg-gray-100 rounded-xl gap-1">
                    <button
                        type="button"
                        onClick={() => setType('income')}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                            type === 'income' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('expense')}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                            type === 'expense' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('donation')}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                            type === 'donation' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'
                        }`}
                    >
                        Donation
                    </button>
                </div>


                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Amount ($)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className={inputStyle}
                            required
                            min="0.01"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What's this for?"
                            className={inputStyle}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin mr-2" size={20} />
                    ) : (
                        <Plus className="w-5 h-5 mr-2" />
                    )}
                    Record Transaction
                </button>
            </form>
        </div>
    );

};

export default QuickTransactionAdd;