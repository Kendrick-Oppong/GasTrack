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

export const bookingFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .trim()
    .regex(emailRegex, { message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  phoneNumber: z
    .string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(15, { message: "Phone number cannot exceed 15 characters" })
    .refine((value: string) => /^\+?[0-9]+$/.test(value), {
      message: "Invalid phone number format",
    }),

  address: z
    .string()
    .trim()
    .min(2, { message: "Address must be at least 2 characters long" })
    .max(255, { message: "Address cannot exceed 255 characters" }),

  cylinderSize: z.string().min(2, { message: "Please select cylinder size" }),
});

export const bookingFormServerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .trim()
    .regex(emailRegex, { message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  phoneNumber: z
    .string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .max(15, { message: "Phone number cannot exceed 15 characters" })
    .refine((value: string) => /^\+?[0-9]+$/.test(value), {
      message: "Invalid phone number format",
    }),
  address: z
    .string()
    .trim()
    .min(2, { message: "Address must be at least 2 characters long" })
    .max(255, { message: "Address cannot exceed 255 characters" }),
  cylinderSize: z.string().min(2, { message: "Please select cylinder size" }),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});
