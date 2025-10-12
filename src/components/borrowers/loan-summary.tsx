import { ClipboardList, DollarSign, TrendingUp, Wallet } from "lucide-react";

interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
}
const SummaryCard = ({ title, value, icon: Icon, color }: SummaryCardProps) => (
    <div className={`flex items-center gap-4 rounded-xl p-6 shadow-sm border border-gray-100 ${color}`}>
        <div className="flex-shrink-0">
            <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
            <div className="text-sm font-medium text-white/80">{title}</div>
            <div className="text-2xl font-bold text-white">${value.toLocaleString()}</div>
        </div>
    </div>
);

const LoanSummary = () => {
    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Loan Summary</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                    title="Total Loans Taken"
                    value={4}
                    icon={ClipboardList}
                    color="bg-indigo-500"
                />
                <SummaryCard
                    title="Active Loans"
                    value={5}
                    icon={TrendingUp}
                    color="bg-rose-500"
                />
                <SummaryCard
                    title="Paid Loans"
                    value={2}
                    icon={DollarSign}
                    color="bg-emerald-500"
                />
                <SummaryCard
                    title="Outstanding Balance"
                    value={4000}
                    icon={Wallet}
                    color="bg-orange-500"
                />
            </div>
        </div>
    )
}

export default LoanSummary;