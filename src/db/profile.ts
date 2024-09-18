import prisma from "@/libs/prisma";

const getProfileByLoginName = async (
  loginName: string,
  includeUserData: boolean = false
) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        loginName: loginName,
      },
      include: { user: includeUserData },
    });

    return profile;
  } catch (error) {
    throw error;
  }
};

const profile = {
  getProfileByLoginName,
};

export default profile;
