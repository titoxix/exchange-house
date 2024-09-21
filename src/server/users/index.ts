import usersDB from "@/db/users";
import { v4 as uuidv4 } from "uuid";
import { Role } from "@/interfaces/profile";
import { User } from "@/interfaces/user";
import { getProfileByLoginName } from "@/server/profile";
import { getCompanyById, getCompanyByIdAuto } from "@/server/company";

interface Response {
  error?: string;
  message?: string;
  status: number;
}
interface getUsersResponse extends Response {
  data: User[] | [];
}

export const getUsers = async (): Promise<getUsersResponse> => {
  try {
    const users = await usersDB.getUsers();

    if (!users) {
      return { message: "No se encontrarón resultados", status: 404, data: [] };
    }

    const adaptedUsers: User[] = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        loginName: user.profile?.loginName as string,
        role: user.profile?.role as Role,
      };
    });

    return { message: "OK", status: 200, data: adaptedUsers };
  } catch (error) {
    console.error(error);
    return { error: "Error to get data from DB", status: 500, data: [] };
  }
};

export const getUserForLogin = async (loginName: string) => {
  try {
    const profileWithUser = await getProfileByLoginName(loginName, true);

    if (!profileWithUser) {
      return null;
    }

    const company = await getCompanyByIdAuto(profileWithUser?.user.companyId);

    if (!company) {
      return null;
    }

    return {
      id: profileWithUser?.user.id,
      name: profileWithUser?.user.name,
      lastName: profileWithUser?.user.lastName,
      loginName: profileWithUser?.loginName,
      password: profileWithUser?.password,
      role: profileWithUser?.role,
      companyId: company.id,
      companyName: company.name,
    };
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  user: Omit<User, "id" | "role" | "loginName">,
  loginName: string,
  role: Role,
  password: string,
  companyId: string
) => {
  try {
    let company = await getCompanyById(companyId);

    const profile = {
      id: uuidv4(),
      password,
      role,
      loginName,
      enabled: true,
    };

    const newUser = await usersDB.createUser(
      {
        id: uuidv4(),
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      profile,
      null,
      company?.idAuto
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const createUserSubscriber = async (
  user: Omit<User, "id" | "role" | "loginName">,
  loginName: string,
  role: Role,
  password: string,
  company: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  }
) => {
  try {
    const newCompany = {
      id: uuidv4(),
      name: company.name,
      address: company?.address || null,
      phone: company?.phone || null,
      email: company?.email || null,
    };
    const profile = {
      id: uuidv4(),
      password,
      role,
      loginName,
      enabled: true,
    };

    const newUser = await usersDB.createUser(
      {
        id: uuidv4(),
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      profile,
      newCompany
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};
