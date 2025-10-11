"use client";

import { baseUrl } from "@/utils/api-url";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

export interface UserDTO {
    _id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}

export interface AuthContextType {
    user: UserDTO | null;
    setUser: React.Dispatch<React.SetStateAction<UserDTO | null>>
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const res = await fetch(baseUrl + "/auth/me", {
                credentials: "include",
            });
            if (!res.ok) {
                setUser(null);
            }
            const result = await res.json();
            if (result.success) {
                setUser(result.data)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.log(error)
            setUser(null);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetch(baseUrl + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error("Login failed");
        await refreshUser();
    };

    const logout = async () => {
        await fetch(baseUrl + "/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
