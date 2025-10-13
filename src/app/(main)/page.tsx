import React from 'react';
import {
  Plus,
  UserPlus,
  FileText,
  MessageSquareText,
  FolderPlus,
} from 'lucide-react';

import ActivityItem, { Activity } from '@/components/dashboard/activity-item';
import QuickActionButton from '@/components/dashboard/quick-action-button';
import Link from 'next/link';
import LoanSummary from '@/components/dashboard/loan-summary';
import UpcomingPaymentTable from '@/components/dashboard/upcoming-payment-table';


export default function DashboardPage() {
  const activities: Activity[] = [
    { icon: <MessageSquareText className="h-5 w-5 text-slate-500" />, text: "Repayment of $1,200 from Jane Cooper was recorded.", time: "25m ago" },
    { icon: <FolderPlus className="h-5 w-5 text-slate-500" />, text: "New loan created for Michael Scott for $5,000.", time: "1h ago" },
    { icon: <FileText className="h-5 w-5 text-slate-500" />, text: "Agreement generated for the loan to Dwight Schrute.", time: "3h ago" },
  ];

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <div className="w-full mx-auto">
        <LoanSummary />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content column for tables and lists */}
          <div className="lg:col-span-2 space-y-8">
            <UpcomingPaymentTable />
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Recent Activity</h2>
              <ul className="divide-y divide-slate-200/70">
                {activities.map((activity, index) => (
                  <ActivityItem key={index} {...activity} />
                ))}
              </ul>
            </div>
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

                <QuickActionButton icon={<FileText className="h-5 w-5" />} label="Generate Agreement" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


