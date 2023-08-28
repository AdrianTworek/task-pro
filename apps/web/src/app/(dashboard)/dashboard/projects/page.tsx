import { Metadata } from 'next';

import { isCommonErrorResponse } from '@/server/types/errors';
import { fetchProjects } from '@/server/project/projects.fetchers';

import { AddProjectCard } from '@/components/common/add-project/add-project-card';
import { ProjectCard } from '@/components/common/project-card/project-card';

import { Separator } from 'ui';

export const metadata: Metadata = {
  title: 'TaskPRO | Dashboard',
};

export default async function DashboardPage() {
  const response = await fetchProjects();

  if (isCommonErrorResponse(response)) {
    console.error(response.error);
    throw new Error(response.error.message);
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold mb-6">Projects</h1>
      <Separator />
      <div className="mt-12 grid grid-cols-3 gap-8 xl:grid-cols-4">
        <AddProjectCard />
        {response.map((project) => (
          <ProjectCard
            createdAt={new Date(project.createdAt)}
            description={project.description}
            id={project.id}
            name={project.name}
            users={project.members}
            key={'project__' + project.id}
          />
        ))}
      </div>
    </div>
  );
}
