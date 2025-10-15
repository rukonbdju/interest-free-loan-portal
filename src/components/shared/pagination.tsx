'use client'
import React from "react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    totalPages,
    onPageChange,
}) => {
    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    return (
        <div className="flex items-center justify-end gap-3 mt-6">
            {/* Prev Button */}
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors
          ${page === 1
                        ? "cursor-not-allowed opacity-50 bg-gray-100 text-gray-400 border-gray-200"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
            >
                ← Prev
            </button>

            {/* Page Info */}
            <span className="text-sm font-medium text-gray-700">
                Page {page} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={page === totalPages || totalPages === 0}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors
          ${page === totalPages || totalPages === 0
                        ? "cursor-not-allowed opacity-50 bg-gray-100 text-gray-400 border-gray-200"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
            >
                Next →
            </button>
        </div>
    );
};

export default Pagination;
