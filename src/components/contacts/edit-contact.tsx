"use client";

import React, { useState } from "react";
import { User, Phone, Mail, MapPin, SendHorizonal } from "lucide-react";
import { InputField } from "../shared/input-field";
import { baseUrl } from "@/utils/api-url";
import { Button } from "../shared/button";
import AlertBox from "../shared/alert";
import { useContacts } from "@/contexts/contact-context";

type ContactDTO = {
    _id: string;
    contactId: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}

interface EditContactFormProps {
    contact: ContactDTO;
    onSuccess?: () => void;
}

export const EditContactForm = ({ contact, onSuccess }: EditContactFormProps) => {
    const [alert, setAlert] = useState({ type: '', message: '' })
    const [loading, setLoading] = useState(false)
    const { setContacts } = useContacts();
    const [formData, setFormData] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await fetch(baseUrl + `/contacts/${contact._id}`, {
                credentials: 'include',
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData }),
            });

            const result = await res.json();
            if (result.success) {
                setAlert({ type: 'success', message: 'Contact successfully updated!' })
                
                // Update local state
                setContacts(prev => prev.map(c => c._id === contact._id ? { ...c, ...formData } : c));
                
                if (onSuccess) {
                    setTimeout(() => onSuccess(), 1000);
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
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Contact</h2>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                    ID: {contact.contactId}
                </span>
            </div>

            {(alert.message && alert.type) && <AlertBox type={alert.type as 'info' | 'error' | 'warning' | 'success'} message={alert.message} />}
            
            <div className="grid grid-cols-1 gap-4">
                <InputField
                    icon={<User className="w-4 h-4" />}
                    label="Full Name"
                    name="name"
                    defaultValue={contact.name}
                    onChange={handleChange}
                    required={true}
                />

                <InputField
                    icon={<Phone className="w-4 h-4" />}
                    label="Phone Number"
                    name="phone"
                    defaultValue={contact.phone}
                    onChange={handleChange}
                    type="tel"
                    required={true}
                />

                <InputField
                    icon={<Mail className="w-4 h-4" />}
                    label="Email (Optional)"
                    name="email"
                    defaultValue={contact.email}
                    onChange={handleChange}
                    type="email"
                />

                <InputField
                    icon={<MapPin className="w-4 h-4" />}
                    label="Address (Optional)"
                    name="address"
                    defaultValue={contact.address}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-end pt-4">
                <Button disabled={loading || Object.keys(formData).length <= 0} icon={<SendHorizonal className="w-4 h-4" />} >
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
};
