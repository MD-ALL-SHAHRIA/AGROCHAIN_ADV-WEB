'use client';

import { useState } from 'react';
import { useGetAllInventoriesQuery } from '@/store/slices/inventory.api';
import MarketplaceHeader from './MarketplaceHeader';
import MarketplaceGrid from './MarketplaceGrid';

export default function MarketplaceWrapper() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  
  const { data: inventories, isLoading, isError } = useGetAllInventoriesQuery({
    search: searchTerm,
    cropType: filterType,
  });

  return (
    <div className="space-y-6">
      <MarketplaceHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filterType={filterType} 
        setFilterType={setFilterType} 
      />
      
      <MarketplaceGrid 
        inventories={inventories} 
        isLoading={isLoading} 
        isError={isError} 
      />
    </div>
  );
}