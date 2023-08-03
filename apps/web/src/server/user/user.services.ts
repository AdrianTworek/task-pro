import { StatusCodes } from 'http-status-codes';
import { ServerError } from '@/server/utils/server-errors';
import { prisma } from 'database';

export type SearchUsersResult = Awaited<ReturnType<typeof searchUsers>>;

export const searchUsers = async (
  query: string,
  page: number,
  userId: string,
  limit: number = 5,
) => {
  try {
    const results = await prisma.user.findMany({
      where: {
        email: {
          contains: query,
          mode: 'insensitive',
        },
        AND: {
          NOT: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        email: true,
        image: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return results;
  } catch (e: any) {
    throw new ServerError({
      message: 'Failed to search users',
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      cause: e,
    });
  }
};
