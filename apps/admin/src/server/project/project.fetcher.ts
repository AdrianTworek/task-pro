import { getProjects } from '@/server/project/project.services';
import { getAppServerSession } from '@/utils/get-server-session';
import { RoleEnum } from 'database';
import { StatusCodes } from 'http-status-codes';
import { CommonErrorResponse, ServerError } from 'server-utils';

export const fetchProjects = async () => {
  const session = await getAppServerSession();

  if (!session || session.user.role !== RoleEnum.ADMIN) {
    throw new ServerError({
      message: 'Unauthorized',
      code: StatusCodes.UNAUTHORIZED,
    });
  }

  const projects = await getProjects();

  return { projects };
};
