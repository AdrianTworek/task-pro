import { prisma } from 'database';
import { ServerError } from 'server-utils';

export type GetProjectsResult = Awaited<ReturnType<typeof getProjects>>;

export const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        members: {
          select: {
            user: {
              select: {
                id: true,
                image: true,
              },
            },
          },
        },
      },
    });
    return projects;
  } catch (e: any) {
    throw new ServerError({
      message: 'Failed to fetch projects',
      code: 500,
      cause: e,
    });
  }
};
