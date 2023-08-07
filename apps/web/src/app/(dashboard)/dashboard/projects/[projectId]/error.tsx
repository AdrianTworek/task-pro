'use client';

import Link from 'next/link';

import { Button } from 'ui';
import { AlertTriangleIcon } from 'lucide-react';

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container flex flex-col justify-center items-center gap-4 mt-24">
      <AlertTriangleIcon className="w-24 h-24" />
      <div className="text-center">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
      <Button variant="outline" onClick={reset}>
        Try again
      </Button>
      <span>or</span>
      <Link href="/dashboard/projects">
        <Button>Go back to dashboard</Button>
      </Link>
    </div>
  );
}
