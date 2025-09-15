
import LoansTable from '@/components/loans/loans-table';
import Pagination from '@/components/shared/pagination';
import {
    Plus,
    Search,
} from 'lucide-react';

const LoansPage = () => {

    return (
        <div className="min-h-screen">
            <div className="w-full mx-auto">
                {/* Page Title & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Loans</h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Plus size={20} />
                        <span className="font-medium">Add New Loan</span>
                    </button>
                </div>

                {/* Card Container */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <div className="relative w-full md:w-80">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by Borrower Name or Loan ID"
                                className="w-full pl-10 pr-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-800 text-white`}
                            >
                                All
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300`}
                            >
                                Paid
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300`}
                            >
                                Active
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 `}
                            >
                                Overdue
                            </button>
                        </div>
                    </div>
                    <LoansTable />
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

export default LoansPage;
