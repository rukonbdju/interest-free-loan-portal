import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
    return (
        <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-semibold">
                    {1}
                </span>{' '}
                to{' '}
                <span className="font-semibold">
                    {7}
                </span>{' '}
                of <span className="font-semibold">{7}</span>{' '}
                results
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={20} />
                </button>
                <span className="px-2 text-sm text-gray-800 font-medium">
                    Page {1} of {1}
                </span>
                <button
                    className="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}

export default Pagination;