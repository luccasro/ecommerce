import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

interface User {
  id: string;
  name: string | null;
  email: string;
  bag: any;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/auth`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            throw new Error("Failed to authenticate");
          }

          const user: User = await res.json();

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Failed to login:", error);
          throw new Error("Failed to login");
        }
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    // encryption: true,
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  callbacks: {
    async session(props) {
      const { session, user, token } = props;
      if (token.bag) {
        session.user = {
          ...session.user,
          id: token.id,
          bag: token.bag,
        } as User;
      }

      // console.log("user", session.user);
      return session;
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

export default authHandler;
