import LoginForm from './LoginForm';
import { Sprout } from 'lucide-react'; 

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-100 p-4 relative overflow-hidden">
      
      <div className="absolute bottom-0 right-0 w-full h-[300px] opacity-10 pointer-events-none">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full">
          <path d="M0,160 C240,280 480,120 720,200 C960,280 1200,160 1440,240 L1440,320 L0,320 Z" fill="#10b981" />
          <path d="M0,220 C300,140 600,260 900,180 C1200,100 1350,220 1440,200 L1440,320 L0,320 Z" fill="#047857" />
        </svg>
      </div>

      <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-emerald-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-green-300/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="h-14 w-14 bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl flex items-center justify-center shadow-lg mb-3 shadow-emerald-700/20">
            <Sprout className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black text-gray-950 tracking-tight">
            Agro<span className="text-emerald-600">Chain</span>
          </h1>
          <p className="text-sm text-emerald-800/80 mt-1 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            স্মার্ট কৃষি সরবরাহ ও বাজার ব্যবস্থাপনা
          </p>
        </div>
        
        {/* Main Glassmorphism Card */}
        <div className="bg-white/95 border border-emerald-100 rounded-3xl shadow-[0_20px_50px_rgba(4,120,87,0.1)] p-8 sm:p-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">লগইন করুন</h2>
            <p className="text-xs text-gray-500 mt-1">আপনার অ্যাকাউন্টে প্রবেশ করতে সঠিক তথ্য দিন</p>
          </div>
          
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-emerald-800/50 mt-6 font-medium">
          © {new Date().getFullYear()} AgroChain. সমস্ত অধিকার সংরক্ষিত।
        </p>
      </div>
    </div>
  );
}