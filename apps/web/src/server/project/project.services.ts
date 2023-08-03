import { StatusCodes } from 'http-status-codes';
import { CreateProjectBody } from '@/server/project/project.schema';
import { ServerError } from '@/server/utils/server-errors';
import { MemberEnum, prisma } from 'database';

export type GetProjectsResult = Awaited<ReturnType<typeof getProjects>>;

export const getProjects = async (userId: string) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return projects.map((project) => ({
      ...project,
      members: project.members.map((member) => member.user),
    }));
  } catch (e: any) {
    throw new ServerError({
      message: 'Failed to get projects',
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      cause: e,
    });
  }
};

export type CreateProjectResult = Awaited<ReturnType<typeof createProject>>;

export const createProject = async (
  userId: string,
  project: CreateProjectBody,
) => {
  try {
    const members =
      project.members?.map((member) => {
        return { role: MemberEnum.USER, userId: member };
      }) ?? [];

    const result = await prisma.project.create({
      data: {
        name: project.name,
        description: project.description,
        members: {
          create: [{ role: MemberEnum.OWNER, userId }, ...members],
        },
      },
    });

    return result;
  } catch (e: any) {
    throw new ServerError({
      message: 'Failed to create project',
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      cause: e,
    });
  }
};
