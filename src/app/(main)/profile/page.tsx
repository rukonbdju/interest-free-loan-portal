'use client'
import React, { useState } from 'react';
import { User, Mail, Phone, Home, Edit, Save, } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { InputField } from '@/components/shared/input-field';
import ChangePassword from '@/components/auth/change-password';

// Interface for user data props
interface UserProfile {
    name: string;
    email: string;
    phone?: string;
    address?: string;
}



const ProfilePage: React.FC = () => {
    const { user } = useAuth()
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<UserProfile>({
        name: 'Alexandra Collins',
        email: 'alexandra.c@example.com',
        phone: '555-0102',
        address: '123 Maple Street, Anytown, USA',
    });


    // Handles updates to profile data
    const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    // Toggles editing mode and clears messages
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };


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

                    {/* Action Button */}
                    <button
                        onClick={toggleEditing}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-teal-600 text-white font-semibold shadow-md hover:bg-teal-700 transition-all duration-200"
                    >
                        {isEditing ? <Save size={18} /> : <Edit size={18} />}
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>

                {/* Separator */}
                <hr className="my-8 border-t border-gray-200" />

                {/* Profile Details Form */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField icon={<User />} label="Full Name" name="name" value={profile.name} disabled={!isEditing} onChange={handleProfileInputChange} />
                        <InputField icon={<Mail />} label="Email Address" name="email" value={profile.email} disabled={!isEditing} onChange={handleProfileInputChange} type="email" />
                    </div>
                    <InputField icon={<Phone />} label="Phone Number" name="phone" value={profile.phone || ''} disabled={!isEditing} onChange={handleProfileInputChange} />
                    <InputField icon={<Home />} label="Address" name="address" value={profile.address || ''} disabled={!isEditing} onChange={handleProfileInputChange} />
                    <ChangePassword isEditing={isEditing} setIsEditing={setIsEditing} />
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
