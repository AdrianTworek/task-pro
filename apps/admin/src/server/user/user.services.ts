import { prisma } from 'database';
import { ServerError } from 'server-utils';

export type getUsersResult = Awaited<ReturnType<typeof getUsers>>;

export const getUsers = async (params?: { query?: string }) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: params?.query,
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
    throw new ServerError({ message: "Could't get users", code: 500 });
  }
};
