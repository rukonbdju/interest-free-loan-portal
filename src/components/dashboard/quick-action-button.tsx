import { ReactNode } from "react";

export type QuickActionButtonProps = {
    icon: ReactNode;
    label: string;
    primary?: boolean;
};

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, primary = false }) => (
    <button className={`w-full flex items-center justify-center space-x-2.5 font-semibold py-3 px-4 rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${primary
        ? 'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800'
        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-500'
        }`}>
        {icon}
        <span>{label}</span>
    </button>
);

export default QuickActionButton;