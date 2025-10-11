import { formatDate } from "@/utils/date-format";
import AddPayment from "./add-payment";
import { useLoanPayment } from "@/contexts/loan-payment-context";
import DeletePayment from "./delete-payment";
import EditPayment from "./edit-payment";

const PaymentHistory = () => {
    const { loan } = useLoanPayment()
    return (
        <div className="bg-white  rounded-xl shadow-md border border-gray-200 pb-6">
            <div className='flex gap-2 justify-between items-center p-6 border-b border-gray-200 '>
                <h2 className="text-lg font-semibold text-gray-800">
                    Payment History
                </h2>
                <AddPayment />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Method</th>
                            <th scope="col" className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loan?.payments?.map((payment) => (
                            <tr key={payment._id} className={`border-t border-gray-200 `}>
                                <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">{formatDate(payment?.paymentDate || "")}</td>
                                <td className="px-6 py-4 font-semibold text-green-600 ">{payment.paymentAmount} {loan?.currency}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-violet-500 px-2 bg-violet-100 rounded">{payment.paymentMethod}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <EditPayment id={payment._id} />
                                        <DeletePayment id={payment._id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {loan?.payments?.length === 0 && (
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