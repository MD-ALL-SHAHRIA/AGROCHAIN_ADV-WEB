import RegisterForm from './RegisterForm';
import { Leaf } from 'lucide-react'; 

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex bg-white">
      
      {/* Left Side: Form Section (Clean & White) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 xl:px-24">
        <div className="w-full max-w-[450px] mx-auto">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-primary p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">AgroChain</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
              অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="text-gray-500">
              স্মার্ট কৃষি ও সরবরাহ ব্যবস্থাপনায় যুক্ত হতে আপনার তথ্য দিন।
            </p>
          </div>

          {/* Render the Clean Form */}
          <RegisterForm />

          <p className="mt-8 text-center text-sm text-gray-600">
            আগে থেকেই অ্যাকাউন্ট আছে?{' '}
            <a href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              লগইন করুন
            </a>
          </p>
        </div>
      </div>

      {/* Right Side: Professional Branding / Image Section (Hidden on Mobile) */}
      <div className="hidden lg:block relative w-1/2 bg-gray-900 overflow-hidden">
        {/* Real Agriculture Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')" 
          }}
        />
        {/* Professional Deep Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-emerald-900/60 to-transparent" />
        
        {/* Content over image */}
        <div className="absolute bottom-0 left-0 p-16 text-white max-w-lg">
          <blockquote className="text-2xl font-medium leading-relaxed mb-6">
            "AgroChain আমাদের সাপ্লাই চেইনকে আরও স্বচ্ছ এবং কৃষকদের জীবনকে আরও সহজ করতে সাহায্য করছে।"
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-lg">ভবিষ্যতের কৃষি</p>
              <p className="text-emerald-200/80 text-sm">স্মার্ট ও নির্ভরযোগ্য</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}