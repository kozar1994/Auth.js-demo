"use server";

import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVertificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

type RegisterType = z.infer<typeof RegisterSchema>;

export const register = async (value: RegisterType) => {
  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, name, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email alrady in use",
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verficiationToken = await generateVertificationToken(email);
  //TODO: send email

  await sendVerificationEmail(verficiationToken.email, verficiationToken.token);

  return {
    success: "User created!",
  };
};
