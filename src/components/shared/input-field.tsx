// Reusable Input Field Component
export interface InputFieldProps {
    icon: React.ReactNode;
    label: string;
    name: string;
    value: string;
    disabled: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ icon, label, name, value, disabled, onChange, type = 'text' }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {icon}
                </div>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition disabled:cursor-not-allowed"
                />
            </div>
        </div>
    );
};