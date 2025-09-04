
'use client'
import React, { useState } from 'react';
import Sidebar from '@/components/dashbord-layout/sidebar';
import Header from '@/components/dashbord-layout/header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const mockUser = {
        name: 'Abdullah Ahmed',
        avatarUrl: `https://placehold.co/100x100/28a745/FFFFFF?text=A`,
    };
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            <Sidebar isSidebarOpen={isSidebarOpen} />
            <div className="md:ml-64 transition-all duration-300 ease-in-out">
                <Header isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
        </div>
    );
};

export default MainLayout;

