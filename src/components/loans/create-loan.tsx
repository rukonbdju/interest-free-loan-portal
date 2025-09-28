"use client";

import { useState, useMemo } from "react";
import { Banknote, Calendar, DollarSign, User, Wallet } from "lucide-react";
import { InputField, SelectField } from "../shared/input-field";
import { useFetchData } from "@/hooks/useFetchData";
import { Borrower, LoanFormData } from "@/types";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "../shared/button";
import { baseUrl } from "@/utils/api-url";

const CreateLoan = () => {
    const { user } = useAuth();
    const { data: borrowers } = useFetchData<Borrower[]>(
        `/borrowers/creator/${user?._id}`
    );
    const [loading, setLoading] = useState(false)

    const borrowerOptions = useMemo(() => {
        return borrowers?.map((item) => ({
            label: `${item.name} (${item._id})`,
            value: item._id,
        })) || [];
    }, [borrowers]);

    const [formData, setFormData] = useState<LoanFormData>({
        borrowerId: borrowerOptions[0]?.value ?? "",
        totalAmount: "",
        currency: "BDT",
        disbursementDate: "",
        disbursementMethod: "Cash",
        repaymentPlan: "one_time",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting Loan Data:", formData);
        setLoading(true)
        try {
            const res = await fetch(baseUrl + `/loans`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await res.json()
            console.log(result)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    // 🔹 Generate installment schedule
    const installmentSchedule = useMemo(() => {
        if (
            formData.repaymentPlan !== "installments" ||
            !formData.installmentPlan.numberOfInstallments ||
            !formData.installmentPlan.firstDueDate ||
            !formData.totalAmount
        ) return [];

        const numberOfInstallments = parseInt(formData.installmentPlan.numberOfInstallments);
        const installmentAmount = parseFloat(formData.totalAmount) / numberOfInstallments;

        const dueDate = new Date(formData.installmentPlan.firstDueDate);
        const cycleDays =
            formData.installmentPlan.cycle === "30days" ? 30 :
                formData.installmentPlan.cycle === "60days" ? 60 :
                    formData.installmentPlan.cycle === "90days" ? 90 : 0;

        const schedule = [];
        for (let i = 0; i < numberOfInstallments; i++) {
            schedule.push({
                installmentNo: i + 1,
                amount: installmentAmount.toFixed(2),
                dueDate: new Date(dueDate).toISOString().split("T")[0], // yyyy-mm-dd
            });
            dueDate.setDate(dueDate.getDate() + cycleDays);
        }
        return schedule;
    }, [formData]);

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
                    placeholder="Select currency"
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
                    placeholder="Select s method"
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
                    placeholder="Select repayment plan"
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
                            placeholder="Choose installment cycle"
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
                {/* 🔹 Show installment preview table */}
                {formData.repaymentPlan === "installments" && installmentSchedule.length > 0 && (
                    <div className="col-span-3">
                        <h3 className="text-lg font-semibold mb-4">Installment Schedule</h3>
                        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2 text-left">#</th>
                                    <th className="p-2 text-left">Amount ({formData.currency})</th>
                                    <th className="p-2 text-left">Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {installmentSchedule.map((inst) => (
                                    <tr key={inst.installmentNo} className="border-t">
                                        <td className="p-2">{inst.installmentNo}</td>
                                        <td className="p-2">{inst.amount}</td>
                                        <td className="p-2">{inst.dueDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* Submit Button */}
                <div className="col-span-full flex justify-end">
                    <Button disabled={loading} type="submit">Submit</Button>
                </div>
            </form>

        </div>
    );
};

export default CreateLoan;
