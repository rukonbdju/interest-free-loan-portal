import { Payment } from "@/types"
import { formatDate } from "@/utils/date-format";
import AddPayment from "./add-payment";
type PropsType = {
    borrowerId: string;
    loanId: string;
    payments: Payment[];
    totalAmount: number;
    currency: string;
}

const PaymentHistory = ({ borrowerId, loanId, payments = [], totalAmount = 0, currency }: PropsType) => {
    return (
        <div className="bg-white  rounded-xl shadow-md border border-gray-200 ">
            <div className='flex gap-2 justify-between items-center p-6 border-b border-gray-200 '>
                <h2 className="text-lg font-semibold text-gray-800">
                    Payment History
                </h2>
                <AddPayment borrowerId={borrowerId} loanId={loanId} />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments?.map((payment) => (
                            <tr key={payment._id} className="bg-white  hover:bg-gray-50 ">
                                <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">{formatDate(payment?.paymentDate || "")}</td>
                                <td className="px-6 py-4 font-semibold text-green-600 ">{payment.paymentAmount} {currency}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">

                                        <span>{payment.paymentMethod}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {payments?.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-10 text-gray-500">No payments have been made yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default PaymentHistory;