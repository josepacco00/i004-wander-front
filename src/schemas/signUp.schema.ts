import { z } from "zod"

// TODO: El trim() para el nombre no funciona como se espera

export const signUpSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Please, use only letters")
        .trim(),
    email: z
        .string()
        .min(1, "Email is required")
        .email()
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(8, "Password must be between 8 and 12 characters")
        .max(12, "Password must be between 8 and 12 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!])[A-Za-z\d@#!]+$/, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@, #, or !)"),
    confirmPassword: z.string(),
    role: z.enum(["tourist", "provider"], {
        errorMap: () => ({ message: "Please, select one option" })
    }),
    terms: z.boolean()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"]
})

export type SignUpSchema = z.infer<typeof signUpSchema>
