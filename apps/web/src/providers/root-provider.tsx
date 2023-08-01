'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './theme-provider';
import NextTopLoader from 'nextjs-toploader';

import { Toaster } from 'ui';

export function RootProvider({
  children,
  session,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextTopLoader showSpinner={false} />
        <Toaster />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
