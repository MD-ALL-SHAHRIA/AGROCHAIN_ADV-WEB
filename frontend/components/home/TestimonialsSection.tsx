import { User } from 'lucide-react';

export default function TestimonialsSection() {
  const reviews = [
    { name: 'আব্দুর রহমান', role: 'নিবন্ধিত কৃষক', text: 'অ্যাগ্রোচেইনের মাধ্যমে দালাল ছাড়াই সরাসরি ফসল বেচতে পারছি। দামও পাচ্ছি অনেক ভালো।' },
    { name: 'নাসরিন আক্তার', role: 'নিয়মিত ক্রেতা', text: 'এস্ক্রো পেমেন্ট থাকায় টাকা হারানোর ভয় নেই। খাঁটি পণ্য খুব দ্রুত ডেলিভারি পেয়েছি।' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-black text-gray-900 mb-16 text-center">ব্যবহারকারীদের কথা</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
              <p className="text-xl text-gray-600 leading-relaxed italic mb-10">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center"><User className="text-gray-500"/></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{r.name}</h4>
                  <p className="text-gray-500">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}