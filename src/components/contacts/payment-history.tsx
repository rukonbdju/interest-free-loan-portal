'use client'
import { useFetchData } from "@/hooks/useFetchData";
import { Payment } from "@/types";
import { formatDate } from "@/utils/date-format";
import { Receipt, Calendar, CreditCard, ArrowDownRight } from "lucide-react";

const PaymentHistory = ({ id }: { id: string }) => {
    const { data: paymentHistory, loading } = useFetchData<Payment[]>(`/payments/contact/${id}`)

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                        <Receipt size={20} />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Repayment Logs</h2>
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-full">
                    {paymentHistory?.length || 0} Records
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
                            <th className="px-6 py-2 text-left">Ref. Loan ID</th>
                            <th className="px-6 py-2 text-left">Payment Date</th>
                            <th className="px-6 py-2 text-left">Amount Received</th>
                            <th className="px-6 py-2 text-right">Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                             <tr>
                                <td colSpan={4} className="py-20 text-center">
                                    <div className="w-10 h-10 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                                </td>
                            </tr>
                        ) : paymentHistory && paymentHistory.length > 0 ? (
                            paymentHistory.map((payment, index) => (
                                <tr key={index} className="group bg-white hover:bg-emerald-50/50 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md">
                                    <td className="px-6 py-5 first:rounded-l-2xl">
                                        <p className="text-sm font-black text-indigo-600 tracking-tight">{payment?.loan?.loanId}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Calendar size={14} className="text-gray-300" />
                                            <span className="text-xs font-bold">{formatDate(payment.paymentDate)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                                                <ArrowDownRight size={14} />
                                            </div>
                                            <span className="text-sm font-black text-gray-800">
                                                {payment.paymentAmount.toLocaleString()} 
                                                <span className="text-[10px] text-gray-400 ml-1">{payment?.loan?.currency}</span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 last:rounded-r-2xl text-right">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                            <CreditCard size={10} />
                                            {payment.paymentMethod}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-20 text-center text-gray-400 font-bold italic">
                                    No repayment logs found for this contact.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentHistory;