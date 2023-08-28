'use client';

import { useState } from 'react';

import { updateProjectInformationAction } from '@/server/project/project.actions';
import { GetProjectResult } from '@/server/project/project.services';
import {
  CommonErrorResponse,
  isCommonErrorResponse,
  isValidationErrorResponse,
} from '@/server/types/errors';

import EditProjectFormContent from './edit-project-form-content';
import { useToast } from 'ui';

export default function EditProjectForm({
  project,
}: {
  project: Exclude<GetProjectResult, CommonErrorResponse>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const { toast } = useToast();

  if (!project) return null;

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setValidationErrors([]);

    const errorResponse = await updateProjectInformationAction(
      formData,
      project?.id,
    );

    if (errorResponse) {
      if (isValidationErrorResponse(errorResponse)) {
        setValidationErrors(
          errorResponse.error.issues.map((issue) => issue.message),
        );
        return;
      }
      if (isCommonErrorResponse(errorResponse)) {
        setError(errorResponse.error.message);
        return;
      }
    }

    toast({
      title: 'Successfully updated your project!',
    });
  };

  return (
    <>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-6">
        Edit your project
      </h4>

      <form action={handleSubmit} className="flex flex-col gap-2">
        <EditProjectFormContent
          project={project}
          error={error}
          validationErrors={validationErrors}
        />
      </form>
    </>
  );
}
