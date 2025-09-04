'use client';
import React, { useState } from 'react';

// Main App component containing the entire UI
const App = () => {
    // Mock user data
    const mockData = {
        name: "Fatima Bint Ali",
        email: "fatima@example.com",
        phone: "+8801700000000",
        role: "borrower",
        verification: {
            idVerified: true,
            phoneVerified: true,
            communityEndorsed: false
        },
        reputationScore: 72,
        badges: ["Good Borrower", "On-time Repayer"],
        loanSummary: { totalBorrowed: 1200, repaid: 800 },
        pledgeSummary: { totalLent: 500, received: 200 }
    };

    const [userData, setUserData] = useState(mockData);

    const handleInputChange = (e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
        const { name, value } = e.target;
        setUserData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        // In a real app, this would send data to an API
        console.log("Saving user data:", userData);
    };

    // Calculate verification progress
    const verifiedCount = Object.values(userData.verification).filter(status => status).length;
    const totalSteps = Object.keys(userData.verification).length;
    const progressPercentage = (verifiedCount / totalSteps) * 100;

    // Determine reputation level and color
    const getReputationLevel = (score: number) => {
        if (score >= 85) return { level: "Excellent", color: "text-amber-500", badge: "🏅" };
        if (score >= 50) return { level: "Trusted", color: "text-emerald-500", badge: "🌿" };
        return { level: "New", color: "text-gray-500", badge: "⭐" };
    };
    const reputation = getReputationLevel(userData.reputationScore);

    const loanCompletionPercentage = userData.loanSummary.repaid / userData.loanSummary.totalBorrowed * 100 || 0;
    const pledgeCompletionPercentage = userData.pledgeSummary.received / userData.pledgeSummary.totalLent * 100 || 0;

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

                {/* Main Content Area: Two-column layout on desktop, stacked on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Profile Info & Loan/Pledge Summary */}
                    <div className="space-y-8">
                        {/* Profile Info Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 transform hover:scale-[1.01]">
                            <h2 className="text-xl font-semibold mb-6 text-gray-700">Profile Information</h2>

                            {/* Profile Picture */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-emerald-500">
                                    <span className="text-4xl text-gray-600">👤</span>
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                        <span className="text-white text-xs text-center">Upload Photo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Editable Form */}
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-gray-600 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={userData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600 mb-1">Role</label>
                                    <div className="p-3 border border-gray-300 rounded-lg bg-gray-100">
                                        <p className="capitalize text-gray-700">{userData.role}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="w-full py-3 px-4 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>

                        {/* Loan & Pledge Summary Widgets */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Total Borrowed Card */}
                            <div className="bg-emerald-500 text-white rounded-2xl shadow-lg p-6 transition-all duration-300 transform hover:scale-[1.02]">
                                <h3 className="text-sm font-medium opacity-80">Total Borrowed</h3>
                                <p className="text-3xl font-bold mt-1">৳ {userData.loanSummary.totalBorrowed}</p>
                                <div className="mt-4">
                                    <div className="flex justify-between items-center text-sm opacity-90">
                                        <span>Repayment Progress</span>
                                        <span>{loanCompletionPercentage.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-emerald-700 rounded-full h-2 mt-1">
                                        <div
                                            className="bg-white h-2 rounded-full"
                                            style={{ width: `${loanCompletionPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Total Lent Card */}
                            <div className="bg-amber-500 text-white rounded-2xl shadow-lg p-6 transition-all duration-300 transform hover:scale-[1.02]">
                                <h3 className="text-sm font-medium opacity-80">Total Lent</h3>
                                <p className="text-3xl font-bold mt-1">৳ {userData.pledgeSummary.totalLent}</p>
                                <div className="mt-4">
                                    <div className="flex justify-between items-center text-sm opacity-90">
                                        <span>Repayments Received</span>
                                        <span>{pledgeCompletionPercentage.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-amber-700 rounded-full h-2 mt-1">
                                        <div
                                            className="bg-white h-2 rounded-full"
                                            style={{ width: `${pledgeCompletionPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Verification & Reputation */}
                    <div className="space-y-8">
                        {/* Verification Status Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 transform hover:scale-[1.01]">
                            <h2 className="text-xl font-semibold mb-6 text-gray-700">Verification Status</h2>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <span className={`text-2xl ${userData.verification.idVerified ? 'text-green-500' : 'text-gray-400'}`}>✅</span>
                                    <p className={`text-lg font-medium ${userData.verification.idVerified ? 'text-gray-700' : 'text-gray-500'}`}>
                                        ID Verified
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className={`text-2xl ${userData.verification.phoneVerified ? 'text-green-500' : 'text-gray-400'}`}>📱</span>
                                    <p className={`text-lg font-medium ${userData.verification.phoneVerified ? 'text-gray-700' : 'text-gray-500'}`}>
                                        Phone Verified
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className={`text-2xl ${userData.verification.communityEndorsed ? 'text-green-500' : 'text-gray-400'}`}>🕌</span>
                                    <p className={`text-lg font-medium ${userData.verification.communityEndorsed ? 'text-gray-700' : 'text-gray-500'}`}>
                                        Community Endorsed
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-2">Verification Progress ({verifiedCount} of {totalSteps} steps)</p>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Reputation Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 transform hover:scale-[1.01]">
                            <h2 className="text-xl font-semibold mb-6 text-gray-700">Reputation & Badges</h2>

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <p className={`text-4xl font-bold ${reputation.color}`}>{userData.reputationScore}</p>
                                    <p className="text-lg font-semibold text-gray-600">{reputation.level}</p>
                                </div>
                                <span className={`text-4xl ${reputation.color}`}>{reputation.badge}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {userData.badges.map((badge, index) => (
                                    <span
                                        key={index}
                                        className="text-sm font-medium bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-center"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
