'use server';

import { RegisterWithCredentialsBody } from '@/server/auth/auth.schema';

type RegisterFormData = RegisterWithCredentialsBody;

export const registerAction = async (data: RegisterFormData) => {
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
