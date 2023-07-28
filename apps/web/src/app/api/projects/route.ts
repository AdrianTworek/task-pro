import {
  createProjectHandler,
  getProjectsHandler,
} from '@/server/project/project.controller';
import { ApiHandler } from '@/server/utils/api-handler';

import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) =>
  ApiHandler(getProjectsHandler, req);

export const POST = async (req: NextRequest) => {
  return ApiHandler(createProjectHandler, req);
};
