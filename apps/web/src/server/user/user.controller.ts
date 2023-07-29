import { searchUsers } from '@/server/user/user.services';
import { ServerError } from '@/server/utils/server-errors';
import { getAppServerSession } from '@/utils/get-server-session';
import { NextRequest, NextResponse } from 'next/server';

const SEARCH_USERS_LIMIT = 5;

export const searchUserHandler = async (req: NextRequest) => {
  const session = await getAppServerSession();

  if (!session) {
    throw new ServerError({
      message: 'You must be logged in to search users',
      code: 401,
    });
  }

  const url = new URL(req.url);

  const query = url.searchParams.get('q');
  const page = Number(url.searchParams.get('page')) || 1;

  if (!query || query.length < 1) {
    return NextResponse.json({
      users: [],
    });
  }

  const users = await searchUsers(
    query,
    page,
    session.user.id,
    SEARCH_USERS_LIMIT
  );

  const nextPage = users.length === SEARCH_USERS_LIMIT ? page + 1 : undefined;

  return NextResponse.json({
    users,
    nextPage,
  });
};
