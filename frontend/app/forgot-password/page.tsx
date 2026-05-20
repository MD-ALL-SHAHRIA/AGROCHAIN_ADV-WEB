import ForgotPasswordForm from './ForgotPasswordForm';

export const metadata = {
  title: 'পাসওয়ার্ড পুনরুদ্ধার | AgroChain',
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ForgotPasswordForm />
    </div>
  );
}