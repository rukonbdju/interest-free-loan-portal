import { MOCK_BORROWERS } from '@/lib/mock-data';
import {
    Plus,
    Search,
    Eye,
    Pencil,
    Trash,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import Link from 'next/link';



const App = () => {

    return (
        <div className="min-h-screen">
            <div className="w-full mx-auto">
                {/* Page Title & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Borrowers</h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <Plus size={20} />
                        <span className="font-medium">Add New Borrower</span>
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
                                placeholder="Search by name, phone, or ID..."
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
                                Active
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300 `}
                            >
                                Overdue
                            </button>
                        </div>
                    </div>

                    {/* Borrowers Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Total Loans
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Active Loans
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Outstanding
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {MOCK_BORROWERS.length > 0 ? (
                                    MOCK_BORROWERS.map((borrower) => (
                                        <tr key={borrower.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {borrower.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {borrower.phone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {borrower.totalLoansTaken}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {borrower.activeLoans}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${borrower.outstandingBalance.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${borrower.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {borrower.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <Link title='View' className="text-gray-500 hover:text-gray-900 transition-colors" href={"/borrowers/" + borrower.id}>
                                                        <Eye size={18} />
                                                    </Link>
                                                    <button
                                                        title="Edit"
                                                        className="text-gray-500 hover:text-gray-900 transition-colors"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        title="Delete"
                                                        className="text-gray-500 hover:text-gray-900 transition-colors"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                            No borrowers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
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
                </div>
            </div>
        </div>
    );
};

export default App;
