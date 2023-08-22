import { RoleEnum, prisma } from 'database';
import { ServerError } from 'server-utils';

export type getUsersResult = Awaited<ReturnType<typeof getUsers>>;

export const getUsers = async (params?: { query?: string }) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: params?.query,
        },
        role: {
          not: RoleEnum.ADMIN,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
      },
    });

    return users;
  } catch (e: any) {
    throw new ServerError({
      message: 'Failed getting users from database',
      code: 500,
    });
  }
};
