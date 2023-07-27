'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from 'ui';

export default function AdminLogin() {
  const { data: session } = useSession();

  return session ? (
    <Button onClick={() => signOut()}>Logout</Button>
  ) : (
    <Button onClick={() => signIn()}>Login</Button>
  );
}
