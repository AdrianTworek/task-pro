'use client';

import { signOut } from 'next-auth/react';

import { Button } from 'ui';

export default function DashboardPage() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}
