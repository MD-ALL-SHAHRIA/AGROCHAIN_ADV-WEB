'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner'; 

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return toast.error('OTP কোডটি অবশ্যই ৬ ডিজিটের হতে হবে! 🔢');
    }
    
    
    router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl border border-green-100">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-emerald-50 rounded-full mb-3 text-2xl">📩</div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">কোড যাচাই করুন 🔑</h2>
        <p className="text-gray-500 text-sm">আপনার <strong>{email}</strong> ইমেইলে পাঠানো ৬-ডিজিটের কোডটি লিখুন।</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">৬-ডিজিটের কোড (OTP)</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-center tracking-[0.5em] text-2xl font-bold"
            placeholder="••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl"
        >
          পরবর্তী ধাপে যান ✨
        </button>
      </form>
    </div>
  );
}