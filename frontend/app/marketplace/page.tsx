import { Metadata } from 'next';
import MarketplaceWrapper from './components/MarketplaceWrapper';

export const metadata: Metadata = {
  title: 'ফসল বাজার (Marketplace) | AgroChain',
  description: 'সরাসরি কৃষকদের কাছ থেকে সেরা মানের তাজা ফসল যাচাই করে কিনুন।',
};

export default function MarketplacePage() {
  return (
    <main className="animate-in fade-in duration-500">
      <MarketplaceWrapper />
    </main>
  );
}