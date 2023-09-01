import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { randomBytes, randomUUID } from 'crypto';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  debug: true,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: Record<string, string> | undefined) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.username,
          },
        });
        if (!user) {
          return null;
        }
        const hash = randomBytes(32).toString('hex');
        await prisma.session.create({
          data: {
            userId: user.id,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            sessionToken: randomUUID(),
          },
        });
        return {
          name: user.name,
          email: user.email,
          image: user.image,
          id: user.id,
          accessToken: hash,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      return { ...token, username: user?.username, id: user?.id };
    },
    async session({ session, token }) {
      return {
        ...session,
        user: { ...session.user, username: token?.username, id: token?.id },
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
