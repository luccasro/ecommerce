import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils";
import axios from "axios";

interface User {
  id: string;
  name: string | null;
  email: string;
  bagId: string;
  wishlistId: string;
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
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/auth`,
            {
              ...credentials,
            }
          );

          if (!res.data) {
            console.log(res);
            throw new Error("Failed to authenticate");
          }

          const user: User = await res.data;

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
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  callbacks: {
    async session(props) {
      const { session, user, token } = props;
      session.user = {
        ...session.user,
        id: token.id,
        bagId: token.bagId,
        wishlistId: token.wishlistId,
      } as User;

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
