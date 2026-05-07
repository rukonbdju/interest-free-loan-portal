"use client";

import React, { useState } from "react";
import { User, Phone, Mail, MapPin, SendHorizonal } from "lucide-react";
import { InputField } from "../shared/input-field";
import { useAuth } from "@/contexts/auth-context";
import { baseUrl } from "@/utils/api-url";
import { Button } from "../shared/button";
import AlertBox from "../shared/alert";
import { useContacts } from "@/contexts/contact-context";

interface CreateContactFormProps {
    onSuccess?: () => void;
}

export const CreateContactForm: React.FC<CreateContactFormProps> = ({ onSuccess }) => {
    const [alert, setAlert] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const { contacts, setContacts, setTotal } = useContacts()
    const [formData, setFormData] = useState({
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

        // 🔍 Check for unique phone number locally first
        const isPhoneDuplicate = contacts.some(c => c.phone === formData.phone);
        if (isPhoneDuplicate) {
            setAlert({ type: 'error', message: 'This phone number is already registered to another contact.' });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(baseUrl + '/contacts', {
                credentials: 'include',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, createdBy: user?._id }),
            });

            const result = await res.json();
            if (result.success) {
                setAlert({ type: 'success', message: 'Contact successfully created!' })
                setContacts(prev => [result.data, ...prev]); // Add to start of list
                setTotal(prev => prev + 1); // Update total count for stats
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                });
                if (onSuccess) {
                    setTimeout(() => onSuccess(), 1500);
                }
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Contact</h2>
            {(alert.message && alert.type) && <AlertBox type={alert.type as 'info' | 'error' | 'warning' | 'success'} message={alert.message} />}
            
            <div className="grid grid-cols-1 gap-4">
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
                    required={true}
                />

                <InputField
                    icon={<Mail className="w-4 h-4" />}
                    label="Email (Optional)"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                />

                <InputField
                    icon={<MapPin className="w-4 h-4" />}
                    label="Address (Optional)"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-end pt-4">
                <Button disabled={loading} icon={<SendHorizonal className="w-4 h-4" />} >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
        </form>
    );
};
