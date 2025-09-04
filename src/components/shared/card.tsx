import { FC } from "react";

const Card: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-sm p-6 border border-gray-100 ${className}`}>
        {children}
    </div>
);

export default Card;