import { ProjectCard } from '@/components/common/project-card';
import { PlusIcon } from 'lucide-react';
import { Card, CardContent } from 'ui';

export default async function DashboardPage() {
  const projects: Array<{
    id: string;
    name: string;
    description: string;
    createdAt: string;
    users: Array<{ id: string; image: string }>;
  }> = [
    {
      id: '1',
      name: 'BuildEasy',
      description:
        'Sooo guys wyyy nyydaa, actually yes so imagine a scenario when GC',
      createdAt: '2023-07-26T20:05:44.073Z',
      users: [
        {
          id: '1',
          image: 'https://avatars.githubusercontent.com/u/15075759?v=4',
        },
        {
          id: '2',
          image: 'https://avatars.githubusercontent.com/u/15075324?v=4',
        },
      ],
    },
    {
      id: '2',
      name: 'BuildEasy',
      description:
        'Sooo guys wyyy nyydaa, actually yes so imagine a scenario when GC',
      createdAt: '2023-07-26T20:05:44.073Z',
      users: [
        {
          id: '3',
          image: 'https://avatars.githubusercontent.com/u/15075759?v=4',
        },
        {
          id: '4',
          image: 'https://avatars.githubusercontent.com/u/15075324?v=4',
        },
      ],
    },
    {
      id: '3',
      name: 'BuildEasy',
      description:
        'Sooo guys wyyy nyydaa, actually yes so imagine a scenario when GC',
      createdAt: '2023-07-26T20:05:44.073Z',
      users: [
        {
          id: '5',
          image: 'https://avatars.githubusercontent.com/u/15075759?v=4',
        },
        {
          id: '6',
          image: 'https://avatars.githubusercontent.com/u/15075324?v=4',
        },
      ],
    },
  ];

  return (
    <main className='container pt-12 flex flex-col'>
      <h1 className='text-4xl font-semibold mb-6'>Projects</h1>
      <div className='grid grid-cols-3 gap-8 xl:grid-cols-4'>
        <Card className='flex flex-col items-center justify-center text-center'>
          <CardContent className='flex flex-col items-center'>
            <PlusIcon className='w-10 h-10' />
            <h4>Add a new project</h4>
            <p className='text-sm text-muted-foreground'>
              Create a new project and invite your team members
            </p>
          </CardContent>
        </Card>
        {projects.map((project) => (
          <ProjectCard {...project} key={'project__' + project.id} />
        ))}
      </div>
    </main>
  );
}
