export default function StatsSection() {
  const stats = [
    { label: 'নিবন্ধিত কৃষক', value: '৫,০০০+' },
    { label: 'সফল ডেলিভারি', value: '১২,০০০+' },
    { label: 'বিক্রিত ফসল (টন)', value: '৪৫০+' },
    { label: 'সন্তুষ্ট ক্রেতা', value: '১০,০০০+' }
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-[2.5rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden relative">
          
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]" />
          
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left relative z-10 w-full md:w-auto">
              <h4 className="text-5xl font-black text-white mb-2 tracking-tight">{stat.value}</h4>
              <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm">{stat.label}</p>
              
              {/* Divider for mobile */}
              {i !== stats.length - 1 && (
                <div className="h-px w-full bg-gray-800 mt-8 block md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}