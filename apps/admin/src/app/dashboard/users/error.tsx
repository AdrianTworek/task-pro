'use client';

import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from 'ui';

export default function UserErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='flex items-center flex-col gap-2'>
      <AlertTriangle className='w-20 h-20 ' />
      <h1 className='text-2xl font-semibold '>Something went wrong!</h1>
      <p className='mb-4'>{error.message}</p>
      <Button variant={'outline'} onClick={() => reset()}>
        Try Again
      </Button>
      <span>or</span>
      <Button>
        <Link href='/dashboard'>Go to dashboard</Link>
      </Button>
    </div>
  );
}
