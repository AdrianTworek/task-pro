import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { RootProvider } from '@/providers/root-provider';
import Navbar from '@/layouts/navbar';
import { getAppServerSession } from '@/utils/get-server-session';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskPRO',
  description: 'Application for advanced task management',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAppServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider session={session}>
          <Navbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
