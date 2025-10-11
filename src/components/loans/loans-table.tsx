'use client'
import { useLoans } from "@/contexts/loan-context";
import { formatDate } from "@/utils/date-format";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteLoan from "./delete-loan";

const LoansTable = () => {
    const { loans } = useLoans()
    console.log(loans)
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Loan ID
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Borrower
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Amount
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Disbursement Method
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Disbursement Date
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Due Date
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Status
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loans.length > 0 ? (
                        loans.map((loan) => (
                            <tr key={loan._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {loan.loanId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {loan?.borrower?.name} ({loan?.borrower?.borrowerId})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {loan.amount} {loan.currency}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {loan?.disbursementMethod}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(loan?.disbursementDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(loan?.dueDate)}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 `}
                                    >
                                        {'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <div className="">
                                        <div className="flex items-center justify-end">
                                            <Link title='View' className=" text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-100 p-1 rounded-full" href={"/loans/" + loan._id}>
                                                <Eye size={18} />
                                            </Link>
                                            <Link
                                                className="text-gray-500 hover:text-gray-900 transition-colors hover:bg-gray-100 p-1 rounded-full"
                                                href={`/loans/${loan._id}/edit`}
                                                title="Edit"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <DeleteLoan id={loan._id} />
                                        </div>
                                    </div>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                No loans found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default LoansTable;