'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  Sprout, LayoutDashboard, Package, ShoppingCart, 
  Truck, Wallet, Settings, PlusCircle, History 
} from 'lucide-react';
import { cn } from '@/lib/utils';


const menuConfig = {
  farmer: [
    { name: 'ওভারভিউ', href: '/dashboard', icon: LayoutDashboard },
    { name: 'আমার ফসল মজুদ', href: '/dashboard/inventory', icon: Package },
    { name: 'ফসল বিক্রি করুন', href: '/dashboard/inventory/add', icon: PlusCircle },
    { name: 'বিক্রয় অর্ডারসমূহ', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'আমার ওয়ালেট', href: '/dashboard/wallet', icon: Wallet },
  ],
  buyer: [
    { name: 'ওভারভিউ', href: '/dashboard', icon: LayoutDashboard },
    { name: 'ফসল বাজার (Market)', href: '/dashboard/marketplace', icon: Sprout },
    { name: 'আমার ক্রয়সমূহ', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'পেমেন্ট হিস্ট্রি', href: '/dashboard/payments', icon: History },
    { name: 'ওয়ালেট রিচার্জ', href: '/dashboard/wallet', icon: Wallet },
  ],
  transporter: [
    { name: 'ওভারভিউ', href: '/dashboard', icon: LayoutDashboard },
    { name: 'ডেলিভারি রিকোয়েস্ট', href: '/dashboard/shipments/available', icon: Sprout },
    { name: 'চলমান ট্রিপসমূহ', href: '/dashboard/shipments', icon: Truck },
    { name: 'পরিবহন আয়', href: '/dashboard/wallet', icon: Wallet },
  ],
  admin: [] 
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.auth);
  

  const currentRole = (user?.role || 'buyer') as keyof typeof menuConfig;
  const navItems = menuConfig[currentRole] || [];

  return (
    <aside className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="bg-emerald-600 p-2 rounded-xl mr-3 shadow-sm shadow-emerald-600/20">
          <Sprout className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-950 tracking-tight">AgroChain</span>
      </div>

      {/* Dynamic Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-emerald-50 text-emerald-700 font-semibold border-l-4 border-emerald-600 pl-2 rounded-l-none" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-600" : "text-gray-400")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Role Tag Bottom Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-semibold text-gray-700 capitalize">
            মোড: <span className="text-emerald-700">{currentRole === 'farmer' ? 'কৃষক' : currentRole === 'buyer' ? 'ক্রেতা' : 'পরিবহনকারী'}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}