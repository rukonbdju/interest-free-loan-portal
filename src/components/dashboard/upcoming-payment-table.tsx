'use client'
import { useFetchData } from "@/hooks/useFetchData"
import { formatDate } from "@/utils/date-format";
import { CheckCircle, TrendingUp, TriangleAlert } from "lucide-react";
type UpcomingPaymentType = {
    id: null;
    borrower: string;
    dueDate: string;
    amount: number;
    status: string;
}

const Status = ({ status }: { status: string; }) => {
    if (status == "Active") {
        return <span className='inline-flex gap-2 items-center font-semibold  text-blue-500 px-2 rounded-2xl'>
            <TrendingUp size={16} /> Active
        </span>
    }
    if (status == "Paid") {
        return <span className='inline-flex gap-2 items-center font-semibold  text-green-500 px-2 rounded-2xl'>
            <CheckCircle size={16} /> Paid
        </span>
    }
    if (status == "Overdue") {
        return <span className='inline-flex gap-2 items-center font-semibold text-red-500 px-2 rounded-2xl'>
            <TriangleAlert size={16} /> Overdue
        </span>
    }

    return <span className='inline-flex gap-2 items-center font-semibold  text-blue-500 px-2 rounded-2xl'>
        <TrendingUp size={16} /> Active
    </span>
}

const UpcomingPaymentTable = () => {
    const { data } = useFetchData<UpcomingPaymentType[]>('/loans/upcoming-payments')
    console.log(data)
    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Upcoming Payments</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/80">
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Borrower</th>
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Due Date</th>
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Amount</th>
                            <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((payment, index) => (
                            <tr key={index} className="border-b border-slate-200/70 last:border-b-0 hover:bg-slate-50/50">
                                <td className="py-4 px-6 text-sm font-medium text-slate-900">{payment.borrower}</td>
                                <td className="py-4 px-6 text-sm text-slate-600">{formatDate(payment.dueDate)}</td>
                                <td className="py-4 px-6 text-sm font-semibold text-slate-800">{payment.amount}</td>
                                <td className="py-4 px-6 text-sm">
                                    <Status status={payment.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UpcomingPaymentTable