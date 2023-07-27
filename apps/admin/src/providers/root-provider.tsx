'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export function RootProvider({
  children,
  session,
}: {
  session: Session | null;
  children: React.ReactNode;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
