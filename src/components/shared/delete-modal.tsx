import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

// 1. Define the props for the modal component
interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

// 2. The Reusable Modal Component (Now controlled by props)
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    // Ensure the component only renders on the client side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle escape key to close modal
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    if (!isMounted || !isOpen) {
        return null;
    }

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            {/* Modal Content */}
            <div
                className="relative m-4 w-full max-w-md transform rounded-2xl bg-white text-gray-800 shadow-2xl transition-all duration-300 ease-in-out"
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
                    <div className="flex flex-col items-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-10 w-10 text-red-500" />
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold mb-2 text-center">{title || 'Confirm Deletion'}</h2>

                        {/* Description */}
                        <p className="text-gray-600 mb-8 text-center w-full break-words whitespace-normal">
                            {description || 'Are you sure you want to proceed? This action cannot be undone.'}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex w-full gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 rounded-lg border border-gray-300 bg-transparent px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-all duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;

