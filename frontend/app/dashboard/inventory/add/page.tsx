import { Metadata } from 'next';
import AddInventoryWrapper from './components/AddInventoryWrapper';

export const metadata: Metadata = {
  title: 'নতুন ফসল যোগ করুন | AgroChain',
  description: 'আপনার খামারের নতুন ফসলের বিবরণ দিয়ে বাজারে বিক্রির জন্য প্রস্তুত করুন।',
};

export default function AddInventoryPage() {
  return (
    <main className="max-w-4xl mx-auto animate-in fade-in duration-300">
      <AddInventoryWrapper />
    </main>
  );
}