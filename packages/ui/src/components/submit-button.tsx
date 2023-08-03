import { Loader2 } from 'lucide-react';
import React from 'react';

import { cn } from '../lib/utils';
import { Button } from './ui/button';

export function SubmitButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="relative mb-6"
      onClick={onClick}
    >
      <span
        className={cn(
          'absolute top-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-200',
          disabled && 'opacity-0',
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'absolute top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 ',
          disabled && 'opacity-100',
        )}
      >
        <Loader2 className="w-5 h-5 text-background animate-spin" />
      </span>
    </Button>
  );
}
