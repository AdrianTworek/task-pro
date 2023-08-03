'use server';

import { ServerErrorResponse } from '@/server/types/errors';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const createProjectAction = async (
  form: FormData,
  users: string[],
): Promise<ServerErrorResponse> => {
  let project;
  try {
    const name = form.get('name');
    const description = form.get('description');

    const h = headers();
    const cookie = h.get('cookie');

    if (!cookie) {
      return {
        error: {
          message: 'Unexpected Server Error occurred',
          code: 500,
        },
      };
    }

    const body = {
      name,
      description,
      members: users,
    };

    const res = await fetch(`${process.env['NEXTAUTH_URL']}api/projects/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        cookie,
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        accept: 'application/json',
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return error;
    }

    project = await res.json();
  } catch (e) {
    console.error(e);
    return {
      error: {
        code: 500,
        message: 'Unexpected Server Error occurred',
      },
    };
  } finally {
    revalidatePath('/dashboard');
    redirect(`/project/${project.id}`);
  }
};
