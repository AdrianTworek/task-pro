import { AddProjectCard } from '@/components/common/add-project/add-project-card';
import { ProjectCard } from '@/components/common/project-card/project-card';
import { GetProjectsResponse } from '@/server/project/project.services';
import { headers } from 'next/headers';

export default async function DashboardPage() {
  const res = await fetch(`${process.env['NEXTAUTH_URL']}api/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: headers().get('cookie') ?? '',
    },
  });

  if (!res.ok) {
    const errorRes = await res.json();

    if (errorRes.error) {
      console.error(errorRes.error);
    }

    return <div>Something went wrong</div>;
  }

  const data = (await res.json()) as { projects: GetProjectsResponse };

  return (
    <main className='container py-12 flex flex-col'>
      <h1 className='text-4xl font-semibold mb-6'>Projects</h1>
      <div className='grid grid-cols-3 gap-8 xl:grid-cols-4'>
        <AddProjectCard />
        {data.projects.map((project) => (
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
