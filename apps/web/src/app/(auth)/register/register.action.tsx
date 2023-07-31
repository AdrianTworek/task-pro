'use server';

import { RegisterWithCredentialsBody } from '@/server/auth/auth.schema';

type FormData = RegisterWithCredentialsBody;

export const registerAction = async (data: FormData) => {
  const res = await fetch(`${process.env['NEXTAUTH_URL']}api/auth/register`, {
    method: 'POST',
    headers: {
      'cache-control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    return error;
  }
};
