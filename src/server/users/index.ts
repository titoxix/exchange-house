import usersDB from "@/db/users";
import { v4 as uuidv4 } from "uuid";
import { Role } from "@/interfaces/profile";
import { User } from "@/interfaces/user";
import { getProfileByLoginName } from "@/server/profile";

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
    const profile = await getProfileByLoginName(loginName, true);

    return {
      id: profile?.user.id,
      name: profile?.user.name,
      lastName: profile?.user.lastName,
      loginName: profile?.loginName,
      password: profile?.password,
      role: profile?.role,
    };
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  user: Omit<User, "id" | "role" | "loginName">,
  loginName: string,
  role: Role,
  password: string
) => {
  try {
    const userId = uuidv4();
    const profileId = uuidv4();
    const profile = {
      id: profileId,
      password,
      role,
      loginName,
      enabled: true,
    };

    const newUser = await usersDB.createUser(
      {
        id: userId,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      profile
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};
