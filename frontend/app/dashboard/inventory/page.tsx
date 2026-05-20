import { Metadata } from 'next';
import InventoryListWrapper from './components/InventoryListWrapper';

export const metadata: Metadata = {
  title: 'আমার ফসল মজুদ | AgroChain',
  description: 'আপনার খামারের সকল ফসলের তালিকা ও বর্তমান অবস্থা ট্র্যাক করুন।',
};

export default function MyInventoryPage() {
  return (
    <main className="space-y-6 animate-in fade-in duration-300">
      <InventoryListWrapper />
    </main>
  );
}