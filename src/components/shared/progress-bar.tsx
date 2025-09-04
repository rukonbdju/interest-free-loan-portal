import { FC } from "react";

const ProgressBar: FC<{ value: number; maxValue: number; }> = ({ value, maxValue }) => {
    const percentage = (value / maxValue) * 100;
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default ProgressBar