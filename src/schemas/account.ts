import { z } from "zod";

export const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "This field is required." })
    .email("This is not a valid email."),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.string({
    message: "Gender must be at least 2 characters.",
  }),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
