import { Metadata } from 'next';
import EditInventoryWrapper from './components/EditInventoryWrapper';

export const metadata: Metadata = {
  title: 'ফসল সংশোধন করুন | AgroChain',
  description: 'আপনার মজুদকৃত ফসলের তথ্য আপডেট বা সংশোধন করুন।',
};

export default function EditInventoryPage() {
  return (
    <main className="max-w-4xl mx-auto animate-in fade-in duration-300">
      <EditInventoryWrapper />
    </main>
  );
}