export default function HowItWorks() {
  const steps = [
    { num: '০১', title: 'লট তৈরি করুন', desc: 'কৃষক তার ফসলের বিস্তারিত তথ্য দিয়ে সিস্টেমে লট আপলোড করেন।' },
    { num: '০২', title: 'অর্ডার ও পেমেন্ট', desc: 'ক্রেতা মার্কেটপ্লেস থেকে ফসল পছন্দ করে এস্ক্রো পেমেন্ট সম্পন্ন করেন।' },
    { num: '০৩', title: 'ডেলিভারি', desc: 'ট্রান্সপোর্টার ফসল সংগ্রহ করে ক্রেতার দোরগোড়ায় নিরাপদে পৌঁছে দেন।' }
  ];

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-gray-900">যেভাবে কাজ করে</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-300 to-emerald-100" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-xl shadow-gray-200/50 flex items-center justify-center text-3xl font-black text-emerald-600 mb-8 border-4 border-[#fafafa]">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-500 text-lg max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}