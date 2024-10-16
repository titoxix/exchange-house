import prisma from "@/libs/prisma";
import { ActiveToken } from "@prisma/client";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

const createToken = async (profileId: number) => {
  try {
    const token = await prisma.activeToken.create({
      data: {
        id: uuidv4(),
        profileId: profileId,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
      },
    });
    return token;
  } catch (error) {
    throw error;
  }
};

const activeToken = {
  createToken,
};

export default activeToken;
