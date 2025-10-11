import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// 1. Define the props for the modal component
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

// 2. The Reusable Modal Component (Now controlled by props)
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children
}) => {
    const [isMounted, setIsMounted] = useState(false);

    // Ensure the component only renders on the client side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !isOpen) {
        return null;
    }

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            aria-modal="true"
            role="dialog"
        >
            {/* Modal Content */}
            <div
                className="relative m-4 w-full max-w-xl transform rounded-2xl bg-white text-gray-800 shadow-2xl transition-all duration-300 ease-in-out"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;

