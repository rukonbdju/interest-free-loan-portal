import { FC } from "react";
import Card from "../shared/card";

const AdminDashboard: FC = () => {
    const adminStats = {
        totalActiveLoans: 124,
        pendingVerifications: 8,
        disputes: 2,
        totalValue: 450000,
    }
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

export default AdminDashboard;