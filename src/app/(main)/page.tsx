import React from 'react';
import {
  Plus,
  UserPlus,
} from 'lucide-react';

import QuickActionButton from '@/components/dashboard/quick-action-button';
import Link from 'next/link';
import LoanSummary from '@/components/dashboard/loan-summary';
import UpcomingPaymentTable from '@/components/dashboard/upcoming-payment-table';
import RecentPaymentTable from '@/components/dashboard/recent-payment-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Loan Management | Dashboard",
};
export default function DashboardPage() {

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <div className="w-full mx-auto">
        <LoanSummary />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content column for tables and lists */}
          <div className="lg:col-span-2 space-y-8">
            <UpcomingPaymentTable />
          </div>

          {/* Sidebar column for actions */}
          <div>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <Link href={'/loans/new'}>
                  <QuickActionButton icon={<Plus className="h-5 w-5" />} label="New Loan" primary />
                </Link>

                <Link href={'/borrowers/new'}>
                  <QuickActionButton icon={<UserPlus className="h-5 w-5" />} label="Add Borrower" />
                </Link>

                {/* <QuickActionButton icon={<FileText className="h-5 w-5" />} label="Generate Agreement" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <RecentPaymentTable />
        </div>
      </div>
    </main>
  );
}


