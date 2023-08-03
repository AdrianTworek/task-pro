import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';

import { getAppServerSession } from '@/utils/get-server-session';
import { RootProvider } from '@/providers/root-provider';
import { RoleEnum } from 'database';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskPRO Admin',
  description: 'TaskPRO Admin',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAppServerSession();

  if (session?.user && session.user.role !== RoleEnum.ADMIN) {
    redirect('http://localhost:3000');
  }

  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body className={inter.className}>
        <RootProvider session={session}>
          <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex container h-full py-12'>
              <Sidebar />
              {children}
            </main>
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
