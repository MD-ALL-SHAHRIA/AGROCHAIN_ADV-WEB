import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#306D29] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-[#306D29]/20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">কৃষিতে নতুন বিপ্লব শুরু হোক আপনার হাত ধরে</h2>
            <p className="text-white/80 text-xl mb-10">আজই বিনামূল্যে নিবন্ধন করুন এবং সারা দেশের ক্রেতাদের সাথে যুক্ত হোন।</p>
            <Link href="/register">
              <Button size="lg" className="h-16 px-12 text-xl bg-white text-[#306D29] hover:bg-gray-100 rounded-full shadow-xl">
                এক্ষুনি শুরু করুন
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}