import { z } from "zod";

// Definición del esquema de validación para el formulario de inicio de sesión
export const loginSchema = z.object({
  email: z
    .string() // Se espera que el campo de email sea una cadena de texto
    .min(1, "El correo electrónico es obligatorio") // Mensaje de error si el campo está vacío
    .email("Formato de correo electrónico inválido"), // Verifica que el formato del correo electrónico sea válido
  password: z.string().min(1, "La contraseña es obligatoria"), // Mensaje de error si el campo de contraseña está vacío
});

// Inferir el tipo de datos del formulario de inicio de sesión a partir del esquema de validación
export type LoginSchema = z.infer<typeof loginSchema>; 
