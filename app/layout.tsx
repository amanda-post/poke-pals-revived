import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import SessionProviderWrapper from '~/components/SessionProviderWrapper';
import { Toaster } from '~/components/ui/toaster';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Poke Pals',
  description: 'Catch em all, with your friends!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Toaster />
      <SessionProviderWrapper>
        <body className={inter.className}>{children}</body>
      </SessionProviderWrapper>
    </html>
  );
}
