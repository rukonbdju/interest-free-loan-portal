import { useFetchData } from "@/hooks/useFetchData";
import { Loan } from "@/types";
import { formatDate } from "@/utils/date-format";
import Link from "next/link";

const LoanHistory = ({ id }: { id: string }) => {
    const { data: loanHistory } = useFetchData<Loan[]>(`/loans/borrower/${id}`)
    return (
        <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Loan History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Loan ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Start Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Due Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Remaining Balance</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loanHistory && loanHistory.map((loan, index) => (
                            <tr key={index} className="bg-white">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{loan.loanId}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">${loan.amount.toLocaleString()}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(loan.disbursementDate)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(loan.dueDate)}</td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${false ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {"Active"}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">${0}</td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <Link href={`/loans/${loan._id}`} className="text-indigo-600 hover:text-indigo-900">
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoanHistory;