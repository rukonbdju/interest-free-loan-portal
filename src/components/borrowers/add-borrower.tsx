"use client";

import React, { useState } from "react";
import { User, Phone, Mail, IdCard, MapPin, SendHorizonal, } from "lucide-react";
import { InputField } from "../shared/input-field";
import { useAuth } from "@/contexts/auth-context";
import { baseUrl } from "@/utils/api-url";
import { Button } from "../shared/button";
import AlertBox from "../shared/alert";

export const CreateBorrowerForm: React.FC = () => {
    const [alert, setAlert] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        borrowerId: "",
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(baseUrl + '/borrowers', {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, createdBy: user?._id }),
            });

            const result = await res.json();
            console.log(result)
            if (result.success) {
                setAlert({ type: 'success', message: 'Borrower successfully created!' })
                setFormData({
                    borrowerId: "",
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                });
            } else {
                console.log(result)
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
                    value={formData.borrowerId}
                    onChange={handleChange}
                    required={true}
                />
                <InputField
                    icon={<User className="w-4 h-4" />}
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={true}
                />

                <InputField
                    icon={<Phone className="w-4 h-4" />}
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                />

                <InputField
                    icon={<Mail className="w-4 h-4" />}
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                />

                <InputField
                    icon={<MapPin className="w-4 h-4" />}
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>


            <div className="flex justify-end">
                <Button disabled={loading} icon={<SendHorizonal className="w-4 h-4" />} >Submit</Button>
            </div>
        </form>
    );
};
