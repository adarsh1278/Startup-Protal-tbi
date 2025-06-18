'use client';
import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '@/store/Action/ForgotPasswordAction';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/auth/Button';

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error('Invalid or missing reset token');
            router.push('/signin');
        }
    }, [token, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password
        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const hashedPassword = sha256(newPassword);
            const result = await dispatch(resetPassword(token, hashedPassword));

            if (result.success) {
                toast.success('Your password has been reset successfully');
                setResetSuccess(true);
            } else {
                toast.error(result.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error(error);
            toast.error('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        router.push('/signin');
    };

    if (!token) {
        return null; // Don't render anything while redirecting
    } return (
        <div className="flex flex-col md:flex-row min-h-screen w-full bg-back-rgba p-2 text-gray-800 transition-all">
            {/* Form panel */}
            <div className="relative flex flex-1 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg sm:p-6 md:rounded-l-3xl md:rounded-r-none md:p-8 lg:p-12">
                {/* Mobile background image */}
                <div
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-50 rounded-lg md:rounded-l-3xl md:rounded-r-none md:hidden"
                    style={{ backgroundImage: "url('/login.png')" }}
                    aria-hidden="true"
                ></div>

                {/* Content container */}                <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto md:items-start">
                    <div className="flex gap-4 mb-6 md:mb-10 justify-center md:justify-start w-full">
                        <img className="w-10 h-10 md:h-16 md:w-16" src="/kiet.svg" alt="KIET Logo" />
                        <img className="w-10 h-10 md:h-16 md:w-16" src="/image3.png" alt="TBI Logo" />
                    </div>                    <h1 className="text-hd-rgba mb-2 font-sans text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left">
                        {resetSuccess ? 'Password Reset Successful' : 'Reset Your Password'}
                    </h1>                    {resetSuccess ? (
                        <div className="w-full">
                            <div className="bg-green-50 p-4 rounded-lg mb-6">
                                <p className="text-gray-700 mb-2 text-center">
                                    Your password has been reset successfully.
                                </p>
                                <p className="font-medium text-green-800 text-center">
                                    You can now log in with your new password.
                                </p>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <Button onClick={handleBackToLogin}>
                                    Back to Login
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>                            <p className="text-gray-600 mb-6 text-center font-sans text-sm md:text-left md:text-base lg:mb-8">
                            Please create a new secure password for your account
                        </p>
                            <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-6">
                                <PasswordInput
                                    id="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    label="New Password"
                                    placeholder="Enter new password"
                                    required
                                    error={newPassword && newPassword.length < 6 ? 'Password must be at least 6 characters long' : null}
                                />

                                <PasswordInput
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    label="Confirm New Password"
                                    placeholder="Confirm new password"
                                    required
                                    error={
                                        confirmPassword && newPassword !== confirmPassword
                                            ? 'Passwords do not match'
                                            : null
                                    }
                                />                                <div className="flex flex-col space-y-4">
                                    <Button
                                        type="submit"
                                        disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 6}
                                        isLoading={isLoading}
                                    >
                                        Reset Password
                                    </Button>

                                    <button
                                        type="button"
                                        className={`text-sm text-center ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                                        onClick={!isLoading ? handleBackToLogin : undefined}
                                        disabled={isLoading}
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* Right panel - Hero section */}
            <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 rounded-r-3xl bg-blue-rgba text-white">
                <div className="max-w-lg text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
                        Secure Your Account
                    </h2>
                    <img
                        src="/login.png"
                        className="max-w-sm lg:max-w-md mx-auto"
                        alt="Security Visual"
                    />
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
