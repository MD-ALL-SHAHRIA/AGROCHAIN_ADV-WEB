import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FormHeader() {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link href="/dashboard/inventory">
        <Button variant="outline" size="icon" className="h-10 w-10 bg-white border-gray-200">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Button>
      </Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">নতুন ফসল যোগ করুন</h1>
        <p className="text-sm text-gray-500 mt-1">আপনার খামারের নতুন ফসলের বিবরণ দিয়ে বাজারে বিক্রির জন্য প্রস্তুত করুন</p>
      </div>
    </div>
  );
}