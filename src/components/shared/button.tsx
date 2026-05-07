import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export const Button: React.FC<ButtonProps> = ({ children, icon, variant = 'primary', className = "", ...props }) => {
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300",
        danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    };

    return (
        <button
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold
                  transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 ${variants[variant]} ${className}`}
            {...props}
        >
            {icon && <span className="flex items-center">{icon}</span>}
            {children}
        </button>
    );
};
