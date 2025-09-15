import { ReactNode } from "react";

export type Activity = {
    icon: ReactNode;
    text: string;
    time: string;
};
const ActivityItem = ({ icon, text, time }: Activity) => (
    <li className="flex items-start space-x-4 py-3 first:pt-0 last:pb-0">
        <div className="bg-slate-100 rounded-full p-2.5 flex items-center justify-center">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-sm text-slate-800 leading-snug">{text}</p>
            <p className="text-xs text-slate-500 mt-1">{time}</p>
        </div>
    </li>
);

export default ActivityItem;