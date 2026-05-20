import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function InventoryHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">আমার ফসল মজুদ</h1>
        <p className="text-sm text-gray-500 mt-1">আপনার খামারের সকল ফসলের তালিকা ও বর্তমান অবস্থা</p>
      </div>
      <Link href="/dashboard/inventory/add">
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm flex items-center gap-2">
          <Plus className="w-5 h-5" />
          নতুন ফসল যোগ করুন
        </Button>
      </Link>
    </div>
  );
}