'use client'
import { useFetchData } from "@/hooks/useFetchData"
import { formatDate } from "@/utils/date-format";
import Pagination from "../shared/pagination";
import { Search } from "lucide-react";
type PaginationDTO = {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
}
type PaymentDTO = {
    paymentAmount: number;
    loanAmount: number;
    paymentMethod: number;
    paymentDate: string;
    borrower: string;
    borrowerId: string;
    loanId: string;
}

const PaymentTable = () => {
    const { data } = useFetchData<{ pagination: PaginationDTO, payments: PaymentDTO[] }>('/payments')
    console.log(data)
    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={20} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, phone, or ID..."
                        className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Borrower</th>
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Loan</th>
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Amount</th>
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Date</th>
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.payments && data.payments.map((payment, index) => (
                            <tr className="py-4 px-6 text-sm font-medium text-slate-900 border-b border-b-gray-200" key={index}>
                                <td className="py-4 px-6 text-sm font-medium text-slate-900">
                                    <div>{payment.borrower}</div>
                                    <div className="text-xs text-slate-500">
                                        {payment.borrowerId}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-slate-900">
                                    <div>{payment.loanId}</div>
                                    <div className="text-xs text-slate-500">
                                        ৳{payment.loanAmount}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-teal-500 font-medium">
                                    ৳{payment.paymentAmount}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-slate-900">
                                    {formatDate(payment.paymentDate)}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-slate-900">
                                    <span className="bg-orange-100 px-2 rounded text-orange-500">{payment.paymentMethod}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    {data?.pagination && <Pagination totalPages={data.pagination.totalPages} page={data.pagination.page} onPageChange={(v) => console.log(v)} />}
                </div>
            </div>
        </div>
    )
}

export default PaymentTable