import { useLoanPayment } from "@/contexts/loan-payment-context";
import { formatDate } from "@/utils/date-format";
import { Calendar, CheckCircle, Clock, TrendingUp, TriangleAlert, Wallet } from "lucide-react";
import { useMemo } from "react";

// Calculates days remaining until the end date
const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date(); // Use current date for countdown
    const diffTime = end.getTime() - now.getTime();
    if (diffTime < 0) return -1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const LoanOverviewCard = () => {
    const { loan } = useLoanPayment()
    const balance = useMemo(() => {
        const totalPaid = loan?.payments.reduce((total, payment) => total + payment.paymentAmount, 0) || 0
        const remainingBalance = loan?.amount ? loan.amount - totalPaid : 0;
        const progressPercentage = loan?.amount ? (totalPaid / loan.amount) * 100 : 0;
        const remainingDays = getDaysRemaining(loan?.dueDate || '');
        return { totalPaid, remainingBalance, progressPercentage, remainingDays }
    }, [loan])
    return (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 ">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-sm text-gray-500 ">Remaining Balance</p>
                    <p className="text-4xl font-bold text-gray-800 ">{balance.remainingBalance}</p>
                </div>
                {
                    balance.remainingBalance === 0 && <span className='flex gap-2 items-center font-bold bg-blue-100 text-green-500 px-2 rounded-2xl'>
                        <CheckCircle size={16} /> Paid
                    </span>
                }
                {
                    (balance.remainingBalance > 0 && balance.remainingDays >= 0) && <span className='flex gap-2 items-center font-bold bg-blue-100 text-blue-500 px-2 rounded-2xl'>
                        <TrendingUp size={16} /> Active
                    </span>
                }
                {
                    (balance.remainingBalance > 0 && balance.remainingDays === -1) && <span className='flex gap-2 items-center font-bold bg-red-100 text-red-500 px-2 rounded-2xl'>
                        <TriangleAlert size={16} /> Overdue
                    </span>
                }

            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${balance.progressPercentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500  mt-1">
                    <span>0 {loan?.currency}</span>
                    <span>{loan?.amount} {loan?.currency}</span>
                </div>
            </div>

            {/* Loan Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full"><Wallet size={20} className="text-green-600 " /></div>
                    <div>
                        <p className="text-sm text-gray-500 ">Total Paid</p>
                        <p className="font-semibold text-gray-700 ">{balance.totalPaid} {loan?.currency}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="bg-red-100  p-2 rounded-full"><Calendar size={20} className="text-red-600 " /></div>
                    <div>
                        <p className="text-sm text-gray-500 ">Final Due Date</p>
                        <p className="font-semibold text-gray-700 ">{formatDate(loan?.dueDate || "")}</p>
                    </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full"><Clock size={20} className="text-yellow-600" /></div>
                    <div>
                        <p className="text-sm text-gray-500 ">Time Remaining</p>
                        <p className="font-semibold text-gray-700">
                            {balance.remainingDays < 0 ? 0 : balance.remainingDays} Days</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoanOverviewCard;