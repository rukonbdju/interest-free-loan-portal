'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import PaymentHistory from '@/components/loans/payment-history';
import { LoanPaymentProvider } from '@/contexts/loan-payment-context';
import LoanDetailsHeader from '@/components/loans/loan-details-header';
import BorrowerInfoCard from '@/components/loans/borrower-info-card';
import LoanInfoCard from '@/components/loans/loan-info-card';
import LoanOverviewCard from '@/components/loans/loan-overview-card';

const LoanDetailsPage = () => {
    const params = useParams();
    const id = String(params.id);
    return (
        <LoanPaymentProvider id={id}>
            <div className="bg-gray-50  min-h-screen">
                <div className="w-full">

                    <LoanDetailsHeader />

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Column */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <LoanOverviewCard />
                            <PaymentHistory />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">
                            <BorrowerInfoCard />
                            <LoanInfoCard />
                        </div>
                    </div>
                </div>
            </div>
        </LoanPaymentProvider>
    );
};

export default LoanDetailsPage;
