'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setCredentials } from '@/store/slices/authSlice';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  
  const currentToken = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    
    if (!currentToken && typeof window !== 'undefined') {
      const localToken = localStorage.getItem('token');
      const localUserStr = localStorage.getItem('user');

      if (localToken) {
        try {
          
          const parsedUser = localUserStr ? JSON.parse(localUserStr) : null;
          dispatch(setCredentials({ user: parsedUser, accessToken: localToken }));
        } catch (e) {
         
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      } else {
       
        router.push('/login');
      }
    }
    
    
    setIsChecking(false);
  }, [currentToken, router, dispatch]);

 
  if (!currentToken && !isChecking) return null;

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
          <p className="text-sm text-gray-500 font-medium">অ্যাকাউন্ট যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }


  return <>{children}</>;
}