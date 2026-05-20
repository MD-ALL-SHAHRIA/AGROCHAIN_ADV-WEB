'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPasswordMutation } from '@/store/slices/auth.api'; 
import { toast } from 'sonner'; 

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
 
  const email = searchParams.get('email') || '';
  const otp = searchParams.get('otp') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error('ইমেইল বা কোড পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন। 🚨');
      return router.push('/forgot-password');
    }

    if (newPassword !== confirmPassword) {
      return toast.error('পাসওয়ার্ড দুটি মিলছে না! 🚨');
    }

    try {
      
      const response = await resetPassword({ email, otp, newPassword }).unwrap();
      toast.success(response.message || 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে! 🎉');
      router.push('/login'); 
    } catch (error: any) {
      toast.error(error?.data?.message || 'কোডটি হয়তো ভুল অথবা মেয়াদ শেষ। 😔');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl border border-green-100">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-emerald-50 rounded-full mb-3 text-2xl">🔐</div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">নতুন পাসওয়ার্ড সেট করুন ✨</h2>
        <p className="text-gray-500 text-sm">আপনার অ্যাকাউন্টের জন্য একটি শক্তিশালী নতুন পাসওয়ার্ড দিন।</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">নতুন পাসওয়ার্ড</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl disabled:bg-green-400"
        >
          {isLoading ? 'সংরক্ষণ করা হচ্ছে... ⏳' : 'পাসওয়ার্ড পরিবর্তন করুন 🚀'}
        </button>
      </form>
    </div>
  );
}