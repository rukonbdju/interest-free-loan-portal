'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Loan } from "@/types";
import { baseUrl } from "@/utils/api-url";

interface LoanContextType {
    loans: Loan[];
    loading: boolean;
    error: string | null;
    setLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
    deleteLoan: (id: string) => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const deleteLoan = (id: string) => {
        setLoans(prev => prev.filter(item => item._id !== id))
    }

    useEffect(() => {
        const loadLoans = async () => {
            if (!user?._id) return;
            setLoading(true);
            try {
                const res = await fetch(baseUrl + `/loans/creator/${user._id}`, { method: "GET", credentials: 'include', cache: 'no-store' });
                const result = await res.json();
                if (result?.success) {
                    setLoans(result.data || [])
                    setError(null);
                } else {
                    setError(result?.message || "Failed to load loans")
                }
            } catch (err) {
                console.error("Error fetching loans:", err);
                if (err instanceof Error) {
                    setError(err?.message || "Failed to load loans");
                }
            } finally {
                setLoading(false);
            }
        };
        loadLoans();
    }, [user?._id]);

    return (
        <LoanContext.Provider value={{ loans, loading, error, setLoans, deleteLoan }}>
            {children}
        </LoanContext.Provider>
    );
};

export const useLoans = (): LoanContextType => {
    const context = useContext(LoanContext);
    if (!context) {
        throw new Error("useLoans must be used within a LoanProvider");
    }
    return context;
};
