'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Contact } from "@/types";
import { baseUrl } from "@/utils/api-url";

interface ContactContextType {
    contacts: Contact[];
    total: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    fetchContacts: (page?: number, limit?: number, search?: string) => Promise<void>;
    deleteContact: (id: string) => void;
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchContacts = useCallback(async (page: number = 1, limit: number = 10, search: string = "") => {
        if (!user?._id) return;
        setLoading(true);
        try {
            const query = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                search: search
            }).toString();

            const res = await fetch(`${baseUrl}/contacts/creator/${user._id}?${query}`, {
                method: "GET",
                credentials: 'include',
                cache: 'no-store'
            });

            const result = await res.json();
            if (result?.success) {
                setContacts(result.contacts || []);
                setTotal(result.total || 0);
                setTotalPages(result.totalPages || 0);
                setError(null);
            } else {
                setError(result?.message || "Failed to load contacts");
            }
        } catch (err) {
            console.error("Error fetching contacts:", err);
            setError("Failed to load contacts");
        } finally {
            setLoading(false);
        }
    }, [user?._id]);

    const deleteContact = (id: string) => {
        setContacts(prev => prev.filter(item => item._id !== id));
        setTotal(prev => prev - 1);
    }

    return (
        <ContactContext.Provider value={{ 
            contacts, 
            total, 
            totalPages, 
            loading, 
            error, 
            fetchContacts, 
            deleteContact,
            setContacts,
            setTotal
        }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContacts = (): ContactContextType => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error("useContacts must be used within a ContactProvider");
    }
    return context;
};
