"use client";

import { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { Check, X, List } from "lucide-react";
import Link from "next/link";

// Example TypeScript interfaces for form data and component props
interface LoanForm {
    borrowerId: string;
    amount: number | "";
    startDate: string;
    dueDate: string;
    repaymentPlan: "one-time" | "installments";
    installments?: number | "";
    frequency?: "weekly" | "monthly";
    notes?: string;
}

interface AddLoanProps {
    onSave: (data: LoanForm) => Promise<void>;
    borrowers: { id: string; name: string }[];
}

const AddLoanPage: React.FC<AddLoanProps> = ({ borrowers = [] }) => {
    const [formData, setFormData] = useState<LoanForm>({
        borrowerId: "",
        amount: "",
        startDate: "",
        dueDate: "",
        repaymentPlan: "one-time",
        notes: "",
    });

    const [errors, setErrors] = useState<Partial<LoanForm>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<"success" | "error" | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear error for the field being changed
        setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> | undefined = {};
        if (!formData.borrowerId) newErrors.borrowerId = "Borrower is required.";
        if (!formData.amount || Number(formData.amount) <= 0) newErrors["amount"] = "Loan amount must be greater than zero.";
        if (!formData.startDate) newErrors.startDate = "Start date is required.";
        if (!formData.dueDate) {
            newErrors.dueDate = "Due date is required.";
        } else if (new Date(formData.dueDate) < new Date(formData.startDate)) {
            newErrors.dueDate = "Due date must be after start date.";
        }

        if (formData.repaymentPlan === "installments") {
            if (!formData.installments || Number(formData["installments"]) <= 0) {
                newErrors["installments"] = "Number of installments is required.";
            }
            if (!formData.frequency) newErrors["frequency"] = "Frequency is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setSubmissionStatus(null);
            try {
                // Here you would connect to your API endpoint
                // await onSave(formData as LoanForm);
                console.log("Submitting form data:", formData);
                // Simulate an API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setSubmissionStatus("success");
            } catch (err) {
                console.error("Failed to create loan:", err);
                setSubmissionStatus("error");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            borrowerId: "",
            amount: "",
            startDate: "",
            dueDate: "",
            repaymentPlan: "one-time",
            notes: "",
        });
        setErrors({});
        setSubmissionStatus(null);
    };

    const calculatedInstallmentAmount = useMemo(() => {
        if (formData.repaymentPlan === "installments" && formData.amount && formData.installments) {
            const amount = Number(formData.amount);
            const installments = Number(formData.installments);
            if (installments > 0) {
                return (amount / installments).toFixed(2);
            }
        }
        return "N/A";
    }, [formData.repaymentPlan, formData.amount, formData.installments]);

    const totalLoanDuration = useMemo(() => {
        if (formData.startDate && formData.dueDate) {
            const start = new Date(formData.startDate).getTime();
            const end = new Date(formData.dueDate).getTime();
            const differenceInDays = (end - start) / (1000 * 60 * 60 * 24);

            if (differenceInDays < 0) return "N/A";
            if (differenceInDays < 7) return `${differenceInDays.toFixed(0)} days`;
            if (differenceInDays < 30) return `${(differenceInDays / 7).toFixed(1)} weeks`;
            if (differenceInDays < 365) return `${(differenceInDays / 30.44).toFixed(1)} months`;
            return `${(differenceInDays / 365.25).toFixed(1)} years`;
        }
        return "N/A";
    }, [formData.startDate, formData.dueDate]);

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2"></h1>
            <div className="flex items-center justify-between mb-6 gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800">
                    Add New Loan
                </h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <List size={20} />
                    <Link href={"/loans"} className="font-medium">Loan List</Link>
                </button>
            </div>
            <div className="bg-white rounded-3xl shadow-xl w-full p-6 sm:p-8">
                <form onSubmit={handleSubmit} className=" md:grid md:grid-cols-2 md:gap-x-12">
                    {/* Left Column: Form Fields */}
                    <div className="space-y-6">
                        {/* Borrower Field */}
                        <div>
                            <label htmlFor="borrowerId" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Borrower <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="borrowerId"
                                name="borrowerId"
                                value={formData.borrowerId}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            >
                                <option value="" disabled>Select a borrower</option>
                                {borrowers.map((borrower) => (
                                    <option key={borrower.id} value={borrower.id}>{borrower.name}</option>
                                ))}
                            </select>
                            {errors.borrowerId && <p className="mt-1 text-sm text-red-500" role="alert">{errors.borrowerId}</p>}
                        </div>

                        {/* Loan Amount Field */}
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">

                                Loan Amount <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                step="0.01"
                                min="0.01"
                                placeholder="e.g., 500.00"
                                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                            {errors.amount && <p className="mt-1 text-sm text-red-500" role="alert">{errors.amount}</p>}
                        </div>

                        {/* Start Date Field */}
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">

                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="startDate"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                            {errors.startDate && <p className="mt-1 text-sm text-red-500" role="alert">{errors.startDate}</p>}
                        </div>

                        {/* Due Date Field */}
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">

                                Due Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={handleChange}
                                required
                                aria-required="true"
                                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                            {errors.dueDate && <p className="mt-1 text-sm text-red-500" role="alert">{errors.dueDate}</p>}
                        </div>

                        {/* Repayment Plan Field */}
                        <div>
                            <label htmlFor="repaymentPlan" className="block text-sm font-medium text-gray-700 mb-1">

                                Repayment Plan
                            </label>
                            <select
                                id="repaymentPlan"
                                name="repaymentPlan"
                                value={formData.repaymentPlan}
                                onChange={handleChange}
                                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            >
                                <option value="one-time">One-time</option>
                                <option value="installments">Installments</option>
                            </select>
                        </div>

                        {/* Conditional Installments Fields */}
                        {formData.repaymentPlan === "installments" && (
                            <div className="space-y-6 transition-all duration-300 ease-in-out">
                                {/* Number of Installments */}
                                <div>
                                    <label htmlFor="installments" className="block text-sm font-medium text-gray-700 mb-1">

                                        Number of Installments <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="installments"
                                        name="installments"
                                        type="number"
                                        value={formData.installments}
                                        onChange={handleChange}
                                        required
                                        aria-required="true"
                                        min="1"
                                        step="1"
                                        className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    />
                                    {errors.installments && <p className="mt-1 text-sm text-red-500" role="alert">{errors.installments}</p>}
                                </div>
                                {/* Frequency */}
                                <div>
                                    <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">

                                        Frequency <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="frequency"
                                        name="frequency"
                                        value={formData.frequency}
                                        onChange={handleChange}
                                        required
                                        aria-required="true"
                                        className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    >
                                        <option value="" disabled>Select frequency</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                    {errors.frequency && <p className="mt-1 text-sm text-red-500" role="alert">{errors.frequency}</p>}
                                </div>
                            </div>
                        )}

                        {/* Notes Field */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">

                                Notes (Optional)
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows={4}
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Add any relevant notes here..."
                                className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Right Column: Quick Info Section */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mt-8 md:mt-0 shadow-inner">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Info</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-gray-600">
                                <span className="text-sm font-medium">Total Loan Duration:</span>
                                <span className="text-sm font-semibold text-gray-800">{totalLoanDuration}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                                <span className="text-sm font-medium">Repayment Plan:</span>
                                <span className="text-sm font-semibold text-gray-800 capitalize">{formData.repaymentPlan}</span>
                            </div>
                            {formData.repaymentPlan === "installments" && (
                                <>
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span className="text-sm font-medium">Installment Amount:</span>
                                        <span className="text-sm font-semibold text-gray-800">
                                            {calculatedInstallmentAmount === "N/A" ? "N/A" : `$${calculatedInstallmentAmount}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span className="text-sm font-medium">Frequency:</span>
                                        <span className="text-sm font-semibold text-gray-800 capitalize">{formData.frequency || "N/A"}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row-reverse justify-start gap-4 mt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex items-center px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                                }`}
                        >
                            {isSubmitting ? (
                                <span>Creating...</span>
                            ) : (
                                <>
                                    <Check size={20} className="inline-block mr-2" />
                                    <span>Create Loan</span>
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center px-6 py-3 rounded-xl font-bold text-gray-700 bg-gray-200 transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-300 shadow-md"
                        >
                            <X size={20} className="inline-block mr-2" />
                            <span>Cancel</span>
                        </button>
                    </div>

                    {submissionStatus && (
                        <div className={`md:col-span-2 mt-4 px-4 py-3 rounded-xl text-center font-semibold ${submissionStatus === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`} role="status">
                            {submissionStatus === "success" ? "Loan created successfully!" : "Failed to create loan. Please try again."}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddLoanPage;
