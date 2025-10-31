"use client";

import React, { useState } from "react";
import { User, IdCard, SendHorizontal, DollarSign, ReceiptText, Receipt, Calendar, } from "lucide-react";
import { InputField, SelectField } from "../shared/input-field";
import { baseUrl } from "@/utils/api-url";
import { Button } from "../shared/button";
import AlertBox from "../shared/alert";
import { formatDate } from "@/utils/date-format";
import { Loan } from "@/types";
type LoanPropsType = {
    loan: Loan
}

export const EditLoanForm = ({ loan }: LoanPropsType) => {
    const [alert, setAlert] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({});
    const disbursementDate = formatDate(loan.disbursementDate, 'YYYY-MM-DD');
    const dueDate = formatDate(loan.dueDate, 'YYYY-MM-DD');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(baseUrl + `/loans/${loan._id}`, {
                credentials: 'include',
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData }),
            });

            const result = await res.json();
            if (result.success) {
                setAlert({ type: 'success', message: 'Loan successfully updated!' })

            } else {
                if (res?.status && res.status < 500) {
                    setAlert({ type: 'error', message: result?.message || 'Something went wrong, try again!' })
                }
            }

        } catch (error) {
            console.log(error);
            setAlert({ type: 'error', message: 'Something went wrong, try again!' })
        } finally {
            setLoading(false)
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className=" p-4 bg-white rounded-xl space-y-4 shadow-md"
        >
            {(alert.message && alert.type) && <AlertBox type={alert.type as 'info' | 'error' | 'warning' | 'success'} message={alert.message} />

            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField
                    icon={<IdCard className="w-4 h-4" />}
                    label="Loan ID"
                    name="loanId"
                    placeholder="eg. L-0001"
                    value={loan.loanId}
                    required={true}
                    disabled={true}
                />
                <InputField
                    icon={<User className="w-4 h-4" />}
                    label="Borrower"
                    name="borrower"
                    value={`${loan?.borrower?.name} (${loan?.borrower?.borrowerId})`}
                    required={true}
                    disabled={true}
                />

                <InputField
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Loan Amount"
                    name="amount"
                    defaultValue={loan.amount}
                    onChange={handleChange}
                    type="number"
                    min={1}
                />

                <SelectField
                    icon={<ReceiptText className="w-4 h-4" />}
                    label="Currency"
                    name="currency"
                    defaultValue={loan.currency}
                    onChange={handleChange}
                >
                    <option value="">Select currency</option>
                    <option value="BDT">BDT</option>
                    <option value="USD">USD</option>
                </SelectField>

                <InputField
                    icon={<Calendar className="w-4 h-4" />}
                    label="Disbursement Date"
                    name="disbursementDate"
                    defaultValue={disbursementDate}
                    onChange={handleChange}
                    type="date"

                />
                <SelectField
                    icon={<Receipt className="w-4 h-4" />}
                    label="Disbursement Method"
                    name="disbursementMethod"
                    defaultValue={loan.disbursementMethod}
                    onChange={handleChange}
                >
                    <option value="">Select method</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                    <option value="Online">Online</option>
                </SelectField>
                <InputField
                    icon={<Calendar className="w-4 h-4" />}
                    label="Due Date"
                    name="dueDate"
                    defaultValue={dueDate}
                    onChange={handleChange}
                    type="date"
                />
            </div>


            <div className="flex justify-end">
                <Button disabled={loading} icon={<SendHorizontal className="w-4 h-4" />} >Submit</Button>
            </div>
        </form>
    );
};
