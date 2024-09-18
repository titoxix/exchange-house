import profileDB from "@/db/profile";

export const getProfileByLoginName = async (
  loginName: string,
  includeUserData: boolean
) => {
  try {
    const profile = await profileDB.getProfileByLoginName(
      loginName,
      includeUserData
    );

    return profile;
  } catch (error) {
    throw error;
  }
};
