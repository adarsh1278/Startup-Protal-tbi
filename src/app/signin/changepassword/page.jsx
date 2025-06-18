'use client';
import React, { useState, useEffect } from 'react';
import { sha256 } from 'js-sha256';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '@/store/Action/ChangePasswordAction';
import TYPES from '@/store/constant';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/auth/Button';

export default function ChangePassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCheckbox, setShowCheckbox] = useState(false);

  const { loading, success, error } = useSelector((state) => state.changePassword || {});

  useEffect(() => {
    if (success) {
      toast.success(success);
      setTimeout(() => {
        router.push('/Founder/dashboard');
      }, 2000);
    }

    if (error) {
      toast.error(error);
    }

    return () => {
      dispatch({ type: TYPES.Change_Password_RESET });
    };
  }, [success, error, dispatch, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      return toast.error('New password must be at least 6 characters long');
    }

    if (newPassword !== confirmPassword) {
      return toast.error('New passwords do not match');
    }

    const passwordData = {
      currentPassword: sha256(currentPassword),
      newPassword: sha256(newPassword),
    };

    dispatch(changePassword(passwordData));
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl sm:p-8">
        <div className="flex justify-center mb-6">
          <div className="flex gap-4">
            <img className="w-10 h-10 md:h-12 md:w-12" src="/kiet.svg" alt="Logo 1" />
            <img className="w-10 h-10 md:h-12 md:w-12" src="/image3.png" alt="Logo 2" />
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Change Your Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordInput
            id="current-password"
            label="Current Password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <PasswordInput
            id="new-password"
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            error={newPassword && newPassword.length < 6 ? 'New password must be at least 6 characters long' : null}
          />

          <PasswordInput
            id="confirm-password"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={confirmPassword && newPassword !== confirmPassword ? 'Passwords do not match' : null}
          />

          <div className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={!currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 6}
              isLoading={loading}
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </Button>

            <button
              type="button"
              onClick={goBack}
              className="text-sm text-center text-blue-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

