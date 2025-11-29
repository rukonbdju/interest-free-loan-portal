import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";

export interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
}

/**
 * Summary Card Component
 */
export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100 transition duration-300 hover:shadow-md">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="mt-1">
            <p className={`text-3xl font-bold ${color}`}>{formatCurrency(value)}</p>
        </div>
    </div>
);

const FinancialStat = () => {
    const totalIncome = 15000;
    const totalExpenses = 6000
    const totalBalance = totalIncome - totalExpenses;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard
                title="Total Balance"
                value={totalBalance}
                icon={DollarSign}
                color={totalBalance >= 0 ? 'text-indigo-600' : 'text-red-600'}
            />
            <SummaryCard
                title="Total Income"
                value={totalIncome}
                icon={ArrowUp}
                color="text-green-600"
            />
            <SummaryCard
                title="Total Expenses"
                value={totalExpenses}
                icon={ArrowDown}
                color="text-red-600"
            />
        </div>
    )
}

export default FinancialStat;