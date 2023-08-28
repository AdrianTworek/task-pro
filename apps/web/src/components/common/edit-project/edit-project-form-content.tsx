'use client';
import { GetProjectResult } from '@/server/project/project.services';

import { Label, Input, Textarea, SubmitButton } from 'ui';
import FormErrors from '../form-errors';
import { CommonErrorResponse } from '@/server/types/errors';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function EditProjectFormContent({
  project,
  error,
  validationErrors,
}: {
  project: Exclude<GetProjectResult, CommonErrorResponse>;
  error: string | null;
  validationErrors: string[];
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <FormErrors
        pending={pending}
        error={error}
        validationErrors={validationErrors}
      />

      <div className="grid w-full items-center mb-6 gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          disabled={pending}
          id="name"
          name="name"
          placeholder="Name for this project"
          defaultValue={project?.name}
        />
      </div>
      <div className="grid w-full items-center mb-6 gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          disabled={pending}
          id="description"
          name="description"
          placeholder="Describe this project"
          defaultValue={project?.description}
        />
      </div>

      <SubmitButton disabled={pending}>Update Project</SubmitButton>
    </>
  );
}
