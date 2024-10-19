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

const getInactiveProfileByToken = async (token: string) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        activeTokens: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                },
              },
              {
                token,
              },
            ],
          },
        },
      },
    });

    return profile;
  } catch (error) {
    throw error;
  }
};

const activateProfile = async (profileId: number) => {
  try {
    await prisma.profile.update({
      where: {
        idAuto: profileId,
      },
      data: {
        active: true,
      },
    });
  } catch (error) {
    throw error;
  }
};

const profile = {
  getProfileByLoginName,
  getInactiveProfileByToken,
  activateProfile,
};

export default profile;
