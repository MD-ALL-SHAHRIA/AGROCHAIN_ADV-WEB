import { ShieldCheck, Leaf, Truck, Smartphone } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">অ্যাগ্রোচেইন কেন সেরা?</h2>
          <p className="text-lg text-gray-500 mt-4 max-w-xl">প্রযুক্তির সমন্বয়ে আমরা তৈরি করেছি একটি স্মার্ট এবং নিরাপদ ইকোসিস্টেম।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          
          {/* Big Featured Box */}
          <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-10 relative overflow-hidden group">
            <ShieldCheck className="absolute -right-10 -bottom-10 w-80 h-80 text-white/5 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-400 mb-8">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">নিরাপদ এস্ক্রো পেমেন্ট</h3>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">পণ্য হাতে বুঝে পাওয়ার আগ পর্যন্ত আপনার টাকা আমাদের কাছে ১০০% নিরাপদ থাকে। জিরো রিস্ক।</p>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-[2.5rem] p-10 group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600 mb-8">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">১০০% সতেজতা</h3>
            <p className="text-gray-600 leading-relaxed">মাঠ থেকে সরাসরি সংগ্রহ করা হয় বলে সতেজতা থাকে অটুট।</p>
          </div>

          <div className="bg-amber-50 rounded-[2.5rem] p-10 group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-amber-600 mb-8">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">দ্রুত ডেলিভারি</h3>
            <p className="text-gray-600 leading-relaxed">নিবন্ধিত ট্রান্সপোর্টার দ্বারা দেশের যেকোনো প্রান্তে দ্রুততম ডেলিভারি।</p>
          </div>

          <div className="md:col-span-2 bg-gray-100 rounded-[2.5rem] p-10 relative overflow-hidden">
             <div className="relative z-10 max-w-md">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-8">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">স্মার্ট ট্র্যাকিং অ্যাপ</h3>
              <p className="text-gray-600 text-lg leading-relaxed">অর্ডার করা থেকে শুরু করে আপনার দরজায় পৌঁছানো পর্যন্ত প্রতিটি ধাপ লাইভ ট্র্যাক করুন।</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}