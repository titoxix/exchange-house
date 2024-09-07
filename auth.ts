import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { getUser } from "@/server/users";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Emial", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        try {
          let user = null;
          let match = false;

          user = await getUser(email as string);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          if (user.profile) {
            match = await bcrypt.compare(
              password as string,
              user.profile.password
            );
          }

          if (!match) {
            throw new Error("Invalid credentials.");
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.profile?.role,
          };
        } catch (error: any) {
          console.error(error?.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});