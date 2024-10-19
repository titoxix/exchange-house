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

export const getInactiveProfileByToken = async (token: string) => {
  try {
    const profile = await profileDB.getInactiveProfileByToken(token);

    return profile;
  } catch (error) {
    throw error;
  }
};

export const activateProfile = async (profileId: number) => {
  try {
    await profileDB.activateProfile(profileId);
  } catch (error) {
    throw error;
  }
};
