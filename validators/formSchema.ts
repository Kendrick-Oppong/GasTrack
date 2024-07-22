import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactUsSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .regex(emailRegex, { message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  subject: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(50, { message: "Title cannot exceed 50 characters" }),
  message: z
    .string()
    .min(5, { message: "Your message must be at least 5 characters long" })
    .max(200, { message: "Message cannot exceed 200 characters" }),
});
