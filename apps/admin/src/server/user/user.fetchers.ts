import { getUsers } from '@/server/user/user.services';
import { getAppServerSession } from '@/utils/get-server-session';
import { RoleEnum } from 'database';
import { StatusCodes } from 'http-status-codes';
import { ServerError } from 'server-utils';

export const fetchUsers = async () => {
  const session = await getAppServerSession();

  if (!session || session.user.role !== RoleEnum.ADMIN) {
    throw new ServerError({
      message: 'Unauthorized',
      code: StatusCodes.UNAUTHORIZED,
    });
  }

  const users = await getUsers();

  return { users };
};
