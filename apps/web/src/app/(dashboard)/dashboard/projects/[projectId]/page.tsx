import { fetchProject } from '@/server/project/projects.fetchers';
import { isCommonErrorResponse } from '@/server/types/errors';

import { Button, Separator } from 'ui';

import AboutProject from './components/about-project';
import Members from './components/members';
import ProjectsStats from './components/projects-stats';
import { Settings } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: {
    projectId: string;
  };
}

export async function generateMetadata({ params }: Props) {
  try {
    const response = await fetchProject(params.projectId);

    if (!isCommonErrorResponse(response)) {
      return {
        title: `TaskPRO | ${response && response.name}`,
      };
    }
  } catch (error) {
    return {
      title: 'TaskPRO | Project not found',
    };
  }
}

export default async function ProjectPage({ params }: Props) {
  const response = await fetchProject(params.projectId);

  if (isCommonErrorResponse(response)) {
    console.error(response.error);
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">{response.name}</h1>
        <Link href={`/dashboard/projects/${params.projectId}/settings`}>
          <Button className="px-2" variant="ghost">
            <Settings className="" />
          </Button>
        </Link>
      </div>
      <Separator />
      <div className="mt-12 grid xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <AboutProject project={response} />
        </div>
        <div className="flex flex-col gap-4">
          <ProjectsStats />
          <Members project={response} />
        </div>
      </div>
    </div>
  );
}
