import { useLoanPayment } from "@/contexts/loan-payment-context";
import { formatDate } from "@/utils/date-format";
import { Calendar, HandCoins, Wallet } from "lucide-react";

const LoanInfoCard = () => {
    const { loan } = useLoanPayment()
    return (
        <div className="bg-white  rounded-xl shadow-md p-6 border border-gray-200 ">

            <ul className="space-y-4">
                <li className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-green-100  rounded-full flex items-center justify-center">
                        <Wallet size={16} className="text-green-600 " />
                    </div>
                    <div>
                        <p className="font-medium text-gray-700 ">Total Amount</p>
                        <p className="text-sm text-gray-500 ">{loan?.amount} {loan?.currency}</p>
                    </div>
                </li>
                <li className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-violet-100  rounded-full flex items-center justify-center">
                        <HandCoins size={16} className="text-violet-600 " />
                    </div>
                    <div>
                        <p className="font-medium text-gray-700 ">Disbursement Method</p>
                        <p className="text-sm text-gray-500 ">{loan?.disbursementMethod}</p>
                    </div>
                </li>
                <li className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-blue-100  rounded-full flex items-center justify-center">
                        <Calendar size={16} className="text-blue-600 " />
                    </div>
                    <div>
                        <p className="font-medium text-gray-700 ">Disbursement Date</p>
                        <p className="text-sm text-gray-500 ">{formatDate(loan?.disbursementDate || "")}</p>
                    </div>
                </li>
                <li className="flex items-center gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-red-100  rounded-full flex items-center justify-center">
                        <Calendar size={16} className="text-red-600 " />
                    </div>
                    <div>
                        <p className="font-medium text-gray-700 ">Final Payment Due</p>
                        <p className="text-sm text-gray-500 ">{formatDate(loan?.dueDate || "")}</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default LoanInfoCard;