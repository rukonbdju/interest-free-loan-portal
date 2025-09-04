'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { EmailIcon, LockIcon } from '../../components/icons';

// Main component for the login form
export default function App() {
    // State management for form inputs
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // State for login messages
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    // Handler for input changes
    const handleChange = (e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Reset messages
        setLoginError('');
        setLoginSuccess(false);

        // Basic validation
        if (!formData.email || !formData.password) {
            setLoginError("Please enter both email and password.");
            return;
        }

        // On successful "login"
        console.log("Login data submitted:", formData);
        setLoginSuccess(true);
        // Here you would typically send the data to your backend for authentication
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
            <div className="w-full max-w-4xl mx-auto p-6 md:p-8">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="">
                        {/* Form Section */}
                        <div className="p-8 lg:p-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                            <p className="text-gray-500 mb-8">Sign in to continue your journey.</p>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="space-y-6">

                                    {/* Email */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EmailIcon />
                                        </div>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon />
                                        </div>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Forgot Password */}
                                    <div className="text-right">
                                        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700">Forgot Password?</a>
                                    </div>

                                    {/* Error Message */}
                                    {loginError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{loginError}</p>}

                                    {/* Success Message */}
                                    {loginSuccess && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-lg">Login successful! Redirecting...</p>}

                                    {/* Submit Button */}
                                    <div>
                                        <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            Login
                                        </button>
                                    </div>

                                    {/* Sign up Link */}
                                    <div className="text-center">
                                        <p className="text-gray-600">
                                            Don&apos;t have an account?
                                            <Link href="register" className="font-medium text-purple-600 hover:text-purple-700">Sign Up</Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
