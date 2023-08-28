'use server';

import {
  createProjectSchema,
  updateProjectInformationSchema,
} from '@/server/project/project.schema';
import {
  CreateProjectResult,
  UpdateProjectResult,
  createProject,
  updateProject,
} from '@/server/project/project.services';
import { CommonErrorResponse } from '@/server/types/errors';
import { errorHandler } from '@/server/utils/server-errors';
import { getAppServerSession } from '@/utils/get-server-session';
import { StatusCodes } from 'http-status-codes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createProjectAction = async (
  formData: FormData,
  members: string[],
) => {
  const session = await getAppServerSession();

  if (!session) {
    const error: CommonErrorResponse = {
      error: {
        message: 'You must be logged in to create a project',
        code: StatusCodes.UNAUTHORIZED,
      },
    };

    return error;
  }

  let project: CreateProjectResult;

  try {
    const requestData = {
      name: formData.get('name'),
      description: formData.get('description'),
      members,
    };

    const body = createProjectSchema.parse(requestData);

    project = await createProject(session.user.id, body);
  } catch (e) {
    return errorHandler(e);
  }

  if (project) {
    revalidatePath(`/dashboard/projects`);
    redirect(`/dashboard/projects/${project.id}`);
  }
};

export const updateProjectInformationAction = async (
  formData: FormData,
  projectId: string,
) => {
  const session = await getAppServerSession();

  if (!session) {
    const error: CommonErrorResponse = {
      error: {
        message: 'You must be logged in to update a project',
        code: StatusCodes.UNAUTHORIZED,
      },
    };

    return error;
  }

  let project: UpdateProjectResult;

  try {
    const requestData = {
      id: projectId,
      name: formData.get('name'),
      description: formData.get('description'),
    };

    const body = updateProjectInformationSchema.parse(requestData);

    project = await updateProject(session.user.id, body);
  } catch (e) {
    return errorHandler(e);
  }

  if (project) {
    revalidatePath(`/dashboard/projects`);
  }
};
