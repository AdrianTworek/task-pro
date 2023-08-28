'use client';
import { updateProjectInformationAction } from '@/server/project/project.actions';
import {
  isCommonErrorResponse,
  isServerErrorResponse,
  isValidationErrorResponse,
} from '@/server/types/errors';
import React, { useRef, useState, useTransition } from 'react';
import { Button, Input, Label, SubmitButton, Textarea, toast } from 'ui';
import { cn } from 'ui/src/lib/utils';

type UpdateFormErrors = {
  name: string | null;
  description: string | null;
};

export default function UpdateProjectDetailsForm({
  projectId,
  description,
  name,
}: {
  projectId: string;
  description: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();
  const [formErrors, setFormErrors] = useState<UpdateFormErrors>({
    name: null,
    description: null,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      console.log('starting transition');
      const error = await updateProjectInformationAction(formData, projectId);
      setFormErrors({ description: null, name: null });
      if (isServerErrorResponse(error)) {
        if (isValidationErrorResponse(error)) {
          const newState = error.error.issues.reduce<UpdateFormErrors>(
            (acc, issue) => {
              if (issue.field in acc) {
                acc[issue.field as keyof UpdateFormErrors] = issue.message;
              }
              return acc;
            },
            { name: null, description: null },
          );
          setFormErrors(newState);
        }
        if (isCommonErrorResponse(error)) {
          toast({
            variant: 'destructive',
            title: 'We had a problem updating your project',
            description: error.error.message,
          });
        }
        resetFormValues();
        console.error(error);
        return;
      }

      toast({
        variant: 'default',
        title: 'Project updated',
        description:
          'Your project has been updated, changes will be visible to all members',
      });
    });
  };

  const resetFormValues = () => {
    formRef.current?.reset();
  };

  return (
    <form action={handleSubmit} className="flex flex-col" ref={formRef}>
      <Label
        htmlFor="name"
        className={cn('mb-4', formErrors.name && 'text-destructive')}
      >
        Project Name
      </Label>
      <Input
        className={cn(formErrors.name && 'mb-2')}
        defaultValue={name}
        disabled={pending}
        placeholder="Project Name"
        name="name"
      />
      {formErrors.name && (
        <p className="text-sm font-medium text-destructive">
          {formErrors.name}
        </p>
      )}
      <Label
        htmlFor="description"
        className={cn(
          'mb-4 mt-8',
          formErrors.description && 'text-destructive',
        )}
      >
        Project Description
      </Label>
      <Textarea
        defaultValue={description}
        disabled={pending}
        placeholder="Project Description"
        rows={4}
        className=""
        name="description"
      />
      {formErrors.description && (
        <p className="text-sm font-medium text-destructive">
          {formErrors.description}
        </p>
      )}
      <SubmitButton className="mt-8" disabled={pending}>
        Save
      </SubmitButton>
      <Button type="reset" variant="outline">
        Cancel
      </Button>
    </form>
  );
}
