import type {NextAuthOptions} from 'next-auth'
import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import DiscordProvider from "next-auth/providers/discord"
import { prisma } from "database"

export const OPTIONS: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env["DISCORD_CLIENT_ID"]!,
      clientSecret: process.env['DISCORD_CLIENT_SECRET']!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env['NEXTAUTH_SECRET']
}

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };