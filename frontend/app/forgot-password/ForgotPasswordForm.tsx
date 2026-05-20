'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/store/slices/auth.api'; 
import { toast } from 'sonner'; 

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error('দয়া করে আপনার ইমেইলটি দিন! 📧');

    try {
      const response = await forgotPassword({ email }).unwrap();
      toast.success(response.message || 'আপনার ইমেইলে কোড পাঠানো হয়েছে! 📬');
      
     
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast.error(error?.data?.message || 'কোড পাঠাতে ব্যর্থ হয়েছে। 😔');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl border border-green-100">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-green-50 rounded-full mb-3 text-2xl">🌱</div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">পাসওয়ার্ড ভুলে গেছেন? 🔒</h2>
        <p className="text-gray-500 text-sm">আপনার অ্যাকাউন্টের ইমেইল ঠিকানাটি নিচে লিখুন।</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ইমেইল ঠিকানা</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="farmer@agrochain.com"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl disabled:bg-green-400"
        >
          {isLoading ? 'অপেক্ষা করুন... ⏳' : 'কোড পাঠান 🚀'}
        </button>
      </form>
    </div>
  );
}