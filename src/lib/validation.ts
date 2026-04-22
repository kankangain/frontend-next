import { z } from "zod";

const phoneSchema = z.preprocess(
  (value) => String(value ?? "").replace(/\D/g, ""),
  z.string().regex(/^[6-9]\d{9}$/, "Phone must be a valid 10-digit Indian mobile number")
);

const nameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters")
  .regex(/^[A-Za-z ]+$/, "Name can contain only letters and spaces")
  .refine((value) => value.split(/\s+/).every((part) => part.length > 0), {
    message: "Enter a valid name",
  });

const emailComSchema = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .refine((value) => value.toLowerCase().endsWith(".com"), {
    message: "Email must end with .com",
  });

const collegeSchema = z
  .string()
  .trim()
  .min(3, "College name must be at least 3 characters")
  .regex(/^[A-Za-z0-9 .,&()'-]+$/, "Enter a valid college name");

export const registerFormSchema = z.object({
  name: nameSchema,
  email: emailComSchema,
  phone: phoneSchema,
  college: collegeSchema,
  year: z.string().trim().min(1, "Year is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["participant", "organizer", "volunteer", "faculty"]),
  eventId: z.string().trim().min(1, "Please select an event"),
});

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailComSchema,
  phone: phoneSchema,
  subject: z.string().trim().min(3, "Subject must be at least 3 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export const userLoginFormSchema = z.object({
  email: emailComSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const adminLoginFormSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export function validateIdCardFile(file: File | null): string | null {
  if (!file) {
    return null;
  }

  const allowed = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
  if (!allowed.includes(file.type)) {
    return "Student ID must be a PDF, PNG, JPG, or JPEG file";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Student ID file must be 5MB or smaller";
  }

  return null;
}

export function getZodErrorMessage(error: z.ZodError): string {
  return error.issues[0]?.message || "Please check your form inputs";
}
