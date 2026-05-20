import { PackageOpen } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <PackageOpen className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">কোনো ফসল পাওয়া যায়নি</h3>
      <p className="text-gray-500 mt-1 text-sm max-w-sm">
        আপনি এখনো বিক্রির জন্য কোনো ফসল যোগ করেননি। "নতুন ফসল যোগ করুন" বাটনে ক্লিক করে প্রথম ফসল যুক্ত করুন।
      </p>
    </div>
  );
}