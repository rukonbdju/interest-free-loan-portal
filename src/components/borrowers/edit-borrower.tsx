"use client";

import React, { useState } from "react";
import { User, Phone, Mail, IdCard, MapPin, SendHorizonal, } from "lucide-react";
import { InputField } from "../shared/input-field";
import { baseUrl } from "@/utils/api-url";
import { Button } from "../shared/button";
import AlertBox from "../shared/alert";
type BorrowerDTO = {
    id: string;
    borrowerId: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}
export const EditBorrowerForm = ({ borrower }: { borrower: BorrowerDTO }) => {
    const [alert, setAlert] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(baseUrl + `/borrowers/${borrower.id}`, {
                credentials: 'include',
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, }),
            });

            const result = await res.json();
            if (result.success) {
                setAlert({ type: 'success', message: 'Borrower successfully updated!' })
                setFormData({});
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
                    label="Borrower ID"
                    name="borrowerId"
                    placeholder="eg. B-0001"
                    defaultValue={borrower.borrowerId}
                    onChange={handleChange}
                    required={true}
                    disabled={true}
                />
                <InputField
                    icon={<User className="w-4 h-4" />}
                    label="Full Name"
                    name="name"
                    defaultValue={borrower.name}
                    onChange={handleChange}
                    required={true}
                />

                <InputField
                    icon={<Phone className="w-4 h-4" />}
                    label="Phone Number"
                    name="phone"
                    defaultValue={borrower.phone}
                    onChange={handleChange}
                    type="tel"
                />

                <InputField
                    icon={<Mail className="w-4 h-4" />}
                    label="Email"
                    name="email"
                    defaultValue={borrower.email}
                    onChange={handleChange}
                    type="email"
                />

                <InputField
                    icon={<MapPin className="w-4 h-4" />}
                    label="Address"
                    name="address"
                    defaultValue={borrower.address}
                    onChange={handleChange}
                />
            </div>


            <div className="flex justify-end">
                <Button disabled={loading || Object.keys(formData).length <= 0} icon={<SendHorizonal className="w-4 h-4" />} >Submit</Button>
            </div>
        </form>
    );
};
