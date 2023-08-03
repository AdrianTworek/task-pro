import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getAppServerSession } from '@/utils/get-server-session';
import { RootProvider } from '@/providers/root-provider';

import Navbar from '@/layouts/navbar';
import { cn } from 'ui/src/lib/utils';

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
      <body className={cn(inter.className, 'min-h-screen bg-background')}>
        <RootProvider session={session}>
          <Navbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
