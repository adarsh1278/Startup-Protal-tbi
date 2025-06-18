'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { sha256 } from 'js-sha256';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '@/store/Action/refreshAcessTokenAction';
import TextInput from '@/components/auth/TextInput';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/auth/Button';

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Mode state: 'signin' or 'forgot'
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isSignInFormValid = () => {
    return isValidEmail(email) && password.length >= 3;
  };

  const isForgotFormValid = () => {
    return isValidEmail(email);
  };

  async function handleSignIn(e) {
    e.preventDefault();

    if (!isSignInFormValid()) {
      return;
    }

    setIsLoading(true);

    try {
      const encryptedPassword = sha256(password);
      const url = process.env.NEXT_PUBLIC_DATABASE_URL;

      const response = await axios.post(
        `${url}/founder/login`,
        {
          email,
          password: encryptedPassword,
        },
        { withCredentials: true },
      );

      if (response.data.statusCode === 200) {
        await localStorage.setItem(
          'accessTokenFounder',
          response.data.data.accessToken,
        );
        await localStorage.setItem(
          'refreshTokenFounder',
          response.data.data.refreshToken,
        );
        toast.success('Successfully logged in');
        await dispatch(getAccessToken());

        setTimeout(() => {
          router.push('/Founder/dashboard');
        }, 2000);
      } else {
        toast.error(response.data.message || "Error occurred");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();

    if (!isForgotFormValid()) {
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
        toast.success('Password reset link has been sent to your email');
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
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-back-rgba p-2 text-gray-800 transition-all">
      {/* Left panel - Authentication form */}
      <div className="relative flex flex-1 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg sm:p-6 md:rounded-l-3xl md:rounded-r-none md:p-8 lg:p-12">
        {/* Mobile background image */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-50 rounded-lg md:rounded-l-3xl md:rounded-r-none md:hidden"
          style={{ backgroundImage: "url('/login.png')" }}
          aria-hidden="true"
        ></div>

        {/* Content container with z-index to appear above background */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto md:items-start">
          {/* Logos */}
          <div className="flex gap-4 mb-6 md:mb-10 justify-center md:justify-start w-full">
            <img className="w-10 h-10 md:h-16 md:w-16" src="/kiet.svg" alt="KIET Logo" />
            <img className="w-10 h-10 md:h-16 md:w-16" src="/image3.png" alt="TBI Logo" />
          </div>

          {/* Sign In Form */}
          {mode === 'signin' && (
            <>
              <h1 className="text-hd-rgba mb-2 font-sans text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left">
                Sign In
              </h1>
              <p className="text-gray-600 mb-6 text-center font-sans text-sm md:text-left md:text-base lg:mb-8">
                Kindly fill in your details to sign in to your account
              </p>
              <form className="flex flex-col w-full space-y-6" onSubmit={handleSignIn}>
                <TextInput
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  error={email && !isValidEmail(email) ? 'Please enter a valid email address' : null}
                />

                <PasswordInput
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  error={password && password.length < 3 ? 'Password must be at least 3 characters' : null}
                />

                <div className="flex justify-end">                  <button
                  type="button"
                  onClick={!isLoading ? () => setMode('forgot') : undefined}
                  className={`text-sm ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                  disabled={isLoading}
                >
                  Forgot Password?
                </button>
                </div>

                <Button
                  type="submit"
                  disabled={!isSignInFormValid()}
                  isLoading={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </>
          )}

          {/* Forgot Password Form */}
          {mode === 'forgot' && !emailSent && (
            <>
              <h1 className="text-hd-rgba mb-2 font-sans text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left">
                Forgot Password
              </h1>
              <p className="text-gray-600 mb-6 text-center font-sans text-sm md:text-left md:text-base lg:mb-8">
                Enter your email address and we'll send you a link to reset your password
              </p>
              <form className="flex flex-col w-full space-y-6" onSubmit={handleForgotPassword}>
                <TextInput
                  id="forgot-email"
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  error={email && !isValidEmail(email) ? 'Please enter a valid email address' : null}
                />

                <div className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    disabled={!isForgotFormValid()}
                    isLoading={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>                  <button
                    type="button"
                    onClick={!isLoading ? () => setMode('signin') : undefined}
                    className={`text-sm text-center ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                    disabled={isLoading}
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Email Sent Confirmation */}
          {mode === 'forgot' && emailSent && (
            <div className="w-full">
              <h1 className="text-hd-rgba mb-4 font-sans text-2xl md:text-3xl font-bold text-center">
                Check Your Email
              </h1>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700 mb-2 text-center">
                  We've sent a password reset link to:
                </p>
                <p className="font-medium text-blue-800 text-center break-all">
                  {email}
                </p>
              </div>
              <p className="text-gray-600 mb-6 text-center text-sm">
                Please check your email and follow the instructions to reset your password.
              </p>
              <div className="flex flex-col space-y-4">                <Button
                onClick={() => setMode('signin')}
                isLoading={isLoading}
              >
                Back to Sign In
              </Button>
                <button
                  type="button"
                  className={`text-sm text-center ${isLoading ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                  onClick={!isLoading ? () => setEmailSent(false) : undefined}
                  disabled={isLoading}
                >
                  Didn't receive the email? Try again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right panel - Hero section */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center p-8 rounded-r-3xl bg-blue-rgba text-white">
        <div className="max-w-lg text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
            Empowering Startups with Mentors. Resources. Investments.
          </h2>
          <img
            src="/login.png"
            className="max-w-sm lg:max-w-md mx-auto"
            alt="Startup Collaboration Visual"
          />
        </div>
      </div>
    </div>
  );
}
