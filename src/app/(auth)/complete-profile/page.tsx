'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { baseUrl } from '@/utils/api-url';
import { PhoneIcon, AddressIcon } from '../../../components/icons';

export default function CompleteProfilePage() {
    const router = useRouter();
    const { user, setUser, loading } = useAuth();
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (!loading && user?.phone && user?.address) {
            router.push('/');
        }
    }, [loading, user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch(`${baseUrl}/auth/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (result.success) {
                setUser(result.data);
                router.push('/');
            } else {
                setError(result.message || 'Failed to update profile');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans">
            <div className="w-full max-w-md mx-auto p-4 md:p-8">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Complete Your Profile</h2>
                    <p className="text-gray-500 mb-8 text-center">We need a few more details to get you started.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
                        
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <PhoneIcon />
                            </div>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                placeholder="Phone Number" 
                                required 
                                className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <AddressIcon />
                            </div>
                            <input 
                                type="text" 
                                name="address" 
                                value={formData.address} 
                                onChange={handleChange} 
                                placeholder="Full Address" 
                                required 
                                className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50"
                        >
                            {submitting ? 'Saving...' : 'Finish Setup'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
