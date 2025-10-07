'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Borrower } from "@/types";
import { baseUrl } from "@/utils/api-url";

interface BorrowerContextType {
    borrowers: Borrower[];
    loading: boolean;
    error: string | null;
    setBorrowers: React.Dispatch<React.SetStateAction<Borrower[]>>;
    deleteBorrower: (id: string) => void;
}

const BorrowerContext = createContext<BorrowerContextType | undefined>(undefined);

export const BorrowerProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [borrowers, setBorrowers] = useState<Borrower[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const deleteBorrower = (id: string) => {
        setBorrowers(prev => prev.filter(item => item._id !== id))
    }

    useEffect(() => {
        const loadBorrowers = async () => {
            if (!user?._id) return;
            setLoading(true);
            try {
                const res = await fetch(baseUrl + `/borrowers/creator/${user._id}`, { method: "GET", credentials: 'include', cache: 'no-store' });
                const result = await res.json();
                if (result?.success) {
                    setBorrowers(result.data || [])
                    setError(null);
                } else {
                    setError(result?.message || "Failed to load borrowers")
                }
            } catch (err) {
                console.error("Error fetching borrowers:", err);
                if (err instanceof Error) {
                    setError(err?.message || "Failed to load borrowers");
                }
            } finally {
                setLoading(false);
            }
        };
        loadBorrowers();
    }, [user?._id]);

    return (
        <BorrowerContext.Provider value={{ borrowers, loading, error, setBorrowers, deleteBorrower }}>
            {children}
        </BorrowerContext.Provider>
    );
};

export const useBorrowers = (): BorrowerContextType => {
    const context = useContext(BorrowerContext);
    if (!context) {
        throw new Error("useBorrowers must be used within a BorrowerProvider");
    }
    return context;
};
