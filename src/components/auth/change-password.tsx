import { Lock, Unlock, XCircle } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { InputField } from "../shared/input-field";

type ChangePasswordProps = {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword = ({ isEditing, setIsEditing }: ChangePasswordProps) => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [storedPassword, setStoredPassword] = useState('password123'); // A mock stored password for demonstration
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Handles the password change logic
    const handlePasswordChange = () => {
        // 1. Check if new passwords match
        if (newPassword !== confirmNewPassword) {
            setPasswordError('New passwords do not match.');
            return;
        }

        // 2. Check if the current password is correct
        if (currentPassword !== storedPassword) {
            setPasswordError('Incorrect current password.');
            return;
        }

        // 3. Simple validation for new password length
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            return;
        }

        // If all checks pass, update the password and show success message
        setStoredPassword(newPassword);
        setPasswordError('');
        setShowPasswordModal(false);

        // Clear the input fields for security
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };
    return (
        <>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock />
                    </div>
                    <input
                        type="password"
                        value="********"
                        readOnly
                        disabled={!isEditing}
                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:cursor-not-allowed"
                    />
                    {isEditing && (
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="absolute inset-y-0 right-0 px-4 py-2 text-sm text-teal-600 font-semibold hover:text-teal-800 transition-all duration-200"
                        >
                            Change
                        </button>
                    )}
                </div>
            </div>
            {showPasswordModal && createPortal(
                <div className="fixed inset-0 bg-gray-500/60 flex items-center justify-center p-4 z-50">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-scale-in">
                        <h2 className="text-xl font-bold text-gray-800 text-center">Change Password</h2>

                        <InputField
                            icon={<Lock />}
                            label="Current Password"
                            name="currentPassword"
                            value={currentPassword}
                            disabled={false}
                            onChange={(e) => { setCurrentPassword(e.target.value); setPasswordError('') }}
                            type="password"
                        />
                        <InputField
                            icon={<Unlock />}
                            label="New Password"
                            name="newPassword"
                            value={newPassword}
                            disabled={false}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                        />
                        <InputField
                            icon={<Unlock />}
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            value={confirmNewPassword}
                            disabled={false}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            type="password"
                        />

                        {passwordError && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-100 text-red-700 font-medium">
                                <XCircle size={20} />
                                {passwordError}
                            </div>
                        )}

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordChange}
                                className="px-6 py-2.5 rounded-lg bg-teal-600 text-white font-semibold shadow-md hover:bg-teal-700 transition-all duration-200"
                            >
                                Save New Password
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>

    )
}

export default ChangePassword;