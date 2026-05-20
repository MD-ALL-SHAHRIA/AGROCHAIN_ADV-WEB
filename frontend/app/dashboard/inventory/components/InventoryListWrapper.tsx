'use client';

import { useGetMyInventoriesQuery } from '@/store/slices/inventory.api';
import InventoryHeader from './InventoryHeader';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import InventoryTable from './InventoryTable';

export default function InventoryListWrapper() {
  const { data: inventories, isLoading, isError } = useGetMyInventoriesQuery({});

  return (
    <div className="space-y-6">
      {/* Dynamic Header Component */}
      <InventoryHeader />

      {/* Render matching component state */}
      {isLoading && <LoadingState />}

      {isError && (
        <div className="flex flex-col items-center justify-center py-20 text-red-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="font-semibold text-base">⚠️ ডাটা লোড করতে সমস্যা হয়েছে! অনুগ্রহ করে আবার চেষ্টা করুন।</p>
        </div>
      )}

      {!isLoading && !isError && inventories?.length === 0 && <EmptyState />}

      {!isLoading && !isError && inventories?.length > 0 && (
        <InventoryTable items={inventories} />
      )}
    </div>
  );
}