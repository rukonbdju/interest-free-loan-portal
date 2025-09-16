'use client'
import { useState } from 'react';
import { FileText, Search, Filter, Eye, Download, RefreshCw, Trash2 } from "lucide-react";

interface Agreement {
    id: string;
    borrowerName: string;
    loanAmount: number;
    startDate: string;
    dueDate: string;
    status: "active" | "completed" | "draft";
}

interface AgreementsPageProps {
    agreements: Agreement[];
    onView: (id: string) => void;
    onDownload: (id: string) => void;
    onRegenerate: (id: string) => void;
    onDelete: (id: string) => void;
}

const DUMMY_AGREEMENTS: Agreement[] = [
    {
        id: "AGR-001",
        borrowerName: "John Doe",
        loanAmount: 1500,
        startDate: "2023-01-15",
        dueDate: "2024-01-15",
        status: "active",
    },
    {
        id: "AGR-002",
        borrowerName: "Jane Smith",
        loanAmount: 2500,
        startDate: "2022-10-20",
        dueDate: "2023-10-20",
        status: "completed",
    },
    {
        id: "AGR-003",
        borrowerName: "Sam Wilson",
        loanAmount: 500,
        startDate: "2023-03-01",
        dueDate: "2024-03-01",
        status: "draft",
    },
    {
        id: "AGR-004",
        borrowerName: "Sarah Johnson",
        loanAmount: 3000,
        startDate: "2023-05-10",
        dueDate: "2024-05-10",
        status: "active",
    },
    {
        id: "AGR-005",
        borrowerName: "Michael Lee",
        loanAmount: 1200,
        startDate: "2023-06-25",
        dueDate: "2024-06-25",
        status: "active",
    },
];

const getStatusBadge = (status: "active" | "completed" | "draft") => {
    switch (status) {
        case "active":
            return <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Active</span>;
        case "completed":
            return <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">Completed</span>;
        case "draft":
            return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">Draft</span>;
    }
};

const AgreementsPage = ({
    agreements = DUMMY_AGREEMENTS,
    onView = (id: string) => console.log(`View agreement: ${id}`),
    onDownload = (id: string) => console.log(`Download agreement: ${id}`),
    onRegenerate = (id: string) => console.log(`Regenerate agreement: ${id}`),
    onDelete = (id: string) => console.log(`Delete agreement: ${id}`),
}: AgreementsPageProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredAgreements = agreements.filter(agreement => {
        const matchesSearch = agreement.id.toLowerCase().includes(searchTerm.toLowerCase()) || agreement.borrowerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'All' || agreement.status === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen ">
            <div className="w-full mx-auto">
                <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                    <FileText className="text-gray-500" />
                    Loan Agreements
                </h1>
                <p className="mt-1 text-gray-600">
                    Manage all your loan agreements in one place.
                </p>

                <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by ID or borrower"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="appearance-none rounded-md border border-gray-300 bg-white py-2 pl-10 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Draft">Draft</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                {filteredAgreements.length > 0 ? (
                    <>
                        {/* Desktop Table */}
                        <div className="mt-8 hidden overflow-hidden rounded-lg bg-white shadow-sm md:block">
                            <div className="w-full">
                                <div className="grid grid-cols-6 gap-x-4 border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    <span>Agreement ID</span>
                                    <span>Borrower Name</span>
                                    <span>Loan Amount</span>
                                    <span>Start Date</span>
                                    <span>Due Date</span>
                                    <span>Status</span>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {filteredAgreements.map((agreement) => (
                                        <div key={agreement.id} className="grid grid-cols-6 items-center gap-x-4 px-6 py-4 text-sm text-gray-800 transition-colors duration-150 ease-in-out hover:bg-gray-50">
                                            <span>{agreement.id}</span>
                                            <span>{agreement.borrowerName}</span>
                                            <span>${agreement.loanAmount.toLocaleString()}</span>
                                            <span>{agreement.startDate}</span>
                                            <span>{agreement.dueDate}</span>
                                            <div className="flex items-center justify-between">
                                                {getStatusBadge(agreement.status)}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => onView(agreement.id)}
                                                        className="group relative rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-blue-600"
                                                        aria-label="View"
                                                    >
                                                        <Eye size={18} />
                                                        <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">View</span>
                                                    </button>
                                                    <button
                                                        onClick={() => onDownload(agreement.id)}
                                                        className="group relative rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-blue-600"
                                                        aria-label="Download"
                                                    >
                                                        <Download size={18} />
                                                        <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">Download</span>
                                                    </button>
                                                    <button
                                                        onClick={() => onRegenerate(agreement.id)}
                                                        className="group relative rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-blue-600"
                                                        aria-label="Regenerate"
                                                    >
                                                        <RefreshCw size={18} />
                                                        <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">Regenerate</span>
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(agreement.id)}
                                                        className="group relative rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-red-600"
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                        <span className="tooltip absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-gray-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Cards */}
                        <div className="mt-8 grid gap-4 md:hidden">
                            {filteredAgreements.map((agreement) => (
                                <div key={agreement.id} className="overflow-hidden rounded-lg bg-white p-4 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-semibold text-gray-900">{agreement.borrowerName}</div>
                                        {getStatusBadge(agreement.status)}
                                    </div>
                                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                                        <p>
                                            <span className="font-medium text-gray-500">ID:</span> {agreement.id}
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Amount:</span> ${agreement.loanAmount.toLocaleString()}
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-500">Due:</span> {agreement.dueDate}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            onClick={() => onView(agreement.id)}
                                            className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-blue-600"
                                            aria-label="View"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDownload(agreement.id)}
                                            className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-blue-600"
                                            aria-label="Download"
                                        >
                                            <Download size={18} />
                                        </button>
                                        <button
                                            onClick={() => onRegenerate(agreement.id)}
                                            className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-blue-600"
                                            aria-label="Regenerate"
                                        >
                                            <RefreshCw size={18} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(agreement.id)}
                                            className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-red-600"
                                            aria-label="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="mt-12 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center text-gray-500">
                        <FileText size={48} className="text-gray-400" />
                        <p className="mt-4 text-lg font-medium">No agreements found.</p>
                        <p className="mt-1 text-sm">Create a new agreement to get started.</p>
                        <button className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Generate New Agreement
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgreementsPage;
