
import { ReactNode } from "react";

export type StatCardProps = {
    title: string;
    value: string;
    icon: ReactNode;
    color: {
        bg: string;
        text: string;
    };
};

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start space-x-4 border border-transparent hover:border-slate-200/70">
        <div className={`rounded-full p-3 ${color.bg} flex-shrink-0`}>
            <div className={`${color.text}`}>{icon}</div>
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

export default StatCard
