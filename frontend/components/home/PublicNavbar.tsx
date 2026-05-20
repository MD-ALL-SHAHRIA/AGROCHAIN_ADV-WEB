

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { User, LayoutDashboard, LogOut, LogIn } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function PublicNavbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  
 
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
   
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
   
    dispatch(logout());
    
    router.push('/login');
  };

  if (!mounted) return null;

  return (
   <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* 🌱 Brand Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            AgroChain
          </span>
        </div>

        {/* 🗺️ Navigation Links (Optional Menu Items) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-green-600 transition-colors">হোম</a>
          <a href="/marketplace" className="hover:text-green-600 transition-colors">মার্কেটপ্লেস</a>
          <a href="/about" className="hover:text-green-600 transition-colors">আমাদের সম্পর্কে</a>
        </div>

        {/* 🔐 Authentication Dynamic Button Section */}
        <div className="flex items-center gap-4">
          {token ? (
            /* 👤 USER IS LOGGED IN: Show Account Dropdown Menu */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 border-green-200 bg-green-50/50 hover:bg-green-50 text-green-800 font-semibold rounded-xl px-4 py-2 transition-all">
                  <User className="h-4 w-4 text-green-600" />
                  <span>{user?.fullName || 'আমার অ্যাকাউন্ট'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 p-1.5 rounded-xl border-green-100 shadow-xl bg-white animate-in fade-in slide-in-from-top-2 duration-200">
                
                <DropdownMenuItem 
                  onClick={() => router.push('/dashboard')}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 rounded-lg cursor-pointer font-medium transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4 text-green-600" />
                  <span>ড্যাশবোর্ড (Dashboard)</span>
                </DropdownMenuItem>
                
                <hr className="my-1.5 border-gray-100" />
                
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>লগআউট করুন</span>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* 🔑 USER IS NOT LOGGED IN: Show Default Login / Register Buttons */
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-green-700 font-medium px-4"
              >
                লগইন
              </Button>
              <Button 
                onClick={() => router.push('/register')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl px-4 shadow-md shadow-green-100 transition-all"
              >
                নিবন্ধন করুন
              </Button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}