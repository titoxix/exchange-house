import usersDB from "@/db/users";
import { v4 as uuidv4 } from "uuid";
import { Rol } from "@/interfaces/profile";

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

export const createUser = async (
  user: Omit<User, "id">,
  role: Rol,
  password: string
) => {
  try {
    const userId = uuidv4();
    const profileId = uuidv4();
    const profile = {
      id: profileId,
      password,
      role,
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
