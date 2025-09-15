'use client';
import React, { createContext, useContext, useState } from "react";

export interface LayoutContextType {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Create context
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <LayoutContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </LayoutContext.Provider>
    )
}

// Custom hook
export const useLayout = (): LayoutContextType => {
    const context = useContext(LayoutContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};