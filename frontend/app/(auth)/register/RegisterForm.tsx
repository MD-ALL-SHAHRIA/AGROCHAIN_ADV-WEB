'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/store/slices/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react'; 

export default function RegisterForm() {
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); 
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      await registerUser({ 
        fullName, 
        email, 
        phone,
        password,
        role 
      }).unwrap();
      
      router.push('/login'); 
    } catch (err: any) {
      const errorResponse = err?.data?.message;
      if (Array.isArray(errorResponse)) {
        setErrorMsg(errorResponse.join(', '));
      } else {
        setErrorMsg(errorResponse || 'অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">পুরো নাম (Full Name)</Label>
        <Input
          id="fullName"
          type="text"
          placeholder="উদাঃ Kazi Irfanul Islam"
          className="h-11 shadow-sm border-gray-200 focus-visible:ring-primary"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">ইমেইল ঠিকানা</Label>
          <Input
            id="email"
            type="email"
            placeholder="irfan@agrochain.com"
            className="h-11 shadow-sm border-gray-200 focus-visible:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">ফোন নম্বর</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+8801700000000"
            className="h-11 shadow-sm border-gray-200 focus-visible:ring-primary"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm font-medium text-gray-700">আপনার ভূমিকা (Role)</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="h-11 shadow-sm border-gray-200 focus:ring-primary">
            <SelectValue placeholder="রোল নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            
            <SelectItem value="farmer">কৃষক (Farmer)</SelectItem>
            <SelectItem value="buyer">ক্রেতা (Buyer)</SelectItem>
            <SelectItem value="agent">এজেন্ট (Agent)</SelectItem>
            <SelectItem value="transporter">পরিবহনকারী (Transporter)</SelectItem>
            <SelectItem value="admin">অ্যাডমিন (Admin)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">পাসওয়ার্ড</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="h-11 shadow-sm border-gray-200 focus-visible:ring-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full h-11 text-base font-medium bg-primary hover:bg-primary/90 text-white shadow-sm mt-2" 
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> অপেক্ষা করুন...
          </span>
        ) : (
          'রেজিস্টার করুন'
        )}
      </Button>
    </form>
  );
}