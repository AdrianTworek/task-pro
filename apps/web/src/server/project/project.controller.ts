import { createProjectSchema } from '@/server/project/project.schema';
import { createProject } from '@/server/project/project.services';
import { ServerError } from '@/server/utils/server-errors';
import { getAppServerSession } from '@/utils/get-server-session';
import { NextRequest, NextResponse } from 'next/server';

export const getProjectsHandler = async (req: NextRequest) => {
  return NextResponse.json({
    projects: [],
  });
};

export const createProjectHandler = async (req: NextRequest) => {
  const session = await getAppServerSession();

  if (!session) {
    throw new ServerError({
      message: 'You must be logged in to create a project',
      code: 401,
    });
  }
  const json = await req.json();
  const body = createProjectSchema.parse(json);

  const project = await createProject(session.user.id, body);

  return NextResponse.json({ ...project });
};
