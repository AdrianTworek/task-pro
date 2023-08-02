'use server';

import {
  RegisterWithCredentialsBody,
  registerWithCredentialsSchema,
} from '@/server/auth/auth.schema';
import { registerUserWithCredentials } from '@/server/auth/auth.services';
import { prisma } from 'database';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { CommonErrorResponse } from '@/server/types/errors';

type RegisterFormData = RegisterWithCredentialsBody;

export const registerAction = async (data: RegisterFormData) => {
  const { email, password } = registerWithCredentialsSchema.parse(data);

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return {
      error: {
        message: 'User already exists',
        code: StatusCodes.CONFLICT,
      },
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await registerUserWithCredentials(email, hashedPassword);
    return newUser;
  } catch (error: any) {
    return {
      error: {
        message: 'Could not create a user',
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        cause: error,
      },
    } as CommonErrorResponse;
  }
};
