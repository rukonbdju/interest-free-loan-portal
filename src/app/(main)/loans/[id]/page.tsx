'use client'
import React from 'react';
import type { FC } from 'react';
import {
    User,
    Calendar,
    Wallet,
    Clock,
    PlusCircle,
    FilePenLine,
    Mail,
    Phone,
    MapPin,
    List,
    HandCoins,
} from 'lucide-react';
import { useFetchData } from '@/hooks/useFetchData';
import { useParams } from 'next/navigation';
import { Loan } from '@/types';
import Link from 'next/link';

// Function to format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Calculates days remaining until the end date
const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date(); // Use current date for countdown
    const diffTime = end.getTime() - now.getTime();
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// --- MAIN COMPONENT ---
const LoanDetailsPage: FC = () => {
    const params = useParams();
    const { data } = useFetchData<Loan>(`/loans/${params.id}`)
    const paidAmount = 500;
    const totalAmount = data?.amount;
    const progressPercentage = totalAmount ? (paidAmount / totalAmount) * 100 : 0;
    const daysRemaining = getDaysRemaining(data?.dueDate || '');

    return (
        <div className="bg-gray-50  min-h-screen">
            <div className="w-full">

                {/* Header */}
                <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 ">Loan Details</h1>
                        <p className="text-sm text-gray-500 ">ID: {data?.loanId} | Created at {formatDate(data?.createdAt || "")} </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={`/loans/${data?._id}/edit`} className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 ">
                            <FilePenLine size={20} />
                        </Link>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                            <List size={18} />
                            Loan List
                        </button>
                    </div>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Loan Overview Card */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 ">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-sm text-gray-500 ">Remaining Balance</p>
                                    <p className="text-4xl font-bold text-gray-800 ">{totalAmount ? totalAmount - paidAmount : 0} {data?.currency}</p>
                                </div>
                                <span className='bg-blue-100 text-blue-500 px-2 rounded-2xl'>Active</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500  mt-1">
                                    <span>0 {data?.currency}</span>
                                    <span>{totalAmount} {data?.currency}</span>
                                </div>
                            </div>

                            {/* Loan Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <div className="bg-green-100 p-2 rounded-full"><Wallet size={20} className="text-green-600 " /></div>
                                    <div>
                                        <p className="text-sm text-gray-500 ">Total Paid</p>
                                        <p className="font-semibold text-gray-700 ">{paidAmount} {data?.currency}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <div className="bg-red-100  p-2 rounded-full"><Calendar size={20} className="text-red-600 " /></div>
                                    <div>
                                        <p className="text-sm text-gray-500 ">Final Due Date</p>
                                        <p className="font-semibold text-gray-700 ">{formatDate(data?.dueDate || "")}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center sm:justify-start gap-3">
                                    <div className="bg-yellow-100 p-2 rounded-full"><Clock size={20} className="text-yellow-600" /></div>
                                    <div>
                                        <p className="text-sm text-gray-500 ">Time Remaining</p>
                                        <p className="font-semibold text-gray-700">{daysRemaining} Days</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment History */}
                        <div className="bg-white  rounded-xl shadow-md border border-gray-200 ">
                            <div className='flex gap-2 justify-between items-center p-6 border-b border-gray-200 '>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Payment History
                                </h2>
                                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                                    <PlusCircle size={18} />
                                    Add Payment
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 ">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Date</th>
                                            <th scope="col" className="px-6 py-3">Amount</th>
                                            <th scope="col" className="px-6 py-3">Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.payments?.map((payment) => (
                                            <tr key={payment._id} className="bg-white  border-b  hover:bg-gray-50 ">
                                                <td className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">{formatDate(payment.paymentDate)}</td>
                                                <td className="px-6 py-4 font-semibold text-green-600 ">{totalAmount} {data?.currency}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">

                                                        <span>{payment.paymentMethod}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {data?.payments?.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-10 text-gray-500">No payments have been made yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-6">

                        {/* Borrower Information */}
                        <div className="bg-white  rounded-xl shadow-md p-6 border border-gray-200 ">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <User size={24} className="text-gray-500 " />
                                </div>
                                <div className='space-y-1.5'>
                                    <div>
                                        <p className="font-semibold text-gray-800 ">{data?.borrower?.name}</p>
                                        <p className="text-sm text-gray-500 ">
                                            ID: {data?.borrower.borrowerId} | Created on {formatDate(data?.borrower?.createdAt || '')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail size={16} className="text-gray-400" />
                                        <span className="text-gray-600">{data?.borrower.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone size={16} className="text-gray-400" />
                                        <span className="text-gray-600">{data?.borrower.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin size={16} className="text-gray-400" />
                                        <span className="text-gray-600">{data?.borrower.address}</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Loan Timeline */}
                        <div className="bg-white  rounded-xl shadow-md p-6 border border-gray-200 ">

                            <ul className="space-y-4">
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 bg-green-100  rounded-full flex items-center justify-center">
                                        <Wallet size={16} className="text-green-600 " />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 ">Total Amount</p>
                                        <p className="text-sm text-gray-500 ">{data?.amount} {data?.currency}</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 bg-violet-100  rounded-full flex items-center justify-center">
                                        <HandCoins size={16} className="text-violet-600 " />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 ">Disbursement Method</p>
                                        <p className="text-sm text-gray-500 ">{data?.disbursementMethod}</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 bg-blue-100  rounded-full flex items-center justify-center">
                                        <Calendar size={16} className="text-blue-600 " />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 ">Disbursement Date</p>
                                        <p className="text-sm text-gray-500 ">{formatDate(data?.disbursementDate || "")}</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex-shrink-0 bg-red-100  rounded-full flex items-center justify-center">
                                        <Calendar size={16} className="text-red-600 " />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700 ">Final Payment Due</p>
                                        <p className="text-sm text-gray-500 ">{formatDate(data?.dueDate || "")}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanDetailsPage;
