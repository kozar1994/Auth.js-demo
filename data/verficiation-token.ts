import { db } from "@/lib/db";

export const getVertificationTokenByEmail = async (email: string) => {
  try {
    const getVertificationToken = await db.vertificationToken.findFirst({
      where: { email },
    });

    return getVertificationToken;
  } catch (error) {
    return null;
  }
};

export const getVertificationTokenByToken = async (token: string) => {
  try {
    const getVertificationToken = await db.vertificationToken.findUnique({
      where: { token },
    });

    return getVertificationToken;
  } catch (error) {
    return null;
  }
};
