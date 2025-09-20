"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface ProtectedLayoutProps {
    children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login"); // redirect if not authenticated
        }
    }, [loading, user, router]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-gray-500">Loading...</span>
            </div>
        );
    }

    return <>{children}</>;
}
