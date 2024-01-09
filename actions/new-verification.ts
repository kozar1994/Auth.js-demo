"use server";

import { getUserByEmail } from "@/data/user";
import { getVertificationTokenByToken } from "@/data/verficiation-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await getVertificationTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Email does not exsist!",
    };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.vertificationToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: "Email vertificated",
  };
};
