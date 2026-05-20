import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Sprout } from 'lucide-react';

const categoryMap: Record<string, string> = {
  rice: 'ধান/চাল',
  wheat: 'গম',
  potato: 'আলু',
  vegetables: 'শাকসবজি',
  fruits: 'ফলমূল',
};

interface Props {
  item: any;
}

export default function MarketplaceCard({ item }: Props) {
  return (
    <Card className="overflow-hidden border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 w-full overflow-hidden">
        {item.images && item.images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={item.images[0]} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
            <Sprout className="w-16 h-16" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 text-emerald-700 hover:bg-white font-semibold backdrop-blur-sm border-none shadow-sm">
            {categoryMap[item.cropType] || item.cropType}
          </Badge>
        </div>
      </div>

      {/* Details */}
      <CardContent className="p-5 flex-1">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1" title={item.title}>
          {item.title}
        </h3>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">পরিমাণ:</span>
            <span className="font-semibold text-gray-900">{Number(item.quantity).toLocaleString('bn-BD')} কেজি</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">সংগ্রহের তারিখ:</span>
            <span className="font-medium text-gray-700">
              {item.harvestDate ? new Date(item.harvestDate).toLocaleDateString('bn-BD') : 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>কৃষকের লোকেশন</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">একক মূল্য</p>
            <p className="text-xl font-black text-emerald-600">
              ৳ {Number(item.price).toLocaleString('bn-BD')}
              <span className="text-sm font-normal text-gray-500">/কেজি</span>
            </p>
          </div>
        </div>
      </CardContent>

      {/* Action */}
      <CardFooter className="p-5 pt-0">
        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-sm transition-colors">
          <ShoppingCart className="w-4 h-4 mr-2" />
          অর্ডার করুন
        </Button>
      </CardFooter>
    </Card>
  );
}