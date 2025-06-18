'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/auth/TextInput';
import Button from '@/components/auth/Button';

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const isValidEmail = email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            const url = process.env.NEXT_PUBLIC_DATABASE_URL;

            const response = await axios.post(
                `${url}/founder/forgot-password`,
                { email },
                { withCredentials: true }
            );

            if (response.data.statusCode === 200) {
                toast.success('Password reset link has been sent to your email address');
                setEmailSent(true);
            } else {
                toast.error(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        router.push('/signin');
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md sm:p-8">
                <div className="flex justify-center mb-6">
                    <div className="flex gap-4">
                        <img className="w-10 h-10 md:h-12 md:w-12" src="/kiet.svg" alt="Logo 1" />
                        <img className="w-10 h-10 md:h-12 md:w-12" src="/image3.png" alt="Logo 2" />
                    </div>
                </div>

                <h1 className="mb-4 text-2xl font-semibold text-center text-gray-800">
                    {emailSent ? 'Check Your Email' : 'Forgot Password'}
                </h1>

                {emailSent ? (
                    <div className="space-y-6">
                        <p className="text-center text-gray-600">
                            We've sent a password reset link to <strong>{email}</strong>.
                            Please check your email and follow the instructions to reset your password.
                        </p>
                        <div className="flex flex-col space-y-4">
                            <Button onClick={handleBackToLogin}>
                                Back to Login
                            </Button>
                            <button
                                className="text-sm text-blue-600 hover:underline"
                                onClick={() => setEmailSent(false)}
                            >
                                Didn't receive the email? Try again
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p className="mb-6 text-sm text-center text-gray-600">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <TextInput
                                id="forgot-email"
                                type="email"
                                label="Email Address"
                                required
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={email && !isValidEmail(email) ? 'Please enter a valid email address' : null}
                            />

                            <div className="space-y-4">
                                <Button
                                    type="submit"
                                    disabled={!email || !isValidEmail(email)}
                                    isLoading={isLoading}
                                >
                                    Send Reset Link
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="text-sm text-blue-600 hover:underline"
                                        onClick={handleBackToLogin}
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
