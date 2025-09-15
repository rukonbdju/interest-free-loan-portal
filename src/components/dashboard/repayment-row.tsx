export type Repayment = {
    borrower: { name: string };
    dueDate: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
};

const RepaymentRow = ({ borrower, dueDate, amount, status }: Repayment) => {
    const statusStyles: Record<string, string> = {
        Paid: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Overdue: 'bg-red-100 text-red-800',
    };

    return (
        <tr className="border-b border-slate-200/70 last:border-b-0 hover:bg-slate-50/50">
            <td className="py-4 px-6 text-sm font-medium text-slate-900">{borrower.name}</td>
            <td className="py-4 px-6 text-sm text-slate-600">{dueDate}</td>
            <td className="py-4 px-6 text-sm font-semibold text-slate-800">${amount.toLocaleString()}</td>
            <td className="py-4 px-6 text-sm">
                <span className={`px-3 py-1 rounded-full font-medium text-xs ${statusStyles[status]}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
};

export default RepaymentRow;