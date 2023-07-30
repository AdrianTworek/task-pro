'use client';

import { signIn } from 'next-auth/react';

import { Button } from 'ui';

export default function SocialProviders() {
  return (
    <div className="flex flex-row gap-2 flex-wrap justify-center">
      <Button onClick={() => signIn('google')}>Google</Button>
      <Button onClick={() => signIn('discord')}>Discord</Button>
    </div>
  );
}
