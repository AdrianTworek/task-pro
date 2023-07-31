import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { prisma } from 'database';
import { ServerError } from '@/server/utils/server-errors';
import { registerUserWithCredentials } from './auth.services';
import { registerWithCredentialsSchema } from './auth.schema';

export const registerHandler = async (req: NextRequest) => {
  const json = await req.json();
  const { email, password } = registerWithCredentialsSchema.parse(json);

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    throw new ServerError({
      message: 'User already exists',
      code: StatusCodes.CONFLICT,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await registerUserWithCredentials(email, hashedPassword);
    return NextResponse.json(newUser);
  } catch (error: any) {
    throw new ServerError({
      message: 'Could not create a user',
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      cause: error,
    });
  }
};
