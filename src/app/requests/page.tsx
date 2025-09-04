'use client';
import React, { useState } from 'react';
import type { FC, SVGProps } from 'react';

// --- TYPE DEFINITIONS ---
type ReputationBadge = "ID_VERIFIED" | "GOOD_BORROWER" | "NEW_USER";
type LoanStatus = "funding" | "pending" | "active" | "completed";

interface LoanRequest {
    id: number;
    borrower: string;
    avatarUrl: string;
    purpose: string;
    amountRequested: number;
    amountFunded: number;
    repaymentDuration: string;
    installments: number;
    status: LoanStatus;
    reputation: ReputationBadge[];
}

// --- MOCK DATA ---
const mockLoanRequests: LoanRequest[] = [
    {
        id: 1,
        borrower: "Ahmed Ali",
        avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=AA",
        purpose: "Medical Emergency for a Family Member",
        amountRequested: 500,
        amountFunded: 300,
        repaymentDuration: "6 months",
        installments: 6,
        status: "funding",
        reputation: ["ID_VERIFIED", "GOOD_BORROWER"],
    },
    {
        id: 2,
        borrower: "Fatima Zahra",
        avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=FZ",
        purpose: "Startup Capital for Small Home Business",
        amountRequested: 1200,
        amountFunded: 1200,
        repaymentDuration: "12 months",
        installments: 12,
        status: "completed",
        reputation: ["ID_VERIFIED", "GOOD_BORROWER"],
    },
    {
        id: 3,
        borrower: "Yusuf Ibrahim",
        avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=YI",
        purpose: "Educational Fees for University",
        amountRequested: 2000,
        amountFunded: 800,
        repaymentDuration: "24 months",
        installments: 24,
        status: "funding",
        reputation: ["ID_VERIFIED"],
    },
    {
        id: 4,
        borrower: "Maryam Abdullah",
        avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=MA",
        purpose: "Urgent Home Repairs",
        amountRequested: 800,
        amountFunded: 0,
        repaymentDuration: "4 months",
        installments: 4,
        status: "pending",
        reputation: ["NEW_USER"],
    },
    {
        id: 5,
        borrower: "Omar Hassan",
        avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=OH",
        purpose: "Purchase a Laptop for Freelance Work",
        amountRequested: 750,
        amountFunded: 750,
        repaymentDuration: "8 months",
        installments: 8,
        status: "active",
        reputation: ["ID_VERIFIED", "GOOD_BORROWER"],
    },
    {
        id: 6,
        borrower: "Aisha Khan",
        avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=AK",
        purpose: "Covering Wedding Expenses",
        amountRequested: 3000,
        amountFunded: 1500,
        repaymentDuration: "18 months",
        installments: 18,
        status: "funding",
        reputation: ["ID_VERIFIED"],
    },
];

// --- SVG ICONS (for better self-containment) ---
const SearchIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const FilterIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);

const CheckCircleIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const ShieldCheckIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>
    </svg>
);

const UserPlusIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="17" y1="11" x2="23" y2="11"></line>
    </svg>
);

// --- HELPER COMPONENTS ---

const StatusBadge: FC<{ status: LoanStatus }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full capitalize";
    const statusStyles = {
        pending: "bg-yellow-100 text-yellow-800",
        funding: "bg-blue-100 text-blue-800",
        active: "bg-emerald-100 text-emerald-800",
        completed: "bg-gray-200 text-gray-800",
    };
    return <span className={`${baseClasses} ${statusStyles[status]}`}>{status}</span>;
};

const ReputationBadge: FC<{ badge: ReputationBadge }> = ({ badge }) => {
    const badgeStyles = {
        ID_VERIFIED: { icon: <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />, text: "ID Verified", classes: "bg-emerald-50 text-emerald-700" },
        GOOD_BORROWER: { icon: <CheckCircleIcon className="w-4 h-4 text-yellow-500" />, text: "Good Borrower", classes: "bg-yellow-50 text-yellow-700" },
        NEW_USER: { icon: <UserPlusIcon className="w-4 h-4 text-gray-500" />, text: "New User", classes: "bg-gray-100 text-gray-600" },
    };

    const { icon, text, classes } = badgeStyles[badge];

    return (
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${classes}`}>
            {icon} {text}
        </span>
    );
};

// --- CORE UI COMPONENTS ---

const FilterBar: FC = () => {
    return (
        <div className="mb-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                {/* Search Bar */}
                <div className="relative md:col-span-3 lg:col-span-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by borrower or purpose..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    />
                </div>

                {/* Filters */}
                <select className="w-full border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white">
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>Funding</option>
                    <option>Active</option>
                    <option>Completed</option>
                </select>

                <select className="w-full border border-gray-200 rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition bg-white">
                    <option>Any Amount</option>
                    <option>Under $500</option>
                    <option>$500 - $1000</option>
                    <option>Over $1000</option>
                </select>
            </div>
        </div>
    );
};

const LoanRequestCard: FC<{ request: LoanRequest; onFund: (request: LoanRequest) => void }> = ({ request, onFund }) => {
    const { borrower, avatarUrl, purpose, amountRequested, amountFunded, repaymentDuration, installments, status, reputation } = request;
    const percentageFunded = Math.min(Math.round((amountFunded / amountRequested) * 100), 100);
    const isFullyFunded = amountFunded >= amountRequested;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <img src={avatarUrl} alt={borrower} className="w-14 h-14 rounded-full border-2 border-gray-200" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">{borrower}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {reputation.map(badge => <ReputationBadge key={badge} badge={badge} />)}
                            </div>
                        </div>
                    </div>
                    <StatusBadge status={status} />
                </div>

                {/* Loan Details */}
                <p className="text-gray-600 mb-4 h-12">{purpose}</p>

                {/* Funding Progress */}
                <div className="mb-5">
                    <div className="flex justify-between items-end mb-1 text-gray-700">
                        <span className="text-2xl font-bold text-emerald-600">${amountFunded.toLocaleString()}</span>
                        <span className="text-sm font-medium"> of ${amountRequested.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${percentageFunded}%` }}
                        ></div>
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-1">{percentageFunded}% funded</div>
                </div>

                {/* Repayment Info */}
                <div className="grid grid-cols-2 gap-4 text-center border-t border-b border-gray-100 py-4 mb-6">
                    <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-semibold text-gray-800">{repaymentDuration}</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500">Installments</div>
                        <div className="font-semibold text-gray-800">{installments}</div>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            {isFullyFunded ? (
                <button disabled className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed">
                    <CheckCircleIcon className="w-5 h-5" />
                    Fully Funded
                </button>
            ) : (
                <button
                    onClick={() => onFund(request)}
                    className="w-full py-3 px-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                    Fund Now
                </button>
            )}
        </div>
    );
};

const FundModal: FC<{ request: LoanRequest | null; isOpen: boolean; onClose: () => void }> = ({ request, isOpen, onClose }) => {
    if (!isOpen || !request) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 m-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Fund Loan for {request.borrower}</h2>
                <p className="text-gray-600 mb-6">Contribute to their goal of ${request.amountRequested.toLocaleString()}.</p>

                <div className="mb-6">
                    <label htmlFor="pledgeAmount" className="block text-sm font-medium text-gray-700 mb-1">Pledge Amount ($)</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                        <input
                            type="number"
                            id="pledgeAmount"
                            placeholder="0.00"
                            className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        ${(request.amountRequested - request.amountFunded).toLocaleString()} still needed.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { alert('Pledge Submitted!'); onClose(); }}
                        className="w-full py-3 px-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition"
                    >
                        Confirm Pledge
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN PAGE COMPONENT ---
const LoanRequestsPage: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<LoanRequest | null>(null);

    const handleFundClick = (request: LoanRequest) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequest(null);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto">
                {/* Page Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Loan Requests</h1>
                    <p className="text-gray-600 mt-1">Browse and fund borrower requests that align with your values.</p>
                </header>

                {/* Filter and Search Bar */}
                <FilterBar />

                {/* Loan Requests Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockLoanRequests.map((request) => (
                        <LoanRequestCard key={request.id} request={request} onFund={handleFundClick} />
                    ))}
                </div>
            </div>

            {/* Funding Modal */}
            <FundModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                request={selectedRequest}
            />
        </div>
    );
};

export default LoanRequestsPage;
