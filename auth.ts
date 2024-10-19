import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { getUserForLogin } from "@/server/users";
import bcrypt from "bcrypt";
import { Role } from "@/interfaces/profile";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        loginName: { label: "Nombre de Usuario", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ loginName, password }) => {
        try {
          let user = null;
          let match = false;

          user = await getUserForLogin(loginName as string);

          if (!user || !user.id) {
            throw new Error("Invalid credentials.");
          }

          if (!user.active) {
            throw new Error("User is not active.", {
              cause: { message: "User is not active" },
            });
          }

          if (user.password) {
            match = await bcrypt.compare(password as string, user.password);
          }

          if (!match) {
            throw new Error("Invalid credentials.");
          }
          return {
            id: user.id,
            name: `${user.name} ${user.lastName}`,
            loginName: user.loginName as string,
            role: user?.role as Role,
            companyId: user.companyId,
            companyName: user.companyName,
          };
        } catch (error: any) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.loginName = user.loginName;
        token.role = user.role;
        token.companyId = user.companyId;
        token.companyName = user.companyName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.loginName = token.loginName as string;
        session.user.companyId = token.companyId as string;
        session.user.companyName = token.companyName as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
});
