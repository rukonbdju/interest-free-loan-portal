
'use client'
import React, { useState } from 'react';
import type { FC, SVGProps } from 'react';

// --- TYPE DEFINITIONS ---
type UserRole = 'borrower' | 'lender' | 'admin';

interface LoanRequest {
  id: string;
  borrower: {
    name: string;
    reputation: 'Trusted' | 'Good' | 'New';
  };
  purpose: string;
  amountNeeded: number;
  amountFunded: number;
  deadline: string;
}

interface ActiveLoan {
  id: string;
  totalAmount: number;
  amountPaid: number;
  nextDueDate: string;
  status: 'Pending' | 'Funding' | 'Active' | 'Completed';
}

// --- MOCK DATA ---
const mockUser = {
  name: 'Abdullah Ahmed',
  avatarUrl: `https://placehold.co/100x100/28a745/FFFFFF?text=A`,
};

const mockActiveLoan: ActiveLoan = {
  id: 'loan-001',
  totalAmount: 5000,
  amountPaid: 1500,
  nextDueDate: 'Oct 15, 2025',
  status: 'Active',
};

const mockLoanRequests: LoanRequest[] = [
  {
    id: 'req-001',
    borrower: { name: 'Fatima Zahra', reputation: 'Trusted' },
    purpose: 'Small Business Inventory',
    amountNeeded: 2500,
    amountFunded: 1800,
    deadline: '25 Days Left',
  },
  {
    id: 'req-002',
    borrower: { name: 'Yusuf Ali', reputation: 'Good' },
    purpose: 'Educational Fees',
    amountNeeded: 1200,
    amountFunded: 500,
    deadline: '10 Days Left',
  },
  {
    id: 'req-003',
    borrower: { name: 'Aisha Siddiqui', reputation: 'New' },
    purpose: 'Emergency Medical Bill',
    amountNeeded: 800,
    amountFunded: 800,
    deadline: 'Funded',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
  {
    id: 'req-004',
    borrower: { name: 'Omar Farooq', reputation: 'Trusted' },
    purpose: 'Home Repair',
    amountNeeded: 3000,
    amountFunded: 1100,
    deadline: '30 Days Left',
  },
];

const adminStats = {
  totalActiveLoans: 124,
  pendingVerifications: 8,
  disputes: 2,
  totalValue: 450000,
}

// --- SVG ICONS (as React Components) ---
const DashboardIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const LoanRequestIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MyLoansIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PledgeIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.97l-2.095 4.19A2 2 0 005.333 12H4a2 2 0 00-2 2v4a2 2 0 002 2h1" />
  </svg>
);

const RepaymentIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M9 14h6M4 18h16M3 6h16c.552 0 1 .448 1 1v12c0 .552-.448 1-1 1H3c-.552 0-1-.448-1-1V7c0-.552.448-1 1-1z" />
  </svg>
);

const ProfileIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SettingsIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BellIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const MenuIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

// --- REUSABLE COMPONENTS ---

const Card: FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm p-6 border border-gray-100 ${className}`}>
    {children}
  </div>
);

const ProgressBar: FC<{ value: number; maxValue: number; }> = ({ value, maxValue }) => {
  const percentage = (value / maxValue) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

const ReputationBadge: FC<{ reputation: LoanRequest['borrower']['reputation'] }> = ({ reputation }) => {
  const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded-full";
  const colorClasses = {
    'Trusted': 'bg-green-100 text-green-800',
    'Good': 'bg-blue-100 text-blue-800',
    'New': 'bg-gray-100 text-gray-800',
  };
  return <span className={`${baseClasses} ${colorClasses[reputation]}`}>{reputation}</span>;
};


// --- DASHBOARD WIDGETS ---

const BorrowerDashboard: FC = () => {
  const loanProgress = (mockActiveLoan.amountPaid / mockActiveLoan.totalAmount) * 100;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Active Loan Card */}
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">My Active Loan</h3>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Amount Borrowed</p>
            <p className="text-3xl font-bold text-teal-700">${mockActiveLoan.totalAmount.toLocaleString()}</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-sm text-gray-500">Next Payment Due</p>
            <p className="text-lg font-semibold text-gray-700">{mockActiveLoan.nextDueDate}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-600">Repayment Progress</span>
            <span className="text-gray-800">${mockActiveLoan.amountPaid.toLocaleString()} / ${mockActiveLoan.totalAmount.toLocaleString()}</span>
          </div>
          <ProgressBar value={mockActiveLoan.amountPaid} maxValue={mockActiveLoan.totalAmount} />
          <p className="text-right text-sm text-gray-500">{loanProgress.toFixed(0)}% Paid</p>
        </div>
        <button className="mt-6 w-full md:w-auto bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300">
          Make a Repayment
        </button>
      </Card>

      {/* Loan Request Status & Notifications */}
      <div className="space-y-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Request Status</h3>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <LoanRequestIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-gray-700">Funding in Progress</p>
              <p className="text-sm text-gray-500">$1,800 of $2,500 funded</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <BellIcon className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
              <p className="text-sm text-gray-600">Your next payment of <span className="font-semibold text-gray-800">$250</span> is due in <span className="font-semibold text-gray-800">5 days</span>.</p>
            </li>
            <li className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <p className="text-sm text-gray-600">You&apos;ve unlocked the &apos;Trusted Borrower&apos; badge! Congratulations.</p>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

const LenderDashboard: FC = () => {
  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Total Pledged</h4>
          <p className="text-3xl font-bold text-gray-800">$12,500</p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Active Loans Funded</h4>
          <p className="text-3xl font-bold text-gray-800">15</p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Total Returns</h4>
          <p className="text-3xl font-bold text-teal-600">$1,850</p>
        </Card>
      </div>

      {/* Open Loan Requests Table */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Open Loan Requests</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold text-gray-600">Borrower</th>
                <th className="p-3 text-sm font-semibold text-gray-600">Purpose</th>
                <th className="p-3 text-sm font-semibold text-gray-600">Funding Progress</th>
                <th className="p-3 text-sm font-semibold text-gray-600">Remaining Time</th>
                <th className="p-3 text-sm font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {mockLoanRequests.map(req => {
                const percentage = (req.amountFunded / req.amountNeeded) * 100;
                return (
                  <tr key={req.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img className="w-10 h-10 rounded-full object-cover" src={`https://placehold.co/100x100/E2E8F0/4A5568?text=${req.borrower.name.charAt(0)}`} alt={req.borrower.name} />
                        <div>
                          <div className="font-semibold text-gray-800">{req.borrower.name}</div>
                          <ReputationBadge reputation={req.borrower.reputation} />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 whitespace-nowrap">{req.purpose}</td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="w-40">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-gray-700">${req.amountFunded.toLocaleString()}</span>
                          <span className="text-gray-500">${req.amountNeeded.toLocaleString()}</span>
                        </div>
                        <ProgressBar value={req.amountFunded} maxValue={req.amountNeeded} />
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{req.deadline}</td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300 disabled:bg-gray-400" disabled={percentage >= 100}>
                        {percentage >= 100 ? 'Funded' : 'Fund Now'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

const AdminDashboard: FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Total Active Loans</h4>
          <p className="text-3xl font-bold text-gray-800">{adminStats.totalActiveLoans}</p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Pending Verifications</h4>
          <p className="text-3xl font-bold text-amber-600">{adminStats.pendingVerifications}</p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Disputes</h4>
          <p className="text-3xl font-bold text-red-600">{adminStats.disputes}</p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Total Loan Value</h4>
          <p className="text-3xl font-bold text-teal-600">${adminStats.totalValue.toLocaleString()}</p>
        </Card>
      </div>
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Overview</h3>
        <p className="text-gray-600">Admin-specific charts and management tools would be displayed here.</p>
      </Card>
    </>
  );
};


// --- MAIN DASHBOARD COMPONENT ---

const AmanahDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>('borrower');

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon },
    { name: 'Loan Requests', icon: LoanRequestIcon },
    { name: 'My Loans', icon: MyLoansIcon },
    { name: 'My Pledges', icon: PledgeIcon },
    { name: 'Repayments', icon: RepaymentIcon },
    { name: 'Profile', icon: ProfileIcon, separator: true },
    { name: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeRole) {
      case 'borrower':
        return <BorrowerDashboard />;
      case 'lender':
        return <LenderDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <BorrowerDashboard />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:shadow-none md:border-r md:border-gray-200`}>
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-700">Amanah</h1>
        </div>
        <nav className="p-4">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                {item.separator && <div className="my-4 border-t border-gray-200"></div>}
                <a href="#" className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${item.name === 'Dashboard' ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <item.icon className="w-6 h-6 mr-3" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64 transition-all duration-300 ease-in-out">
        {/* Top Navbar */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-lg z-30 border-b border-gray-200">
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <MenuIcon className="w-6 h-6" />
            </button>

            {/* Role Switcher (for demo purposes) */}
            <div className="hidden sm:block">
              <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
                {(['borrower', 'lender', 'admin'] as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => setActiveRole(role)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors capitalize ${activeRole === role ? 'bg-white shadow-sm text-teal-700' : 'text-gray-600 hover:bg-gray-200'}`}
                  >
                    {role} View
                  </button>
                ))}
              </div>
            </div>

            {/* Right side icons & profile */}
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500 hover:text-gray-800">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0 right-0 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <img src={mockUser.avatarUrl} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-teal-100" />
                <div className="hidden lg:block">
                  <p className="font-semibold text-sm text-gray-800">{mockUser.name}</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, {mockUser.name.split(' ')[0]}!</h2>
          <p className="text-gray-500 mb-6">Here is your financial overview for today.</p>

          {/* Dynamic Content based on Role */}
          {renderContent()}

        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default AmanahDashboard;

