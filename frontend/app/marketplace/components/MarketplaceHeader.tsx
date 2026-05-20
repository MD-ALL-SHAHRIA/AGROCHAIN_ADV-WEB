import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Sprout } from 'lucide-react';

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  filterType: string;
  setFilterType: (val: string) => void;
}

export default function MarketplaceHeader({ searchTerm, setSearchTerm, filterType, setFilterType }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <Sprout className="w-6 h-6 text-emerald-600" />
          ফসল বাজার (Marketplace)
        </h1>
        <p className="text-sm text-gray-500 mt-1">সরাসরি কৃষকদের কাছ থেকে সেরা মানের তাজা ফসল যাচাই করে কিনুন।</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="ফসলের নাম দিয়ে খুঁজুন..." 
            className="pl-10 h-11 border-gray-200 focus-visible:ring-emerald-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[200px] h-11 border-gray-200 focus:ring-emerald-600">
            <SelectValue placeholder="সব ধরণ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব ধরণ (All)</SelectItem>
            <SelectItem value="rice">ধান/চাল (Rice)</SelectItem>
            <SelectItem value="wheat">গম (Wheat)</SelectItem>
            <SelectItem value="potato">আলু (Potato)</SelectItem>
            <SelectItem value="vegetables">শাকসবজি (Vegetables)</SelectItem>
            <SelectItem value="fruits">ফলমূল (Fruits)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}