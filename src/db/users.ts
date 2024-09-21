import prisma from "@/libs/prisma";
import { User, Profile, Company } from "@prisma/client";

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: { profile: true },
    });

    return users;
  } catch (error) {
    throw error;
  }
};

const createUser = async (
  user: Omit<User, "idAuto" | "createdAt" | "updatedAt" | "companyId">,
  profile: Omit<Profile, "idAuto" | "createdAt" | "updatedAt" | "userId">,
  company: Omit<Company, "idAuto" | "createdAt" | "updatedAt"> | null,
  companyId?: number
) => {
  try {
    const isSubscriberUser = profile.role === "SUBSCRIBER" && company;

    const newUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        profile: {
          create: {
            id: profile.id,
            loginName: profile.loginName,
            password: profile.password,
            role: profile.role,
            enabled: profile.enabled,
          },
        },
        company: {
          create: isSubscriberUser
            ? {
                id: company?.id,
                name: company?.name,
                address: company?.address,
                phone: company?.phone,
                email: company?.email,
              }
            : undefined,
          connect:
            !isSubscriberUser && companyId ? { idAuto: companyId } : undefined,
        },
      },
      include: { profile: true, company: true },
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: { profile: true },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      include: { profile: true },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const users = {
  getUsers,
  createUser,
  getUserById,
  getUserByEmail,
};

export default users;
