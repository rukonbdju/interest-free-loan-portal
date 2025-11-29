import { formatCurrency } from "@/utils/formatCurrency";
import { Wallet } from "lucide-react";

interface BudgetProgressProps {
    income: number;
    expense: number;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ income, expense }) => {
    const percentage = income > 0 ? Math.min(100, (expense / income) * 100) : 0;
    const remaining = income - expense;
    const progressColor = percentage < 70 ? 'bg-green-500' : percentage < 90 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-indigo-600" />
                Monthly Budget Flow
            </h3>
            <div className="space-y-1">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Income: {formatCurrency(income)}</span>
                    <span>Expense: {formatCurrency(expense)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${progressColor} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
                Remaining Balance:
                <span className={`ml-2 font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(remaining)}
                </span>
            </p>
        </div>
    );
};

export default BudgetProgress;