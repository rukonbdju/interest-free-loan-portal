'use client'
import { useFetchData } from "@/hooks/useFetchData";
import StatCard, { StatCardProps } from "../shared/stat-card";
import { CircleCheck, Clock, DollarSign, TriangleAlert } from "lucide-react";

type LoanSummaryType = {
    _id: null;
    activeLoans: number;
    overdueLoans: number;
    totalLoanAmount: number;
    totalPaymentAmount: number;
}

const LoanSummary = () => {
    const { data } = useFetchData<LoanSummaryType>('/loans/summary')
    const stats: StatCardProps[] = [
        { title: "Total Loans", value: data?.totalLoanAmount ? String(data.totalLoanAmount) : "0", icon: <DollarSign className="h-6 w-6" />, color: { bg: 'bg-blue-100', text: 'text-blue-600' } },
        { title: "Active Loans", value: data?.activeLoans ? String(data.activeLoans) : "0", icon: <Clock className="h-6 w-6" />, color: { bg: 'bg-yellow-100', text: 'text-yellow-600' } },
        { title: "Overdue Loans", value: data?.overdueLoans ? String(data.overdueLoans) : "0", icon: <TriangleAlert className="h-6 w-6" />, color: { bg: 'bg-red-100', text: 'text-red-600' } },
        { title: "Total Repaid", value: data?.totalPaymentAmount ? String(data.totalPaymentAmount) : "0", icon: <CircleCheck className="h-6 w-6" />, color: { bg: 'bg-green-100', text: 'text-green-600' } },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </div>
    )
}

export default LoanSummary;