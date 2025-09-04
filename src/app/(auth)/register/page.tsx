'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { EmailIcon, PhoneIcon, UserIcon, AddressIcon, BriefcaseIcon, LockIcon } from '../../../components/icons';

// Main component for the registration form
export default function App() {
    // State management for form inputs
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        occupation: '',
        gender: '',
    });

    // State for password matching error
    const [passwordError, setPasswordError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);

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
        setPasswordError('');
        setFormSuccess(false);

        // Basic validation: Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match. Please try again.");
            return; // Stop submission if passwords don't match
        }

        // If validation passes
        console.log("Form data submitted:", formData);
        setFormSuccess(true);
        // Here you would typically send the data to your backend or API
    };



    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
            <div className="w-full max-w-4xl mx-auto p-6 md:p-8">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="">
                        {/* Form Section */}
                        <div className="p-8 lg:p-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                            <p className="text-gray-500 mb-8">Join us and start your journey today!</p>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="space-y-5">
                                    {/* Full Name */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserIcon />
                                        </div>
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EmailIcon />
                                        </div>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Phone */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <PhoneIcon />
                                        </div>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Address */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <AddressIcon />
                                        </div>
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon />
                                        </div>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon />
                                        </div>
                                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Occupation */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <BriefcaseIcon />
                                        </div>
                                        <select name="occupation" value={formData.occupation} onChange={handleChange} required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                                            <option value="" disabled>Select Occupation</option>
                                            <option value="student">Student</option>
                                            <option value="engineer">Engineer</option>
                                            <option value="doctor">Doctor</option>
                                            <option value="designer">Designer</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <span className="text-gray-600 font-medium">Gender</span>
                                        <div className="mt-2 flex items-center space-x-6">
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} className="form-radio text-blue-600 h-5 w-5 focus:ring-blue-500" />
                                                <span className="text-gray-700">Male</span>
                                            </label>
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} className="form-radio text-pink-600 h-5 w-5 focus:ring-pink-500" />
                                                <span className="text-gray-700">Female</span>
                                            </label>
                                            <label className="flex items-center space-x-2 cursor-pointer">
                                                <input type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} className="form-radio text-purple-600 h-5 w-5 focus:ring-purple-500" />
                                                <span className="text-gray-700">Other</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {passwordError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{passwordError}</p>}

                                    {/* Success Message */}
                                    {formSuccess && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-lg">Registration successful! Welcome aboard.</p>}

                                    {/* Submit Button */}
                                    <div>
                                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            Register Now
                                        </button>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-600">Already have an account? <Link href="/login" className="font-medium text-purple-600 hover:text-purple-700">Login Now</Link></p>
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
