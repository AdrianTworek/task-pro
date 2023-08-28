import ProjectDetailsFormContent from '@/app/(dashboard)/dashboard/projects/[projectId]/settings/components/project-details-form-content';
import UpdateProjectDetailsForm from '@/app/(dashboard)/dashboard/projects/[projectId]/settings/components/update-project-details-form';
import { updateProjectInformationAction } from '@/server/project/project.actions';
import { fetchProject } from '@/server/project/projects.fetchers';
import { isCommonErrorResponse } from '@/server/types/errors';
import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button, Separator } from 'ui';

type Props = {
  params: {
    projectId: string;
  };
};

export default async function ProjectSettingsPage({ params }: Props) {
  const response = await fetchProject(params.projectId);

  if (isCommonErrorResponse(response)) {
    throw new Error(response.error.message);
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">Settings</h1>
        <Link href={`/dashboard/projects/${params.projectId}`}>
          <Button className="px-2" variant="ghost">
            <X />
          </Button>
        </Link>
      </div>
      <Separator className="mb-6" />
      <div className=" max-w-lg flex flex-col">
        <h2 className="text-2xl font-semibold leading-none tracking-tight mb-8">
          Project Details
        </h2>
        <UpdateProjectDetailsForm
          description={response.description}
          name={response.name}
          projectId={params.projectId}
        />
      </div>
    </div>
  );
}
