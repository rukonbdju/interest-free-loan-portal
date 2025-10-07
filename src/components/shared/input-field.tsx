// Reusable Input Field Component
export interface InputFieldProps {
    icon: React.ReactNode;
    label: string;
    name: string;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({ icon, label, name, value, required = false, disabled = false, defaultValue, onChange, type = 'text', placeholder }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {icon}
                </div>
                <input
                    placeholder={placeholder}
                    required={required}
                    type={type}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition disabled:cursor-not-allowed"
                />
            </div>
        </div>
    );
};

export interface SelectFieldProps {
    icon: React.ReactNode;
    label: string;
    name: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean
    options: { label: string, value: string }[],
    placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ icon, label, name, value, required = false, disabled = false, defaultValue, onChange, options, placeholder }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {icon}
                </div>
                <select
                    required={required}
                    name={name}
                    value={value || ""}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition disabled:cursor-not-allowed"
                >
                    {/* Placeholder option */}
                    <option value='' disabled={required}>
                        {placeholder}
                    </option>

                    {/* Render options */}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};