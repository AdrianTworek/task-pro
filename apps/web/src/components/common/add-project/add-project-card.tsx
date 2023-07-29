'use client';
import { createProjectAction } from '@/components/common/add-project/add-project.actions';
import { AddProjectFormContent } from '@/components/common/add-project/add-project-form-content';
import { isValidationErrorResponse } from '@/server/types/errors';
import { SearchUsersResponse } from '@/server/user/user.services';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'ui';

export function AddProjectCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SearchUsersResponse>([]);
  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setValidationErrors([]);
    const errorResponse = await createProjectAction(
      formData,
      selectedUsers.map((user) => user.id)
    );

    if (errorResponse) {
      if (isValidationErrorResponse(errorResponse)) {
        setValidationErrors(
          errorResponse.error.issues.map((issue) => issue.message)
        );
        return;
      }
      setError(errorResponse.error.message);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(val) => {
        setDialogOpen(val);
        setError(null);
        setValidationErrors([]);
      }}
    >
      <DialogTrigger asChild>
        <Card className='flex flex-col items-center justify-center text-center cursor-pointer min-h-[220px] h-full hover:shadow hover:shadow-background hover:scale-[102%] transition-all ease-out hover:border-foreground'>
          <CardContent className='flex flex-col items-center'>
            <PlusIcon className='w-10 h-10' />
            <h4>Add a new project</h4>
            <p className='text-sm text-muted-foreground'>
              Create a new project and invite your team members
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>

      {dialogOpen && (
        <DialogContent showCloseButton={false}>
          <DialogHeader className='mb-4'>
            <DialogTitle>Add a new project</DialogTitle>
          </DialogHeader>
          <form className='flex flex-col w-full' action={handleSubmit}>
            <AddProjectFormContent
              error={error}
              validationErrors={validationErrors}
              closeDialog={() => setDialogOpen(false)}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
