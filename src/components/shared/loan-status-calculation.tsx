import { Loan } from "@/types";
import { CheckCircle, TrendingUp, TriangleAlert } from "lucide-react";
import { useMemo } from "react";

// Calculates days remaining until the end date
export const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date(); // Use current date for countdown
    const diffTime = end.getTime() - now.getTime();
    if (diffTime < 0) return -1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const LoanStatus = ({ loan }: { loan: Loan }) => {
    const balance = useMemo(() => {
        const totalPaid = loan?.payments.reduce((total, payment) => total + payment.paymentAmount, 0) || 0
        const remainingBalance = loan?.amount ? loan.amount - totalPaid : 0;
        const progressPercentage = loan?.amount ? (totalPaid / loan.amount) * 100 : 0;
        const remainingDays = getDaysRemaining(loan?.dueDate || '');
        return { totalPaid, remainingBalance, progressPercentage, remainingDays }
    }, [loan])
    if (balance.remainingBalance === 0) {
        return <span className='inline-flex gap-2 items-center font-semibold bg-blue-100 text-green-500 px-2 rounded-2xl'>
            <CheckCircle size={16} /> Paid
        </span>
    }
    if (balance.remainingBalance > 0 && balance.remainingDays >= 0) {
        return <span className='inline-flex gap-2 items-center font-semibold bg-blue-100 text-blue-500 px-2 rounded-2xl'>
            <TrendingUp size={16} /> Active
        </span>
    }
    if (balance.remainingBalance > 0 && balance.remainingDays === -1) {
        return <span className='inline-flex gap-2 items-center font-semibold bg-red-100 text-red-500 px-2 rounded-2xl'>
            <TriangleAlert size={16} /> Overdue
        </span>
    }
    return <span className='inline-flex gap-2 items-center font-semibold bg-blue-100 text-blue-500 px-2 rounded-2xl'>
        <TrendingUp size={16} /> Active
    </span>
}

export default LoanStatus;