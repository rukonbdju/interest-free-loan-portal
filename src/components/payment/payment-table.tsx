'use client'
import { useFetchData } from "@/hooks/useFetchData"
import { formatDate } from "@/utils/date-format";
import Link from "next/link";
import { Button } from "../shared/button";
import Pagination from "../shared/pagination";
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
                                    {payment.borrower}
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