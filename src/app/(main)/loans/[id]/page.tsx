'use client'
import React, { useState } from 'react';
import { Edit, Trash2, Plus, FileText } from 'lucide-react';

// Assuming recharts is installed and available in the project
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';

// Define the data structures using TypeScript interfaces
interface Repayment {
    id: number;
    date: string;
    amount: number;
    status: 'Paid' | 'Pending';
}

interface Loan {
    id: string;
    borrowerName: string;
    amount: number;
    startDate: string;
    dueDate: string;
    status: 'Active' | 'Paid Off';
    remainingBalance: number;
    repayments: Repayment[];
}

// Mock data for a single loan
const mockLoan: Loan = {
    id: 'LN-001234',
    borrowerName: 'Jane Doe',
    amount: 5000,
    startDate: '2023-10-26',
    dueDate: '2024-10-26',
    status: 'Active',
    remainingBalance: 2000,
    repayments: [
        { id: 1, date: '2023-11-26', amount: 500, status: 'Paid' },
        { id: 2, date: '2023-12-26', amount: 500, status: 'Paid' },
        { id: 3, date: '2024-01-26', amount: 500, status: 'Paid' },
        { id: 4, date: '2024-02-26', amount: 500, status: 'Paid' },
        { id: 5, date: '2024-03-26', amount: 500, status: 'Paid' },
        { id: 6, date: '2024-04-26', amount: 500, status: 'Pending' },
        { id: 7, date: '2024-05-26', amount: 500, status: 'Pending' },
        { id: 8, date: '2024-06-26', amount: 500, status: 'Pending' },
        { id: 9, date: '2024-07-26', amount: 500, status: 'Pending' },
        { id: 10, date: '2024-08-26', amount: 500, status: 'Pending' },
    ],
};

// Main page component
export default function LoanDetailPage() {
    const [loan, setLoan] = useState<Loan>(mockLoan);

    const getRepaymentChartData = () => {
        const totalAmount = loan.amount;
        const paidAmount = loan.repayments
            .filter((r) => r.status === 'Paid')
            .reduce((sum, r) => sum + r.amount, 0);
        const pendingAmount = loan.remainingBalance;

        return [
            { name: 'Paid', value: paidAmount, fill: '#3b82f6' },
            { name: 'Remaining', value: pendingAmount, fill: '#9ca3af' },
        ];
    };

    const handleEdit = () => {
        // Logic for editing loan
        console.log('Editing loan:', loan.id);
    };

    const handleDelete = () => {
        // Logic for deleting loan
        console.log('Deleting loan:', loan.id);
    };

    const handleRecordRepayment = () => {
        // Logic for recording a new repayment
        console.log('Recording repayment for loan:', loan.id);
    };

    const handleGenerateAgreement = () => {
        // Logic for generating a loan agreement
        console.log('Generating agreement for loan:', loan.id);
    };

    const formattedAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="w-full mx-auto space-y-6">
                {/* Loan Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                                Loan Details
                            </h1>
                            <p className="text-gray-500 mt-1">ID: {loan.id}</p>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <button
                                onClick={handleEdit}
                                className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-500">Borrower</div>
                            <div className="mt-1 text-gray-900 font-semibold">{loan.borrowerName}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-500">Amount</div>
                            <div className="mt-1 text-gray-900 font-semibold">{formattedAmount(loan.amount)}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-500">Start Date</div>
                            <div className="mt-1 text-gray-900 font-semibold">{loan.startDate}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-500">Due Date</div>
                            <div className="mt-1 text-gray-900 font-semibold">{loan.dueDate}</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg col-span-1 sm:col-span-2 lg:col-span-1">
                            <div className="text-sm font-medium text-gray-500">Status</div>
                            <div className="mt-1 font-semibold">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${loan.status === 'Active'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {loan.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg col-span-1 sm:col-span-2 lg:col-span-1">
                            <div className="text-sm font-medium text-gray-500">Remaining Balance</div>
                            <div className="mt-1 text-gray-900 font-semibold">
                                {formattedAmount(loan.remainingBalance)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Repayment Schedule Table */}
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 overflow-x-auto">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                        Repayment Schedule
                    </h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                                >
                                    Installment
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Amount
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
                                >
                                    Due Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loan.repayments.map((repayment, index) => (
                                <tr key={repayment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formattedAmount(repayment.amount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${repayment.status === 'Paid'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {repayment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {repayment.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                            Quick Actions
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleRecordRepayment}
                                className="flex-1 w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Record Repayment
                            </button>
                            <button
                                onClick={handleGenerateAgreement}
                                className="flex-1 w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                <FileText className="w-5 h-5 mr-2" />
                                Generate Agreement
                            </button>
                        </div>
                    </div>

                    {/* Repayment Summary Chart Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                            Repayment Summary
                        </h2>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={getRepaymentChartData()} margin={{ top: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                                        formatter={(value) => formattedAmount(value as number)}
                                    />
                                    <Bar dataKey="value" barSize={40} radius={[10, 10, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
