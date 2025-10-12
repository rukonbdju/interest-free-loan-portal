import { useFetchData } from "@/hooks/useFetchData";
import { Payment } from "@/types";
import { formatDate } from "@/utils/date-format";

const PaymentHistory = ({ id }: { id: string }) => {
    const { data: paymentHistory } = useFetchData<Payment[]>(`/payments/borrower/${id}`)
    return (
        <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Payment History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Loan ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount Paid</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory && paymentHistory.map((payment, index) => (
                            <tr key={index} className="bg-white border-b border-b-gray-200">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{payment?.loan?.loanId}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(payment.paymentDate)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{payment.paymentAmount} {payment.loan.currency}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    <span className="bg-violet-100 text-violet-500 px-2 rounded font-semibold">{payment.paymentMethod}</span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentHistory;