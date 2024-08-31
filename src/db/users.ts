import prisma from "@/libs/prisma";
import { Users, Profile } from "@prisma/client";

const createUser = async (
  user: Omit<Users, "idAuto" | "createdAt" | "updatedAt">,
  profile: Omit<Profile, "idAuto" | "createdAt" | "updatedAt" | "userId">
) => {
  try {
    const newUser = await prisma.users.create({
      data: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        profile: {
          create: {
            id: profile.id,
            password: profile.password,
            role: profile.role,
            enabled: profile.enabled,
          },
        },
      },
      include: { profile: true },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

const users = {
  createUser,
};

export default users;
