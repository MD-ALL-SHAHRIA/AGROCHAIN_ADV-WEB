import { Leaf, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 pt-24 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-500 p-2 rounded-lg"><Leaf className="h-6 w-6 text-white" /></div>
              <span className="text-3xl font-black text-white">AgroChain</span>
            </Link>
            <p className="text-gray-400 text-lg max-w-sm">প্রযুক্তির মাধ্যমে বাংলাদেশের কৃষিখাতকে ডিজিটাল ও দুর্নীতিমুক্ত করার একটি ক্ষুদ্র প্রয়াস।</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">গুরুত্বপূর্ণ লিঙ্ক</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/marketplace" className="hover:text-emerald-400">ফসল বাজার</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400">আমাদের সম্পর্কে</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-400">সাধারণ জিজ্ঞাসা</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">যোগাযোগ</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-emerald-500"/> hello@agrochain.com</li>
              <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-emerald-500"/> +880 1234-567890</li>
              <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-emerald-500"/> ঢাকা, বাংলাদেশ</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} AgroChain Bangladesh. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">প্রাইভেসি পলিসি</Link>
            <Link href="#" className="hover:text-white">শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}