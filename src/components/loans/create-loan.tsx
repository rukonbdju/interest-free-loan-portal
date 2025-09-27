"use client";

import { useState, useMemo } from "react";
import { Banknote, Calendar, DollarSign, User, Wallet } from "lucide-react";
import { InputField, SelectField } from "../shared/input-field";
import { useFetchData } from "@/hooks/useFetchData";
import { Borrower, LoanFormData } from "@/types";
import { useAuth } from "@/contexts/auth-context";

const CreateLoan = () => {
    const { user } = useAuth();
    const { data: borrowers } = useFetchData<Borrower[]>(
        `/borrowers/creator/${user?._id}`
    );

    const borrowerOptions = useMemo(() => {
        return borrowers?.map((item) => ({
            label: `${item.name} (${item._id})`,
            value: item._id,
        })) || [];
    }, [borrowers]);

    const [formData, setFormData] = useState<LoanFormData>({
        borrowerId: "",
        totalAmount: "",
        currency: "BDT",
        disbursementDate: "",
        disbursementMethod: "",
        repaymentPlan: "",
        oneTimePlan: { dueDate: "" },
        installmentPlan: { numberOfInstallments: "", cycle: "", firstDueDate: "" },
    });

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (section: string, field: string, value: string) => {
        if (section === "oneTimePlan") {
            setFormData((prev) => ({
                ...prev,
                oneTimePlan: {
                    ...prev.oneTimePlan,
                    [field]: value,
                },
                installmentPlan: { numberOfInstallments: "", cycle: "", firstDueDate: "" }
            }));
        } else if (section === "installmentPlan") {
            setFormData((prev) => ({
                ...prev,
                installmentPlan: {
                    ...prev.installmentPlan,
                    [field]: value,
                },
                oneTimePlan: { dueDate: "" },
            }));
        };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting Loan Data:", formData);
        // TODO: call your API POST /loans here
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl w-full p-6 sm:p-8">
            <form
                onSubmit={handleSubmit}
                className="grid lg:grid-cols-3 gap-6"
            >
                {/* Borrower */}
                <div className="col-span-2">
                    <SelectField
                        icon={<User />}
                        label="Borrower"
                        name="borrowerId"
                        options={borrowerOptions}
                        value={formData.borrowerId}
                        onChange={(e) => handleChange("borrowerId", e.target.value)}
                        required
                        placeholder="Select a Borrower"
                    />
                </div>

                {/* Amount */}
                <InputField
                    icon={<DollarSign />}
                    name="totalAmount"
                    label="Loan Amount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => handleChange("totalAmount", e.target.value)}
                    required
                />

                {/* Currency */}
                <SelectField
                    icon={<Banknote />}
                    name="currency"
                    label="Currency"
                    value={formData.currency}
                    onChange={(e) => handleChange("currency", e.target.value)}
                    options={[
                        { label: "BDT", value: "BDT" },
                        { label: "USD", value: "USD" },
                    ]}
                    required
                />

                {/* Disbursement Date */}
                <InputField
                    icon={<Calendar />}
                    name="disbursementDate"
                    label="Disbursement Date"
                    type="date"
                    value={formData.disbursementDate}
                    onChange={(e) => handleChange("disbursementDate", e.target.value)}
                    required
                />

                {/* Disbursement Method */}
                <SelectField
                    icon={<Wallet />}
                    name="disbursementMethod"
                    label="Disbursement Method"
                    value={formData.disbursementMethod}
                    onChange={(e) => handleChange("disbursementMethod", e.target.value)}
                    options={[
                        { label: "Cash", value: "Cash" },
                        { label: "Bkash", value: "Bkash" },
                        { label: "Bank", value: "Bank" },
                    ]}
                    placeholder="Select Installment Cycle"
                    required
                />

                {/* Repayment Plan */}
                <SelectField
                    icon={<Banknote />}
                    name="repaymentPlan"
                    label="Repayment Plan"
                    value={formData.repaymentPlan}
                    onChange={(e) => handleChange("repaymentPlan", e.target.value)}
                    options={[
                        { label: "One Time", value: "one_time" },
                        { label: "Installments", value: "installments" },
                    ]}
                    required
                />

                {/* Conditional Fields */}
                {formData.repaymentPlan === "one_time" && (
                    <InputField
                        icon={<Calendar />}
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        value={formData.oneTimePlan.dueDate}
                        onChange={(e) =>
                            handleNestedChange("oneTimePlan", "dueDate", e.target.value)
                        }
                        required
                    />
                )}

                {formData.repaymentPlan === "installments" && (
                    <>
                        <InputField
                            icon={<DollarSign />}
                            name="numberOfInstallments"
                            label="Number of Installments"
                            type="number"
                            value={formData.installmentPlan.numberOfInstallments}
                            onChange={(e) =>
                                handleNestedChange(
                                    "installmentPlan",
                                    "numberOfInstallments",
                                    e.target.value
                                )
                            }
                            required
                        />
                        <SelectField
                            icon={<Calendar />}
                            name="cycle"
                            label="Installment Cycle"
                            value={formData.installmentPlan.cycle}
                            onChange={(e) =>
                                handleNestedChange("installmentPlan", "cycle", e.target.value)
                            }
                            options={[
                                { label: "30 days", value: "30days" },
                                { label: "60 days", value: "60days" },
                                { label: "90 days", value: "90days" },
                            ]}
                            required
                        />
                        <InputField
                            icon={<Calendar />}
                            name="firstDueDate"
                            label="First Due Date"
                            type="date"
                            value={formData.installmentPlan.firstDueDate}
                            onChange={(e) =>
                                handleNestedChange(
                                    "installmentPlan",
                                    "firstDueDate",
                                    e.target.value
                                )
                            }
                            required
                        />
                    </>
                )}

                {/* Submit Button */}
                <div className="col-span-full flex justify-end">
                    <button type="submit" className="px-6">
                        Create Loan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateLoan;
