"use client";

import React, { useState } from "react";
import { User, IdCard, SendHorizonal, DollarSign, ReceiptText, Receipt, Calendar, } from "lucide-react";
import { InputField, SelectField } from "../shared/input-field";
import { baseUrl } from "@/utils/api-url";
import { Button } from "../shared/button";
import AlertBox from "../shared/alert";
import { useFetchData } from "@/hooks/useFetchData";
import { Borrower } from "@/types";
import { useAuth } from "@/contexts/auth-context";

export const CreateLoan: React.FC = () => {
    const { user } = useAuth()
    const { data } = useFetchData<Borrower[]>(`/borrowers/creator/${user?._id}`)
    const [alert, setAlert] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        loanId: "",
        borrower: "",
        amount: "",
        currency: "",
        disbursementDate: "",
        disbursementMethod: "",
        dueDate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(baseUrl + '/loans', {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, amount: Number(formData.amount) }),
            });

            const result = await res.json();
            if (result.success) {
                setAlert({ type: 'success', message: 'Loan successfully created!' })
                setFormData({
                    loanId: "",
                    borrower: "",
                    amount: "",
                    currency: "",
                    disbursementDate: "",
                    disbursementMethod: "",
                    dueDate: "",
                });
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
                    value={formData.loanId}
                    onChange={handleChange}
                    required={true}
                />
                <SelectField
                    icon={<User className="w-4 h-4" />}
                    label="Borrower"
                    name="borrower"
                    value={formData.borrower}
                    onChange={handleChange}
                    required={true}
                >
                    <option value="">Select borrower</option>
                    {
                        data?.map(item => <option value={item._id} key={item._id}>{item.name} ({item.borrowerId})</option>)
                    }

                </SelectField>

                <InputField
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Loan Amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    type="number"
                    min={1}
                />

                <SelectField
                    icon={<ReceiptText className="w-4 h-4" />}
                    label="Currency"
                    name="currency"
                    value={formData.currency}
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
                    value={formData.disbursementDate}
                    onChange={handleChange}
                    type="date"

                />
                <SelectField
                    icon={<Receipt className="w-4 h-4" />}
                    label="Disbursement Method"
                    name="disbursementMethod"
                    value={formData.disbursementMethod}
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
                    value={formData.dueDate}
                    onChange={handleChange}
                    type="date"
                />
            </div>


            <div className="flex justify-end">
                <Button disabled={loading} icon={<SendHorizonal className="w-4 h-4" />} >Submit</Button>
            </div>
        </form>
    );
};
