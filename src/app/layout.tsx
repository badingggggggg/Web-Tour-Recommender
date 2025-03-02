import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import ReactQueryProvider from '@/components/providers/react-query-provider';
import NextAuthProvider from '../components/layout/providers';

export const metadata: Metadata = {
  title: 'La Union Tourism',
  description: 'Discover the hidden gems of La Union, Philippines.'
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${poppins.className}`} suppressHydrationWarning>
      <body>
        <NextAuthProvider>
          <ReactQueryProvider>
            <NextTopLoader showSpinner={false} />
            <NuqsAdapter>
              <Toaster position='top-right' />
              {children}
            </NuqsAdapter>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
