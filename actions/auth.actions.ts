"use server";

import {
  SigninFormSchema,
  SignupFormSchema,
} from "@/lib/zod-schemas/auth.schema";

type ActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function signinAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData);

  const validatedFields = SigninFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  console.log({ email, password });

  return { success: true };
}

export async function signupAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData);

  const validatedFields = SignupFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  console.log({ name, email, password });

  return { success: true };
}
