import { mockLoanRequests } from "@/utils/db";
import ProgressBar from "../shared/progress-bar";
import Badge from "../shared/badge";
import Card from "../shared/card";
import { FC } from "react";

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
                                                    <Badge reputation={req.borrower.reputation} />
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

export default LenderDashboard;