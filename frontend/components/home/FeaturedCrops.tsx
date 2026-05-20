import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin } from 'lucide-react';
import Link from 'next/link';

const crops = [
  { id: 1, name: 'প্রিমিয়াম নাজিরশাইল', price: 75, qty: 1000, farmer: 'রহিম মিয়া', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'টাটকা টমেটো', price: 40, qty: 200, farmer: 'করিম শেখ', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'খাঁটি সরিষার তেল', price: 250, qty: 50, farmer: 'আব্দুল খালেক', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'বগুড়ার লাল আলু', price: 35, qty: 500, farmer: 'শফিকুল', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600' }
];

export default function FeaturedCrops() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">জনপ্রিয় ফসলসমূহ</h2>
            <p className="text-gray-500 mt-3 text-lg">সরাসরি কৃষকের মাঠ থেকে সেরা মানের পণ্য</p>
          </div>
          <Link href="/marketplace" className="hidden sm:inline-flex text-[#306D29] font-bold hover:text-[#24531f] items-center gap-1">
            সব দেখুন &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {crops.map((crop) => (
            <Card key={crop.id} className="group border-0 shadow-sm hover:shadow-xl hover:shadow-[#306D29]/10 transition-all duration-300 rounded-[2rem] overflow-hidden bg-white">
              <div className="relative h-60 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={crop.img} alt={crop.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <Badge className="absolute top-4 right-4 z-20 bg-white/95 text-[#306D29] backdrop-blur px-3 py-1.5 shadow-sm border-0">
                  {crop.qty} কেজি মজুদ
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{crop.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-6"><MapPin className="w-3.5 h-3.5 text-[#306D29]"/> কৃষক: {crop.farmer}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">মূল্য</p>
                    <p className="text-2xl font-black text-[#306D29]">৳{crop.price}<span className="text-sm text-gray-400 font-medium">/কেজি</span></p>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-[#306D29]/10 group-hover:bg-[#306D29] group-hover:text-white text-[#306D29] flex items-center justify-center transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}