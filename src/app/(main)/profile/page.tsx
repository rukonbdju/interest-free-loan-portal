'use client'
import React, { useState } from 'react';
import { User, Mail, Phone, Home, Edit, Save, } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { InputField } from '@/components/shared/input-field';
import ChangePassword from '@/components/auth/change-password';




const ProfilePage: React.FC = () => {
    const { user } = useAuth()
    const [isEditing, setIsEditing] = useState(false);
    console.log(isEditing)
    const [profile, setProfile] = useState({});


    // Handles updates to profile data
    const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = () => {
        console.log(profile)
        setIsEditing(false)
    }


    return (
        <div className="">
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 lg:p-8">
                <div className="flex flex-col items-center space-y-4">

                    {/* Profile Header */}
                    <div className="relative">
                        <span
                            className="w-24 h-24 text-4xl text-white font-semibold rounded-full flex items-center justify-center bg-green-600 border-2 border-teal-100"

                        >{user?.name.charAt(0)}</span>
                    </div>

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
                        <p className="text-md text-gray-500">{user?.email}</p>
                    </div>

                </div>

                {/* Separator */}
                <hr className="my-8 border-t border-gray-200" />

                {/* Profile Details Form */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField icon={<User />} label="Full Name" name="name" defaultValue={user?.name || ""} disabled={!isEditing} onChange={handleProfileInputChange} />
                        <InputField icon={<Mail />} label="Email Address" name="email" defaultValue={user?.email || ""} disabled={!isEditing} onChange={handleProfileInputChange} type="email" />
                    </div>
                    <InputField icon={<Phone />} label="Phone Number" name="phone" defaultValue={user?.phone || ''} disabled={!isEditing} onChange={handleProfileInputChange} />
                    <InputField icon={<Home />} label="Address" name="address" defaultValue={user?.address || ''} disabled={!isEditing} onChange={handleProfileInputChange} />
                    <ChangePassword isEditing={isEditing} setIsEditing={setIsEditing} />
                    <div className='flex justify-end items-center gap-4'>

                        {isEditing && <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all duration-200"
                        >
                            Cancel
                        </button>}
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all duration-200"
                        >
                            Reset
                        </button>
                        {
                            isEditing ? <button
                                disabled={Object.entries(profile).length > 0}
                                onClick={handleUpdateProfile}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-teal-600 text-white font-semibold shadow-md hover:bg-teal-700 transition-all duration-200"
                            >
                                <Save size={18} /> Save Change
                            </button> : <button

                                onClick={() => setIsEditing(true)}
                                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-teal-600 text-white font-semibold shadow-md hover:bg-teal-700 transition-all duration-200"
                            >
                                <Edit size={18} /> Edit Profile
                            </button>
                        }

                    </div>

                </div>
            </div>

            <style>{`
                @keyframes scale-in {
                    from {
                        transform: scale(0.95);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-scale-in {
                animation: scale-in 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
      `}</style>
        </div>
    );
};

export default ProfilePage;
