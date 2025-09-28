import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, icon, className = "", ...props }) => {
    return (
        <button
            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                  hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
            {...props}
        >
            {icon && <span className="text-lg">{icon}</span>}
            {children}
        </button>
    );
};
