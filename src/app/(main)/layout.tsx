
import Header from "@/components/layout/header";
import MobileOverlay from "@/components/layout/mobile-overview";
import Sidebar from "@/components/layout/sidebar";
import { LayoutProvider } from "@/contexts/layout-context";
import ProtectedLayout from "@/lib/protected-layout";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ProtectedLayout>
            <LayoutProvider>
                <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
                    <Sidebar />
                    <div className="md:ml-64 transition-all duration-300 ease-in-out">
                        <Header />
                        <main className="p-4 sm:p-6 lg:p-8">
                            {children}
                        </main>
                    </div>
                    <MobileOverlay />
                </div>
            </LayoutProvider>
        </ProtectedLayout>
    )
}

export default MainLayout;