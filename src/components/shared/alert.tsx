import { CircleCheckBig, CircleX, Info } from "lucide-react";
import { ReactNode } from "react";

type PropsType = {
    type?: 'info' | 'error' | 'warning' | 'success';
    message: string;
    icon?: ReactNode
}
const AlertBox = ({ type = 'info', message, icon = <Info /> }: PropsType) => {
    const baseClasses = "flex items-center p-4 mb-4 text-sm rounded-lg";
    let typeClasses = "";

    switch (type) {
        case "error":
            typeClasses = "bg-red-100 text-red-700 border border-red-400";
            icon = <CircleX />
            break;
        case "warning":
            typeClasses = "bg-yellow-100 text-yellow-700 border border-yellow-400";
            icon = <CircleX />
            break;
        case "success":
            typeClasses = "bg-green-100 text-green-700 border border-green-400";
            icon = <CircleCheckBig />
            break;
        case "info":
        default:
            typeClasses = "bg-blue-100 text-blue-700 border border-blue-400";
            break;
    }
    const formattedMessage = message ? message.charAt(0).toUpperCase() + message.slice(1) : '';

    return (
        <div className={`${baseClasses} ${typeClasses}`} role="alert">
            {icon}
            <span className="font-medium ms-2">{formattedMessage}</span>
        </div>
    );
}

export default AlertBox;