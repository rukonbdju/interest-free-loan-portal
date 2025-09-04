import { LoanRequest } from "@/types";
import { FC } from "react";

const Badge: FC<{ reputation: LoanRequest['borrower']['reputation'] }> = ({ reputation }) => {
    const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded-full";
    const colorClasses = {
        'Trusted': 'bg-green-100 text-green-800',
        'Good': 'bg-blue-100 text-blue-800',
        'New': 'bg-gray-100 text-gray-800',
    };
    return <span className={`${baseClasses} ${colorClasses[reputation]}`}>{reputation}</span>;
};

export default Badge;