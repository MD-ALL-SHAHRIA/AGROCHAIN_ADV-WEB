import { Loader2, ShoppingCart } from 'lucide-react';
import MarketplaceCard from './MarketplaceCard';

interface Props {
  inventories: any[];
  isLoading: boolean;
  isError: boolean;
}

export default function MarketplaceGrid({ inventories, isLoading, isError }: Props) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-emerald-600 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-medium text-gray-500 text-sm">মার্কেটপ্লেস লোড হচ্ছে...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-red-100 shadow-sm">
        <p className="text-red-500 font-semibold text-lg">⚠️ ডাটা লোড করতে সমস্যা হয়েছে!</p>
      </div>
    );
  }

  if (!isLoading && !isError && inventories?.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <ShoppingCart className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-900">কোনো ফসল পাওয়া যায়নি</h3>
        <p className="text-gray-500 mt-1">আপনার খোঁজা মান অনুযায়ী বর্তমানে কোনো ফসল স্টকে নেই।</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {inventories?.map((item: any) => (
        <MarketplaceCard key={item.id} item={item} />
      ))}
    </div>
  );
}