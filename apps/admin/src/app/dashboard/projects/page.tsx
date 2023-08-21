import ProjectsTable from '@/app/dashboard/projects/projects-table';
import { fetchProjects } from '@/server/project/project.fetcher';
import React from 'react';

export default async function ProjectsPage() {
  const data = await fetchProjects();

  return (
    <>
      <h1 className='text-4xl font-semibold mb-6'>Projects</h1>
      <ProjectsTable data={data.projects} />
    </>
  );
}
