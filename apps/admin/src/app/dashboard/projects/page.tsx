import ProjectsTable from '@/app/dashboard/projects/projects-table';
import { fetchProjects } from '@/server/project/project.fetcher';
import React from 'react';

export default async function ProjectsPage() {
  const data = await fetchProjects();

  return <ProjectsTable data={data.projects} />;
}
