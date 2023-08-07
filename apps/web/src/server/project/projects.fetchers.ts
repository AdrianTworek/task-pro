import { getAppServerSession } from '@/utils/get-server-session';
import { getProject, getProjects } from '@/server/project/project.services';
import { ServerError, errorHandler } from '@/server/utils/server-errors';
import { ServerErrorResponse } from '@/server/types/errors';
import { StatusCodes } from 'http-status-codes';

export const fetchProjects = async () => {
  const session = await getAppServerSession();

  if (!session) {
    const error: ServerErrorResponse = {
      error: {
        message: 'You must be logged in to view projects',
        code: StatusCodes.UNAUTHORIZED,
      },
    };

    return error;
  }
  try {
    const projects = await getProjects(session.user.id);

    return {
      projects,
    };
  } catch (e) {
    return errorHandler(e);
  }
};

export const fetchProject = async (projectId: string) => {
  const session = await getAppServerSession();

  if (!session) {
    const error: ServerErrorResponse = {
      error: {
        message: 'You must be logged in to view projects',
        code: StatusCodes.UNAUTHORIZED,
      },
    };

    return error;
  }

  const project = await getProject(session.user.id, projectId);

  if (!project) {
    throw new ServerError({
      message: 'You cannot access this resource',
      code: StatusCodes.FORBIDDEN,
    });
  }

  return project;
};
