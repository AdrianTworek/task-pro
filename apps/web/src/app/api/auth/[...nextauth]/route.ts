import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'database';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';

const registerWithCredentialsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const OPTIONS: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env['GOOGLE_CLIENT_ID']!,
      clientSecret: process.env['GOOGLE_CLIENT_SECRET']!,
    }),
    DiscordProvider({
      clientId: process.env['DISCORD_CLIENT_ID']!,
      clientSecret: process.env['DISCORD_CLIENT_SECRET']!,
    }),
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
          registerWithCredentialsSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        // Register
        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 12);

          const newUser = await prisma.user.create({
            data: {
              email: email,
              password: hashedPassword,
            },
          });

          return newUser;
        }

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
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env['NEXTAUTH_SECRET'],
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
