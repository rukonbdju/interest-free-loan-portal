'use client';
import React, { useState, useMemo } from 'react';
import { ChevronRight, CheckCircle, FileUp, User2, DollarSign } from 'lucide-react';

// --- Type Definitions ---
interface RepaymentScheduleItem {
    installment: number;
    amount: string;
    dueDate: string;
}

interface FormData {
    loanAmount: string;
    purpose: string;
    repaymentDuration: number;
    guarantorName: string;
    guarantorPhone: string;
    guarantorEmail: string;
    documents: FileList | null;
}

interface StepperProps {
    currentStep: number;
    totalSteps: number;
}

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    placeholder: string;
    isRequired?: boolean;
    name: string;
}

interface SubmitButtonProps {
    label: string;
    isLoading: boolean;
    onClick: () => void;
}

interface FileUploadProps {
    label: string;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// --- Components with Typescript Props ---
const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
    const steps = [
        { title: 'Loan Details', icon: <DollarSign size={20} /> },
        { title: 'Supporting Info', icon: <FileUp size={20} /> },
        { title: 'Confirmation', icon: <CheckCircle size={20} /> },
    ];

    return (
        <div className="flex justify-center items-center py-6 text-gray-500">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className={`flex items-center space-x-2 transition-colors duration-300 ${index + 1 === currentStep ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${index + 1 === currentStep ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                            {step.icon}
                        </div>
                        <span className="hidden sm:inline">{step.title}</span>
                    </div>
                    {index < totalSteps - 1 && (
                        <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${index + 1 < currentStep ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const FormInput: React.FC<FormInputProps> = ({ id, label, type = 'text', value, onChange, placeholder, isRequired = true, name }) => (
    <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="text-gray-700 font-medium">
            {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-colors duration-200"
            required={isRequired}
        />
    </div>
);

const FormTextarea: React.FC<FormInputProps> = ({ id, label, value, onChange, placeholder, name }) => (
    <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="text-gray-700 font-medium">
            {label}
        </label>
        <textarea
            id={id}
            name={name}
            rows={4}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-colors duration-200 resize-none"
        />
    </div>
);

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileChange }) => (
    <div className="flex flex-col space-y-2">
        <label className="text-gray-700 font-medium">{label}</label>
        <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
            <FileUp size={24} className="text-emerald-600 mb-2" />
            <span className="text-sm text-gray-500 text-center">
                Drag & drop files here, or <span className="text-emerald-600 font-semibold">click to browse</span>
            </span>
            <input type="file" className="hidden" onChange={onFileChange} multiple />
        </div>
    </div>
);

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, isLoading, onClick }) => (
    <button
        type="submit"
        onClick={onClick}
        className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500'
            }`}
        disabled={isLoading}
    >
        {isLoading ? 'Submitting...' : label}
    </button>
);

const LoanRequestForm: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        loanAmount: '',
        purpose: '',
        repaymentDuration: 6,
        guarantorName: '',
        guarantorPhone: '',
        guarantorEmail: '',
        documents: null,
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({ ...prev, documents: e.target.files }));
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const repaymentSchedule = useMemo<RepaymentScheduleItem[]>(() => {
        const amount = Number(formData.loanAmount);
        const duration = Number(formData.repaymentDuration);
        if (isNaN(amount) || !duration || duration === 0) return [];

        const installmentAmount = (amount / duration).toFixed(2);
        const schedule: RepaymentScheduleItem[] = [];

        for (let i = 1; i <= duration; i++) {
            const date = new Date();
            date.setMonth(date.getMonth() + i);
            schedule.push({
                installment: i,
                amount: installmentAmount,
                dueDate: date.toISOString().split('T')[0],
            });
        }
        return schedule;
    }, [formData.loanAmount, formData.repaymentDuration]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock submission logic
        setTimeout(() => {
            console.log('Form Submitted:', formData);
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 p-4">
                <CheckCircle size={80} className="text-emerald-600 animate-bounce" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-6">Request Submitted Successfully!</h2>
                <p className="text-lg text-gray-600 mt-2 max-w-lg">
                    Thank you for your submission. Your loan request is now visible to the community of lenders. We will notify you once a lender has expressed interest.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-12">
            <div className="w-full max-w-3xl">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">
                    Request a Loan
                </h1>
                <p className="text-md sm:text-lg text-center text-gray-500 mb-8">
                    Submit your loan request to the community.
                </p>

                <Stepper currentStep={step} totalSteps={3} />

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 space-y-6">
                        {step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-emerald-600">Loan Details</h2>
                                <FormInput
                                    id="loanAmount"
                                    name="loanAmount"
                                    label="Loan Amount"
                                    type="number"
                                    placeholder="e.g., 5000"
                                    value={formData.loanAmount}
                                    onChange={handleInputChange}
                                />
                                <FormTextarea
                                    id="purpose"
                                    name="purpose"
                                    label="Purpose (Short Description)"
                                    placeholder="e.g., Small business startup, medical expenses, etc."
                                    value={formData.purpose}
                                    onChange={handleInputChange}
                                />
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="repaymentDuration" className="text-gray-700 font-medium">
                                        Repayment Duration (in months) <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="repaymentDuration"
                                        name="repaymentDuration"
                                        value={formData.repaymentDuration}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-colors duration-200"
                                    >
                                        {[...Array(12).keys()].map(i => (
                                            <option key={i + 1} value={i + 1}>{i + 1} Month{i > 0 && 's'}</option>
                                        ))}
                                    </select>
                                </div>
                                {repaymentSchedule.length > 0 && (
                                    <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-600">
                                        <p className="font-semibold text-emerald-800">Calculated Repayment Schedule:</p>
                                        <ul className="list-disc list-inside mt-2 text-gray-700">
                                            {repaymentSchedule.map((item, index) => (
                                                <li key={index} className="text-sm">
                                                    Installment {item.installment}: ${item.amount} due on {item.dueDate}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="flex justify-end mt-6">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.loanAmount || !formData.purpose}
                                        className="flex items-center space-x-2 py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        <span>Next</span>
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-emerald-600">Supporting Information</h2>
                                <p className="text-gray-500">Provide optional details to strengthen your request.</p>
                                <FileUpload
                                    label="Optional Documents"
                                    onFileChange={handleFileChange}
                                />
                                <div className="bg-emerald-50 p-4 rounded-lg">
                                    <h3 className="flex items-center text-lg font-bold text-emerald-800 mb-4">
                                        <User2 size={20} className="mr-2" />
                                        Guarantor Information
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <FormInput
                                            id="guarantorName"
                                            name="guarantorName"
                                            label="Name"
                                            placeholder="e.g., Ahmed Ali"
                                            value={formData.guarantorName}
                                            onChange={handleInputChange}
                                            isRequired={false}
                                        />
                                        <FormInput
                                            id="guarantorPhone"
                                            name="guarantorPhone"
                                            label="Phone Number"
                                            type="tel"
                                            placeholder="e.g., +8801700000001"
                                            value={formData.guarantorPhone}
                                            onChange={handleInputChange}
                                            isRequired={false}
                                        />
                                        <FormInput
                                            id="guarantorEmail"
                                            name="guarantorEmail"
                                            label="Email"
                                            type="email"
                                            placeholder="e.g., ahmed@example.com"
                                            value={formData.guarantorEmail}
                                            onChange={handleInputChange}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        Back
                                    </button>
                                    <SubmitButton isLoading={false} label="Review & Submit" onClick={nextStep} />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-emerald-600">Confirmation</h2>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Loan Details</h3>
                                        <p><strong>Amount:</strong> <span className="font-medium text-emerald-600">${formData.loanAmount}</span></p>
                                        <p><strong>Purpose:</strong> {formData.purpose}</p>
                                        <p><strong>Duration:</strong> {formData.repaymentDuration} months</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Repayment Schedule</h3>
                                        {repaymentSchedule.length > 0 ? (
                                            <ul className="list-disc list-inside space-y-1">
                                                {repaymentSchedule.map((item, index) => (
                                                    <li key={index}>Installment {item.installment}: <span className="font-mono">${item.amount}</span> due on {item.dueDate}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500">Please provide a valid loan amount and duration.</p>
                                        )}
                                    </div>
                                    {(formData.guarantorName || formData.documents) && (
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Supporting Information</h3>
                                            {formData.guarantorName && <p><strong>Guarantor:</strong> {formData.guarantorName}</p>}
                                            {formData.documents && <p><strong>Documents:</strong> {formData.documents.length} file(s) attached</p>}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        Back
                                    </button>
                                    <SubmitButton onClick={() => console.log('success')} label="Confirm & Submit" isLoading={isSubmitting} />
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoanRequestForm;
