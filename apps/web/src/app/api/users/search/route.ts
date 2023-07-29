import { searchUserHandler } from '@/server/user/user.controller';
import { ApiHandler } from '@/server/utils/api-handler';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) =>
  ApiHandler(searchUserHandler, req);
