'use client';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { Button, Input, Label, Textarea } from 'ui';
import { cn } from 'ui/src/lib/utils';

export function AddProjectFormContent({
  error,
  validationErrors,
  closeDialog,
}: {
  error: string | null;
  validationErrors: string[];
  closeDialog: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      {!!error && !pending && (
        <div className='bg-destructive p-4 mb-4 rounded-md flex flex-col gap-2 text-sm text-destructive-foreground'>
          <p>{error}</p>
        </div>
      )}
      {!!validationErrors.length && !pending && (
        <div className='bg-destructive p-4 mb-4 rounded-md flex flex-col gap-2 text-sm text-destructive-foreground'>
          {validationErrors.map((error, idx) => (
            <p key={'error__' + idx + '__' + error}>{error}</p>
          ))}
        </div>
      )}
      <div className='grid w-full items-center mb-6 gap-1.5'>
        <Label htmlFor='name'>Name</Label>
        <Input
          disabled={pending}
          name='name'
          placeholder='Name for this project'
        />
      </div>
      <div className='grid w-full items-center mb-6 gap-1.5'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          disabled={pending}
          name='description'
          placeholder='Describe this project'
        />
      </div>
      <Button type='submit' disabled={pending} className='relative mb-6'>
        <span
          className={cn(
            'absolute top-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-200',
            pending && 'opacity-0'
          )}
        >
          Create Project
        </span>
        <span
          className={cn(
            'absolute top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 ',
            pending && 'opacity-100'
          )}
        >
          <Loader2 className='w-5 h-5 text-background animate-spin' />
        </span>
      </Button>
      <Button
        disabled={pending}
        onClick={closeDialog}
        type='button'
        variant='secondary'
      >
        Cancel
      </Button>
    </>
  );
}
