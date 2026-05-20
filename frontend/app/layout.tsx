import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/components/providers/ReduxProvider';
import { Toaster } from 'sonner';
import InitialDataProvider from '@/components/providers/InitialDataProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AgroChain - কৃষি ও সরবরাহ',
  description: 'স্মার্ট এগ্রিকালচারাল সাপ্লাই চেইন প্ল্যাটফর্ম',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <ReduxProvider>

          <InitialDataProvider>
               {children}

          </InitialDataProvider>
       
          <Toaster position='top-right' richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}