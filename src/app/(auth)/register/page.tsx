'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { EmailIcon, PhoneIcon, UserIcon, AddressIcon, LockIcon } from '../../../components/icons';
import { baseUrl } from '@/utils/api-url';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export default function RegistrationPage() {
    const router = useRouter()
    const { user, setUser, loading } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('')

    useEffect(() => {
        if (!loading && user) {
            router.push("/"); // redirect to login if not authenticated
        }
    }, [loading, user, router]);

    if (loading) return <p>Loading...</p>;


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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError('');
        console.log(formData)
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match. Please try again.");
        }
        try {
            const res = await fetch(baseUrl + '/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json()
            if (!result.success) {
                setError(result.message)
            }
            console.log(result)
            if (result.success) {
                setUser(result.data)
            }

        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
            <div className="w-full max-w-3xl mx-auto p-4 md:p-8">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="">

                        <div className="p-4 lg:p-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
                            <p className="text-gray-500 mb-8">Join us and start your journey today!</p>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-5">

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserIcon />
                                        </div>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required={true} className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EmailIcon />
                                        </div>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <PhoneIcon />
                                        </div>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <AddressIcon />
                                        </div>
                                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon />
                                        </div>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon />
                                        </div>
                                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                                    </div>

                                    {/* Error Message */}
                                    {passwordError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{passwordError}</p>}

                                    {/* Server error */}
                                    {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

                                    <div>
                                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            Register
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
