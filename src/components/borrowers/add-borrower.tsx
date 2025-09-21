"use client";

import React, { useState } from "react";
import { User, Phone, Mail, IdCard, MapPin } from "lucide-react";
import { InputField } from "../shared/input-field";
import { useAuth } from "@/contexts/auth-context";
import { baseUrl } from "@/utils/api-url";

export const CreateBorrowerForm: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        nid: "",
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
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, createdBy: user?._id }),
            });

            const result = await res.json();
            if (result.success) {
                alert('Borrower successfully created!')
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    nid: "",
                    address: "",
                });
            } else {
                console.log(result)
                if (result?.status && result.status < 500) {
                    alert(result?.message || 'Something went wrong, try again!')
                }
            }

        } catch (error) {
            console.log(error);
            alert('Something went wrong, try again!')
        } finally {
            setLoading(false)
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className=" p-4 bg-white rounded-xl space-y-4 shadow-md"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    icon={<IdCard className="w-4 h-4" />}
                    label="NID"
                    name="nid"
                    value={formData.nid}
                    onChange={handleChange}
                />

                <InputField
                    icon={<MapPin className="w-4 h-4" />}
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>


            <button
                disabled={loading}
                type="submit"
                className="px-3 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition"
            >
                Create User
            </button>
        </form>
    );
};
