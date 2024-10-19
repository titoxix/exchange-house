import ActiveTokenDB from "@/db/activeToken";

export const createToken = async (profileId: number) => {
  try {
    const token = await ActiveTokenDB.createToken(profileId);
    return token;
  } catch (error) {
    throw error;
  }
};

export const updateToken = async (token: string) => {
  try {
    await ActiveTokenDB.updateToken(token);
  } catch (error) {
    throw error;
  }
};
