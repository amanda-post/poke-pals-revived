import { randomUUID, randomBytes } from "crypto";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const handler = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: { label: "Password", type: "password" },
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
        const hash = randomBytes(32).toString("hex");
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
});

export { handler as GET, handler as POST };
