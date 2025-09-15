import React from 'react';
import {
  DollarSign,
  Clock,
  TriangleAlert,
  CircleCheck,
  Plus,
  UserPlus,
  FileText,
  MessageSquareText,
  FolderPlus,
} from 'lucide-react';

import StatCard, { StatCardProps } from '@/components/shared/stat-card';
import RepaymentRow, { Repayment } from '@/components/dashboard/repayment-row';
import ActivityItem, { Activity } from '@/components/dashboard/activity-item';
import QuickActionButton from '@/components/dashboard/quick-action-button';


export default function DashboardPage() {
  const stats: StatCardProps[] = [
    { title: "Total Loans", value: "$125k", icon: <DollarSign className="h-6 w-6" />, color: { bg: 'bg-blue-100', text: 'text-blue-600' } },
    { title: "Active Loans", value: "32", icon: <Clock className="h-6 w-6" />, color: { bg: 'bg-yellow-100', text: 'text-yellow-600' } },
    { title: "Overdue Loans", value: "3", icon: <TriangleAlert className="h-6 w-6" />, color: { bg: 'bg-red-100', text: 'text-red-600' } },
    { title: "Total Repaid", value: "$88k", icon: <CircleCheck className="h-6 w-6" />, color: { bg: 'bg-green-100', text: 'text-green-600' } },
  ];

  const repayments: Repayment[] = [
    { borrower: { name: 'Jane Cooper' }, dueDate: 'Oct 15, 2025', amount: 1200, status: 'Pending' },
    { borrower: { name: 'Wade Warren' }, dueDate: 'Oct 12, 2025', amount: 850, status: 'Pending' },
    { borrower: { name: 'Esther Howard' }, dueDate: 'Oct 5, 2025', amount: 2500, status: 'Paid' },
    { borrower: { name: 'Cody Fisher' }, dueDate: 'Sep 28, 2025', amount: 600, status: 'Overdue' },
    { borrower: { name: 'Jenny Wilson' }, dueDate: 'Sep 25, 2025', amount: 1800, status: 'Paid' },
  ];

  const activities: Activity[] = [
    { icon: <MessageSquareText className="h-5 w-5 text-slate-500" />, text: "Repayment of $1,200 from Jane Cooper was recorded.", time: "25m ago" },
    { icon: <FolderPlus className="h-5 w-5 text-slate-500" />, text: "New loan created for Michael Scott for $5,000.", time: "1h ago" },
    { icon: <FileText className="h-5 w-5 text-slate-500" />, text: "Agreement generated for the loan to Dwight Schrute.", time: "3h ago" },
  ];

  return (
    <main className="bg-slate-50 min-h-screen font-sans">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content column for tables and lists */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Upcoming Repayments</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/80">
                      <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Borrower</th>
                      <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Due Date</th>
                      <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Amount</th>
                      <th className="py-3 px-6 text-xs font-semibold uppercase text-slate-500 tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repayments.map((repayment) => (
                      <RepaymentRow key={repayment.borrower.name} {...repayment} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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
              <div className="space-y-3">
                <QuickActionButton icon={<Plus className="h-5 w-5" />} label="New Loan" primary />
                <QuickActionButton icon={<UserPlus className="h-5 w-5" />} label="Add Borrower" />
                <QuickActionButton icon={<FileText className="h-5 w-5" />} label="Generate Agreement" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


