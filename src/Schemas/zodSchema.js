import { z } from "zod";

// Reusable email validation
const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email address" });

// Reusable password validation
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Must include at least one number" })
  .regex(/[@$!%*?&]/, {
    message: "Must include at least one special character (@$!%*?&)",
  });

// Full signup schema
export const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: emailSchema,
  password: passwordSchema,
});

// Login schema (no name required)
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
});
