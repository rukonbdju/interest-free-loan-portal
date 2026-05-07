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
            const res = await fetch(baseUrl + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
            const result = await res.json()
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

                                    <div className="relative flex items-center py-4">
                                        <div className="flex-grow border-t border-gray-200"></div>
                                        <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
                                        <div className="flex-grow border-t border-gray-200"></div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
                                            const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
                                            const scope = "email profile";
                                            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
                                            window.location.href = authUrl;
                                        }}
                                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                className="text-blue-500"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                className="text-green-500"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                className="text-yellow-500"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                className="text-red-500"
                                            />
                                        </svg>
                                        Continue with Google
                                    </button>

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
