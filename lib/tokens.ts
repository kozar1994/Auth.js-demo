import { getVertificationTokenByEmail } from "@/data/verficiation-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";

export const generateVertificationToken = async (email: string) => {
  const token = uuid();

  const expires = new Date(new Date().getTime() + 3600 * 1000); // one hour and expired

  const existingToken = await getVertificationTokenByEmail(email);

  if (existingToken) {
    await db.vertificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const vertificationToken = await db.vertificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return vertificationToken;
};
