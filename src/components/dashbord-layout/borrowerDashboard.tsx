import { mockActiveLoan } from "@/utils/db";
import { BellIcon, LoanRequestIcon } from "../icons";
import Card from "../shared/card";
import { FC } from "react";
import ProgressBar from "../shared/progress-bar";

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

export default BorrowerDashboard;