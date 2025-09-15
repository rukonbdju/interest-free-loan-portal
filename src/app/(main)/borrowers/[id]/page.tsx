"use client";

import React from "react";
import { User, Phone, Mail, MapPin, CreditCard, Wallet, ClipboardList, TrendingUp, DollarSign, Plus, Download, Edit, Trash } from "lucide-react";

// Define TypeScript interfaces for data structures
interface Borrower {
    name: string;
    phone: string;
    email: string;
    address: string;
    idProof?: string;
}

interface LoanSummary {
    totalLoans: number;
    activeLoans: number;
    paidLoans: number;
    outstandingBalance: number;
}

interface LoanHistoryItem {
    id: string;
    amount: number;
    startDate: string;
    dueDate: string;
    status: "Paid" | "Active";
    remainingBalance: number;
}

interface RepaymentHistoryItem {
    id: string;
    date: string;
    amountPaid: number;
    method: string;
    remainingBalance: number;
}

// Mock data now uses the defined interfaces
const borrower: Borrower = {
    name: "Jane Doe",
    phone: "+1 (555) 123-4567",
    email: "jane.doe@example.com",
    address: "123 Maple Street, Anytown, USA 12345",
    idProof: "Driver's License #XYZ789",
};

const loanSummary: LoanSummary = {
    totalLoans: 5,
    activeLoans: 2,
    paidLoans: 3,
    outstandingBalance: 1250.00,
};

const loanHistory: LoanHistoryItem[] = [
    { id: "L001", amount: 500.00, startDate: "2023-01-15", dueDate: "2023-04-15", status: "Paid", remainingBalance: 0.00 },
    { id: "L002", amount: 750.00, startDate: "2023-05-20", dueDate: "2023-08-20", status: "Active", remainingBalance: 750.00 },
    { id: "L003", amount: 300.00, startDate: "2023-09-10", dueDate: "2023-12-10", status: "Active", remainingBalance: 300.00 },
];

const repaymentHistory: RepaymentHistoryItem[] = [
    { id: "R001", date: "2023-03-01", amountPaid: 150.00, method: "Bank Transfer", remainingBalance: 350.00 },
    { id: "R002", date: "2023-03-15", amountPaid: 350.00, method: "Credit Card", remainingBalance: 0.00 },
    { id: "R003", date: "2023-06-05", amountPaid: 200.00, method: "Cash", remainingBalance: 550.00 },
];

// Define prop types for components
interface InfoItemProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

interface SummaryCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
}

interface ActionButtonProps {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
}

interface TableContainerProps {
    title: string;
    children: React.ReactNode;
}

const InfoItem = ({ icon: Icon, label, value }: InfoItemProps) => (
    <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400" />
        <div>
            <div className="text-sm font-medium text-gray-500">{label}</div>
            <div className="font-semibold text-gray-800">{value}</div>
        </div>
    </div>
);

const SummaryCard = ({ title, value, icon: Icon, color }: SummaryCardProps) => (
    <div className={`flex items-center gap-4 rounded-xl p-6 shadow-sm border border-gray-100 ${color}`}>
        <div className="flex-shrink-0">
            <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
            <div className="text-sm font-medium text-white/80">{title}</div>
            <div className="text-2xl font-bold text-white">${value.toLocaleString()}</div>
        </div>
    </div>
);

const ActionButton = ({ icon: Icon, label, onClick }: ActionButtonProps) => (
    <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
    >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
    </button>
);

const TableContainer = ({ title, children }: TableContainerProps) => (
    <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Loan ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Start Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Due Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Remaining Balance</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    </div>
);

const RepaymentTableContainer = ({ title, children }: TableContainerProps) => (
    <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Repayment ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount Paid</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Method</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Remaining Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    </div>
);


const BorrowerPage = () => {
    return (
        <div className="min-h-screen">
            <div className="mx-auto w-full space-y-8">
                {/* Quick Actions */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Quick Actions</h2>
                    <div className="flex flex-wrap items-center gap-4">
                        <ActionButton icon={Plus} label="Add New Loan" onClick={() => console.log("Add New Loan clicked")} />
                        <ActionButton icon={Download} label="Record Repayment" onClick={() => console.log("Record Repayment clicked")} />
                        <ActionButton icon={ClipboardList} label="Generate Agreement" onClick={() => console.log("Generate Agreement clicked")} />
                    </div>
                </div>
                {/* Borrower Info Card */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Borrower Details</h2>
                    <div className="flex flex-col gap-8 rounded-xl bg-white p-6 shadow-md md:flex-row md:items-center">
                        <div className="grid flex-grow grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                            <InfoItem icon={User} label="Name" value={borrower.name} />
                            <InfoItem icon={Phone} label="Phone" value={borrower.phone} />
                            <InfoItem icon={Mail} label="Email" value={borrower.email} />
                            <InfoItem icon={MapPin} label="Address" value={borrower.address} />
                            {borrower.idProof && (
                                <InfoItem icon={CreditCard} label="ID/Proof" value={borrower.idProof} />
                            )}
                        </div>
                        <div className="flex-shrink-0">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                <button
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
                                    onClick={() => console.log("Edit button clicked")}
                                >
                                    <Edit className="h-4 w-4" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100"
                                    onClick={() => console.log("Delete button clicked")}
                                >
                                    <Trash className="h-4 w-4" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Loan Summary Section */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800">Loan Summary</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <SummaryCard
                            title="Total Loans Taken"
                            value={loanSummary.totalLoans}
                            icon={ClipboardList}
                            color="bg-indigo-500"
                        />
                        <SummaryCard
                            title="Active Loans"
                            value={loanSummary.activeLoans}
                            icon={TrendingUp}
                            color="bg-rose-500"
                        />
                        <SummaryCard
                            title="Paid Loans"
                            value={loanSummary.paidLoans}
                            icon={DollarSign}
                            color="bg-emerald-500"
                        />
                        <SummaryCard
                            title="Outstanding Balance"
                            value={loanSummary.outstandingBalance}
                            icon={Wallet}
                            color="bg-orange-500"
                        />
                    </div>
                </div>

                {/* Loan History Table */}
                <TableContainer title="Loan History">
                    {loanHistory.map((loan, index) => (
                        <tr key={index} className="bg-white">
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{loan.id}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">${loan.amount.toLocaleString()}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{loan.startDate}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{loan.dueDate}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span
                                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${loan.status === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {loan.status}
                                </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">${loan.remainingBalance.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right text-sm font-medium">
                                <button onClick={() => console.log(`Viewing details for Loan ID: ${loan.id}`)} className="text-indigo-600 hover:text-indigo-900">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </TableContainer>

                {/* Repayment History Table */}
                <RepaymentTableContainer title="Repayment History">
                    {repaymentHistory.map((repayment, index) => (
                        <tr key={index} className="bg-white">
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{repayment.id}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{repayment.date}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">${repayment.amountPaid.toLocaleString()}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{repayment.method}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">${repayment.remainingBalance.toLocaleString()}</td>
                        </tr>
                    ))}
                </RepaymentTableContainer>
            </div>
        </div>
    );
};

export default BorrowerPage;
