'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice'; 
import { Loader2 } from 'lucide-react';

export default function InitialDataProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে ডাটা নেওয়া হচ্ছে
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        dispatch(
          setCredentials({
            user: JSON.parse(storedUser),
            accessToken: storedToken, // 🔥 ঠিক এখানে token-এর বদলে accessToken হবে!
          })
        );
      } catch (error) {
        console.error('Failed to parse user data', error);
      }
    }
    setIsLoading(false);
  }, [dispatch]);

  // পেজ লোড হওয়ার সময় একটি লোডার দেখাবে
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <Loader2 className="h-8 w-8 animate-spin text-[#306D29]" />
      </div>
    );
  }

  return <>{children}</>;
}