import { NextRequest } from 'next/server';
import { ApiHandler } from '@/server/utils/api-handler';
import { registerHandler } from '@/server/auth/auth.controller';

export const POST = async (req: NextRequest) => {
  return ApiHandler(registerHandler, req);
};
