'use client'
import React from 'react';
import { FileText, Download, RefreshCw, ArrowLeft } from 'lucide-react';

interface Agreement {
    id: string;
    borrowerName: string;
    loanAmount: number;
    startDate: string;
    dueDate: string;
    repaymentSchedule: { installment: number; amount: number; dueDate: string; paid: boolean }[];
    fullText: string;
}

const agreementsData: Agreement = {
    id: 'LA-2023-001',
    borrowerName: 'Jane Doe',
    loanAmount: 5000.00,
    startDate: '2023-10-26',
    dueDate: '2024-10-26',
    repaymentSchedule: [
        { installment: 1, amount: 416.67, dueDate: '2023-11-26', paid: true },
        { installment: 2, amount: 416.67, dueDate: '2023-12-26', paid: true },
        { installment: 3, amount: 416.67, dueDate: '2024-01-26', paid: false },
        { installment: 4, amount: 416.67, dueDate: '2024-02-26', paid: false },
        { installment: 5, amount: 416.67, dueDate: '2024-03-26', paid: false },
        { installment: 6, amount: 416.67, dueDate: '2024-04-26', paid: false },
        { installment: 7, amount: 416.67, dueDate: '2024-05-26', paid: false },
        { installment: 8, amount: 416.67, dueDate: '2024-06-26', paid: false },
        { installment: 9, amount: 416.67, dueDate: '2024-07-26', paid: false },
        { installment: 10, amount: 416.67, dueDate: '2024-08-26', paid: false },
        { installment: 11, amount: 416.67, dueDate: '2024-09-26', paid: false },
        { installment: 12, amount: 416.67, dueDate: '2024-10-26', paid: false },
    ],
    fullText: `
    This Loan Agreement ("Agreement") is made on October 26, 2023, by and between
    the Lender and Jane Doe ("Borrower").

    ARTICLE 1 - LOAN DETAILS
    1.1 Loan Amount: The Lender agrees to lend the Borrower a principal sum of $5,000.00 (Five Thousand Dollars).
    1.2 Loan Start Date: October 26, 2023
    1.3 Loan Due Date: October 26, 2024
    1.4 Interest Rate: This loan is provided on a 0% interest basis.

    ARTICLE 2 - REPAYMENT
    The Borrower agrees to repay the Loan Amount in 12 equal monthly installments of $416.67. Payments are due on the 26th of each month, commencing November 26, 2023.

    ARTICLE 3 - DEFAULT
    In the event the Borrower fails to make a payment by the due date, this Agreement may be considered in default. The Lender reserves the right to take necessary legal action to recover the outstanding balance.

    ARTICLE 4 - MISCELLANEOUS
    4.1 Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of California.
    4.2 Entire Agreement: This document constitutes the entire agreement between the parties.

    IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written.
  `,
};

const SingleAgreementPage: React.FC = () => {
    const { id, borrowerName, loanAmount, dueDate, fullText, repaymentSchedule } = agreementsData;

    const onDownload = (agreementId: string) => {
        // Placeholder for download logic, e.g., calling a server endpoint or client-side PDF generation.
        console.log(`Downloading agreement with ID: ${agreementId}`);
    };

    const onRegenerate = (agreementId: string) => {
        // Placeholder for regeneration logic.
        console.log(`Regenerating agreement with ID: ${agreementId}`);
    };

    const onBack = () => {
        // Placeholder for navigation logic, e.g., router.push('/agreements').
        console.log('Navigating back to the agreements list.');
    };

    // Utility to format numbers as currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="min-h-screen">
            <div className="bg-white rounded-2xl shadow-xl w-full p-8 md:p-12 space-y-8 print:shadow-none print:p-0">

                {/* Header & Title */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-indigo-600" />
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                            Loan Agreement
                        </h1>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4 text-sm text-gray-600 print:hidden">
                        <div className="font-medium">Borrower: {borrowerName}</div>
                        <div className="hidden md:block">|</div>
                        <div className="text-gray-500">Loan ID: {id}</div>
                    </div>
                </div>

                {/* Agreement Content Section */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-inner max-h-[60vh] overflow-y-auto font-serif text-gray-700 leading-relaxed print:bg-white print:border-none print:shadow-none print:overflow-visible print:max-h-full">
                    {fullText.split('\n\n').map((paragraph, index) => (
                        <div key={index} className="mb-4">
                            <p className="whitespace-pre-line text-sm md:text-base">
                                {paragraph}
                            </p>
                        </div>
                    ))}

                    {/* Highlighted key sections */}
                    <div className="mt-8 space-y-4 font-sans text-sm md:text-base">
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Key Terms Summary</h2>
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-600">Loan Amount:</span>
                            <span className="text-indigo-600 font-bold text-lg">{formatCurrency(loanAmount)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-600">Repayment Due Date:</span>
                            <span className="text-gray-800">{dueDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-600">Installments:</span>
                            <span className="text-gray-800">{repaymentSchedule.length} equal monthly payments</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-end items-center mt-8 print:hidden">
                    <button
                        onClick={onBack}
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Agreements</span>
                    </button>
                    <button
                        onClick={() => onRegenerate && onRegenerate(id)}
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <RefreshCw className="h-4 w-4" />
                        <span>Regenerate Agreement</span>
                    </button>
                    <button
                        onClick={() => onDownload(id)}
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleAgreementPage;
