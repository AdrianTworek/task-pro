'use client';

import { signIn } from 'next-auth/react';

import { Button } from 'ui';

export default function SocialProviders({ loading }: { loading?: boolean }) {
  return (
    <div className='flex flex-row gap-2 flex-wrap justify-center'>
      <Button disabled={loading} onClick={() => signIn('google')}>
        Google
      </Button>
      <Button disabled={loading} onClick={() => signIn('discord')}>
        Discord
      </Button>
    </div>
  );
}
