'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
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
      <NextTopLoader showSpinner={false} />
      <Toaster />
      {children}
    </SessionProvider>
  );
}
