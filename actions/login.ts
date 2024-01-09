"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVertificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

type LoginType = z.infer<typeof LoginSchema>;

export const login = async (value: LoginType) => {
  const validatedFields = LoginSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verficiationToken = await generateVertificationToken(email);

    await sendVerificationEmail(
      verficiationToken.email,
      verficiationToken.token
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
          break;
        default:
          return { error: "Soethisng went wrong!" };
      }
    }

    throw error;
  }

  return {
    success: "Email success!",
  };
};
