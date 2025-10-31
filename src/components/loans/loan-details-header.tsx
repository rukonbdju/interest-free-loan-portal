import { useLoanPayment } from "@/contexts/loan-payment-context";
import { formatDate } from "@/utils/date-format";
import { FilePenLine, List } from "lucide-react";
import Link from "next/link";

const LoanDetailsHeader = () => {
    const { loan } = useLoanPayment()
    return (
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 ">Loan Details</h1>
                <p className="text-sm text-gray-500 ">ID: {loan?.loanId} | Created at {formatDate(loan?.createdAt || "")} </p>
            </div>
            <div className="flex items-center gap-3">
                <Link href={`/loans/${loan?._id}/edit`} className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 ">
                    <FilePenLine size={20} />
                </Link>
                <Link href={`/loans`}>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                        <List size={18} />
                        Loan List
                    </button>
                </Link>

            </div>
        </header>
    )
}

export default LoanDetailsHeader;