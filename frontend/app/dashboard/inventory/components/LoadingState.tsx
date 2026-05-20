import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-emerald-600 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <Loader2 className="w-8 h-8 animate-spin mb-4" />
      <p className="font-medium text-sm text-gray-500">তথ্য লোড করা হচ্ছে...</p>
    </div>
  );
}