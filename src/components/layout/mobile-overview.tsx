'use client';

import { useLayout } from "@/contexts/layout-context";

const MobileOverlay = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useLayout()
    return (
        <>
            {isSidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
        </>

    )
}

export default MobileOverlay;
