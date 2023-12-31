import { StatusCodes } from 'http-status-codes';
import {
  CreateProjectBody,
  UpdateProjectBody,
} from '@/server/project/project.schema';
import { ServerError } from '@/server/utils/server-errors';
import { MemberEnum, prisma } from 'database';

export type GetProjectsResult = Awaited<ReturnType<typeof getProjects>>;

export const getProject = async (userId: string, projectId: string) => {
  return await prisma.project.findUnique({
    where: { id: projectId, members: { some: { userId } } },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      members: {
        select: {
          role: true,
          user: {
            select: {
              id: true,
              image: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      },
    },
  });
};

export type GetProjectResult = Awaited<ReturnType<typeof getProject>>;

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

export type UpdateProjectResult = Awaited<ReturnType<typeof updateProject>>;

export const updateProject = async (
  userId: string,
  project: UpdateProjectBody,
) => {
  const foundProject = await prisma.project.findUnique({
    where: { id: project.id },
    select: {
      members: true,
    },
  });

  if (!foundProject) {
    throw new ServerError({
      message: 'Project not found',
      code: StatusCodes.NOT_FOUND,
    });
  }

  const isProjectOwner = foundProject.members.find(
    (member) => member.userId === userId && member.role === 'OWNER',
  );

  if (!isProjectOwner) {
    throw new ServerError({
      message: 'You cannot perform this action',
      code: StatusCodes.FORBIDDEN,
    });
  }

  const result = await prisma.project.update({
    where: { id: project.id },
    data: {
      name: project.name,
      description: project.description,
    },
  });

  return result;
};
