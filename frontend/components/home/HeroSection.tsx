import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, ShieldCheck, PlayCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#306D29]/10 border border-[#306D29]/20 text-[#306D29] text-sm font-bold mb-8 w-max">
              <span className="flex h-2 w-2 rounded-full bg-[#306D29] animate-pulse" />
              বাংলাদেশের সবচেয়ে বড় কৃষি মার্কেটপ্লেস
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 leading-[1.1] mb-6">
              মাঠের তাজা ফসল <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#306D29] to-[#429438]">
                আপনার ঠিকানায়
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
              মাঝখানে কোনো দালাল নেই। সরাসরি কৃষকের মাঠ থেকে ১০০% সতেজ, খাঁটি এবং নিরাপদ কৃষিপণ্য কিনে নিন একদম ন্যায্য মূল্যে।
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/marketplace">
                <Button size="lg" className="h-14 px-8 text-lg bg-[#306D29] hover:bg-[#24531f] text-white rounded-full shadow-lg shadow-[#306D29]/30 transition-all group">
                  কেনাকাটা শুরু করুন
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-gray-200 text-gray-700 hover:bg-[#306D29]/5 hover:border-[#306D29]/30 rounded-full transition-all">
                  <PlayCircle className="w-5 h-5 mr-2 text-[#306D29]" /> কীভাবে কাজ করে?
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-gray-500 font-medium border-t border-gray-100 pt-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#306D29]" /> নিরাপদ পেমেন্ট
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#306D29]" /> ১০০% তাজা পণ্য
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="absolute inset-0 bg-[#306D29]/10 rounded-[2.5rem] transform rotate-3 scale-[1.02] -z-10"></div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1200" 
                alt="তাজা ফসলের সমাহার" 
                className="w-full h-[450px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-50 hidden md:flex items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <div className="bg-[#306D29]/10 p-3 rounded-xl text-[#306D29]">
                <Leaf className="w-8 h-8"/>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">মাঠ থেকে সংগৃহীত</p>
                <p className="text-sm text-gray-500 font-medium">আজকের তাজা ফসল</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}