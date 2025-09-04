import React from 'react';

import BorrowerDashboard from '@/components/dashbord-layout/borrowerDashboard';
import LenderDashboard from '@/components/dashbord-layout/lander-dashboard';
import AdminDashboard from '@/components/dashbord-layout/admin-dashboard';


const MainDashboard = () => {
  return (
    <div className='space-y-8'>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Abdullah!</h2>
        <p className="text-gray-500 mb-6">Here is your financial overview.</p>
      </div>
      <AdminDashboard />
      <BorrowerDashboard />
      <LenderDashboard />
    </div>
  );
};

export default MainDashboard;

