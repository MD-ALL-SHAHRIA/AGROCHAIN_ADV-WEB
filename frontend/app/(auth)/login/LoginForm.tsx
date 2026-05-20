'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/store/slices/auth.api';
import { setCredentials } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'; 

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const result = await login({ email, password }).unwrap();
      
  
      const receivedToken = result.accessToken || result.access_token || result.token;
      const loggedUser = result.user || result.data;

      if (!receivedToken) {
        setErrorMsg('লগইন সফল হয়েছে, কিন্তু সার্ভার থেকে টোকেন পাওয়া যায়নি!');
        return;
      }

      
      dispatch(setCredentials({ user: loggedUser, accessToken: receivedToken }));
      
      
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      
     
      router.push('/dashboard'); 
    } catch (err: any) {
      setErrorMsg(err.data?.message || 'লগইন ব্যর্থ হয়েছে। আপনার ইমেইল বা পাসওয়ার্ড চেক করুন।');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-semibold">ইমেইল ঠিকানা</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Mail className="h-5 w-5" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="user@agrochain.com"
            className="pl-10 border-gray-300 focus:border-primary focus:ring-primary h-11 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-gray-700 font-semibold">পাসওয়ার্ড</Label>
          <a href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80 hover:underline transition-colors">
            পাসওয়ার্ড ভুলে গেছেন?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Lock className="h-5 w-5" />
          </div>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="আপনার পাসওয়ার্ড দিন"
            className="pl-10 pr-10 border-gray-300 focus:border-primary focus:ring-primary h-11 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center font-medium animate-in fade-in zoom-in duration-300">
          {errorMsg}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full h-11 text-base font-bold bg-primary hover:bg-primary/90 text-white transition-all shadow-md hover:shadow-lg" 
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" /> যাচাই করা হচ্ছে...
          </span>
        ) : (
          'লগইন করুন'
        )}
      </Button>

      <div className="text-center text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100">
        অ্যাকাউন্ট নেই?{' '}
        <a href="/register" className="text-primary font-bold hover:underline transition-colors">
          নতুন অ্যাকাউন্ট খুলুন
        </a>
      </div>
    </form>
  );
}