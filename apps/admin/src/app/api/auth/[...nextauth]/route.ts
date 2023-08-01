import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { RoleEnum, prisma } from 'database';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import CredentialsProvider from 'next-auth/providers/credentials';

const loginWithCredentialsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const OPTIONS: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'email address',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { email, password } =
          loginWithCredentialsSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: { email: email, role: RoleEnum.ADMIN },
        });

        if (!user) return null;

        // Login
        const isPasswordValid = await bcrypt.compare(
          password,
          user.password ?? ''
        );

        if (!isPasswordValid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  secret: process.env['NEXTAUTH_SECRET'],
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
