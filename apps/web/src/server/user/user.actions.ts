'use server';
import { ServerErrorResponse } from '@/server/types/errors';
import { searchUserSchema } from '@/server/user/user.schema';
import { searchUsers } from '@/server/user/user.services';
import { errorHandler } from '@/server/utils/server-errors';
import { getAppServerSession } from '@/utils/get-server-session';
import { StatusCodes } from 'http-status-codes';

const SEARCH_USERS_LIMIT = 5;

export const searchUserAction = async (input: {
  query: string;
  page: number;
}) => {
  const session = await getAppServerSession();

  if (!session) {
    const error: ServerErrorResponse = {
      error: {
        message: 'You must be logged in to search users',
        code: StatusCodes.UNAUTHORIZED,
      },
    };
    return error;
  }

  try {
    const { page, query } = searchUserSchema.parse(input);

    if (query.length < 1) {
      return {
        users: [],
        nextPage: undefined,
      };
    }

    const users = await searchUsers(
      query,
      page,
      session.user.id,
      SEARCH_USERS_LIMIT
    );

    const nextPage = users.length === SEARCH_USERS_LIMIT ? page + 1 : undefined;

    return {
      users,
      nextPage,
    };
  } catch (e) {
    return errorHandler(e);
  }
};
