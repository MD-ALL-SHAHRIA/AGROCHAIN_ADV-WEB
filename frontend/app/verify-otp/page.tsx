import VerifyOtpForm from './VerifyOtpForm';

export const metadata = {
  title: 'কোড যাচাই করুন | AgroChain',
};

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <VerifyOtpForm />
    </div>
  );
}