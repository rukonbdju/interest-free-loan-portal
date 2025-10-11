'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Loan, Payment } from "@/types";
import { baseUrl } from "@/utils/api-url";

interface LoanPaymentContextType {
    loan: Loan | null;
    loading: boolean;
    error: string | null;
    setLoan: React.Dispatch<React.SetStateAction<Loan | null>>;
    addNewPayment: (payment: Payment) => void;
    updatePayment: (payment: Payment) => void;
    deletePayment: (id: string) => void;
}

const LoanContext = createContext<LoanPaymentContextType | undefined>(undefined);

export const LoanPaymentProvider = ({ children, id }: { children: ReactNode, id: string; }) => {
    const { user } = useAuth();
    const [loan, setLoan] = useState<Loan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadLoans = async () => {
            if (!user?._id) return;
            setLoading(true);
            try {
                const res = await fetch(baseUrl + `/loans/${id}`, { method: "GET", credentials: 'include' });
                const result = await res.json();
                if (result?.success) {
                    setLoan(result.data)
                    setError(null);
                } else {
                    setError(result?.message || "Failed to load loan")
                }
            } catch (err) {
                console.error("Error fetching loan:", err);
                if (err instanceof Error) {
                    setError(err?.message || "Failed to load loan");
                }
            } finally {
                setLoading(false);
            }
        };
        loadLoans();
    }, [user?._id, id]);

    const addNewPayment = (payment: Payment) => {
        setLoan((prev) => ({ ...prev, payments: [...prev?.payments, payment] }))
    }

    const deletePayment = (id: string) => {
        setLoan(prev => ({
            ...prev,
            payments: prev?.payments.filter(item => item._id !== id)
        }))
    }

    const updatePayment = (payment: Payment) => {
        setLoan(prev => ({
            ...prev,
            payments: prev?.payments.map(item => item._id === payment._id ? payment : item)
        }))
    }

    return (
        <LoanContext.Provider value={{ loan, loading, error, setLoan, addNewPayment, deletePayment, updatePayment }}>
            {children}
        </LoanContext.Provider>
    );
};

export const useLoanPayment = (): LoanPaymentContextType => {
    const context = useContext(LoanContext);
    if (!context) {
        throw new Error("useLoans must be used within a LoanProvider");
    }
    return context;
};
