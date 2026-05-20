'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Truck, Wallet, ArrowUpRight, Sprout } from "lucide-react";

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // User na thakle default role 'buyer' hishebe catch korbe
  const role = user?.role || 'buyer';

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Dynamic Welcome Heading */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            আসসালামু আলাইকুম, {user?.fullName || 'ইউজার'} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {role === 'farmer' && 'আপনার খামার এবং মজুদ ফসলের বর্তমান অবস্থা দেখতে পাচ্ছেন।'}
            {role === 'buyer' && 'কৃষকদের কাছ থেকে সরাসরি তাজা ফসল কিনুন ও ট্র্যাক করুন।'}
            {role === 'transporter' && 'আপনার আজকের ট্রিপ ও উপার্জনের লাইভ আপডেট।'}
            {role === 'agent' && 'এজেন্ট ড্যাশবোর্ডে স্বাগতম! আপনার আওতাভুক্ত কৃষকদের ট্র্যাক করুন।'}
            {role === 'admin' && 'সিস্টেম এডমিন ড্যাশবোর্ড ওভারভিউ।'}
          </p>
        </div>
        <div className="hidden sm:flex items-center justify-center h-14 w-14 bg-emerald-50 rounded-full">
          <Sprout className="h-7 w-7 text-emerald-600" />
        </div>
      </div>

      {/* =========================================
          FARMER METRICS 
      ========================================= */}
      {role === 'farmer' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">মোট মজুদ ফসল</CardTitle>
              <div className="p-2 bg-emerald-100 rounded-lg"><Package className="w-4 h-4 text-emerald-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">২,৪৫০ কেজি</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">৩টি ফসল আইটেম লাইভ আছে</p>
            </CardContent>
          </Card>
          
          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">চলমান বিক্রয় অর্ডার</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg"><ShoppingCart className="w-4 h-4 text-blue-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">১২ টি</div>
              <p className="text-xs text-blue-600 mt-1 font-medium">৳ ৪,২০,০০০ মূল্যমান</p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">ওয়ালেট ব্যালেন্স</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg"><Wallet className="w-4 h-4 text-purple-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">৳ ২৫,৩৪০</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">উত্তোলনযোগ্য ব্যালেন্স</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* =========================================
          BUYER METRICS 
      ========================================= */}
      {role === 'buyer' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">মোট ক্রয় আদেশ</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg"><ShoppingCart className="w-4 h-4 text-blue-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">৮ টি অর্ডার</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">এই মাসে সম্পন্ন হয়েছে</p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">একটিভ শিপমেন্ট</CardTitle>
              <div className="p-2 bg-amber-100 rounded-lg"><Truck className="w-4 h-4 text-amber-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">২ টি ট্রিপ অন-ওয়ে</div>
              <p className="text-xs text-amber-600 mt-1 font-medium">ট্র্যাকিং আইডি একটিভ আছে</p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">মোট পরিশোধিত টাকা</CardTitle>
              <div className="p-2 bg-emerald-100 rounded-lg"><Wallet className="w-4 h-4 text-emerald-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">৳ ১,৮৫,০০০</div>
              <p className="text-xs text-emerald-600 mt-1 font-medium">নিরাপদ এস্ক্রো ট্রানজেকশন</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* =========================================
          TRANSPORTER METRICS 
      ========================================= */}
      {role === 'transporter' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">আজকের একটিভ ট্রিপ</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg"><Truck className="w-4 h-4 text-blue-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">৩ টি ডেলিভারি</div>
              <p className="text-xs text-blue-600 mt-1 font-medium">রুট ম্যাপ রেডি আছে</p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">সম্পন্ন ট্রিপ (মাসিক)</CardTitle>
              <div className="p-2 bg-emerald-100 rounded-lg"><ArrowUpRight className="w-4 h-4 text-emerald-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">৪২ টি সফল ট্রিপ</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">১০০% সাকসেস রেট</p>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-gray-600">মোট পরিবহন আয়</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg"><Wallet className="w-4 h-4 text-purple-700" /></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">৳ ৬৮,৫০০</div>
              <p className="text-xs text-emerald-600 mt-1 font-medium">এজেন্ট কমিশন পরিশোধিত</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* =========================================
          MAIN BODY CARDS (Shared but dynamic text)
      ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main tracking / Chart Board */}
        <Card className="lg:col-span-2 border-gray-100 shadow-sm bg-white p-6 h-80 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="font-bold text-gray-900 text-lg">সাম্প্রতিক রিয়েল-টাইম তথ্য</h3>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
              লাইভ ডেটা
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center text-center text-gray-400 py-12 text-sm font-medium">
            {role === 'farmer' && 'এখানে আপনার ফসলের দামের চার্ট ও বাজার চাহিদা ট্র্যাক হবে।'}
            {role === 'buyer' && 'এখানে আপনার অর্ডারকৃত পণ্যের লাইভ জিপিএস লোকেশন দেখানো হবে।'}
            {role === 'transporter' && 'এখানে আপনার আজকের এসাইন হওয়া রুট ও কিলোমিটার ট্র্যাক হবে।'}
            {(role === 'agent' || role === 'admin') && 'এখানে সিস্টেমের গ্রাফিকাল ডাটা দেখানো হবে।'}
          </div>
        </Card>

        {/* Action Board */}
        <Card className="border-gray-100 shadow-sm bg-white p-6 h-80 flex flex-col hover:shadow-md transition-shadow">
          <div className="border-b border-gray-100 pb-4 mb-4">
            <h3 className="font-bold text-gray-900 text-lg">জরুরী নোটিশ ও একশন</h3>
          </div>
          <div className="text-sm text-gray-600 space-y-3 overflow-y-auto pr-2">
            
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs flex gap-3">
              <span className="text-amber-500 text-base">⚠️</span>
              <p className="leading-relaxed">আপনার এনআইডি (NID) ভেরিফিকেশন এখনো সম্পন্ন হয়নি। অনুগ্রহ করে প্রোফাইল আপডেট করুন।</p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs flex gap-3">
              <span className="text-blue-500 text-base">ℹ️</span>
              <p className="leading-relaxed">প্ল্যাটফর্ম ফি আগামী মাস থেকে হ্রাস করা হচ্ছে। বিস্তারিত জানতে আপডেট নিউজ পড়ুন।</p>
            </div>

          </div>
        </Card>
      </div>

    </div>
  );
}