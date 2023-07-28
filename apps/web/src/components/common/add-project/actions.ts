'use server';

import { ServerErrorResponse } from '@/server/types/errors';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const createProjectAction = async (
  form: FormData
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
    console.log(e);
    return {
      error: {
        code: 500,
        message: 'Unexpected Server Error occurred',
      },
    };
  }

  redirect(`/project/${project.id}`);
};
