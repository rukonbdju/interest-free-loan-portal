'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { EmailIcon, LockIcon } from '../../../components/icons';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/utils/api-url';

export default function LoginPage() {
    const { user, setUser, loading } = useAuth()
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (!loading && user) {
            router.push("/");
        }
    }, [loading, user, router]);

    if (loading) return <p>Loading...</p>;

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
        setLoginError('');
        try {
            console.log(formData)
            const res = await fetch(baseUrl + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
            const result = await res.json()
            console.log(result)
            if (result.success) {
                setUser(result.data)
            } else {
                setLoginError(result.message)
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
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                            <p className="text-gray-500 mb-8">Sign in to continue your journey.</p>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">

                                    {loginError && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{loginError}</p>}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <EmailIcon />
                                        </div>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockIcon />
                                        </div>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
                                    </div>

                                    <div className="text-right">
                                        <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-700">Forgot Password?</a>
                                    </div>

                                    <div>
                                        <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out transform hover:-translate-y-1">
                                            Login
                                        </button>
                                    </div>

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
