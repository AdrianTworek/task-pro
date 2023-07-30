import { prisma } from 'database';

export const registerUserWithCredentials = async (
  email: string,
  password: string
) => {
  return await prisma.user.create({
    data: {
      email,
      password,
    },
  });
};
