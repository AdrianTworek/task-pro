import { AddProjectCard } from '@/components/common/add-project/add-project-card';
import { ProjectCard } from '@/components/common/project-card/project-card';
import { fetchProjects } from '@/server/project/projects.fetchers';
import { isCommonErrorResponse } from '@/server/types/errors';

export default async function DashboardPage() {
  const response = await fetchProjects();

  if (isCommonErrorResponse(response)) {
    console.error(response.error);
    return <div>Something went wrong</div>;
  }

  return (
    <main className="container py-12 flex flex-col">
      <h1 className="text-4xl font-semibold mb-6">Projects</h1>
      <div className="grid grid-cols-3 gap-8 xl:grid-cols-4">
        <AddProjectCard />
        {response.projects.map((project) => (
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
    </main>
  );
}
