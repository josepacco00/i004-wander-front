import { z } from "zod";

// Definimos el esquema para AddExperience
export const addExperienceSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, "Debes subir al menos una imagen")
    .max(5, "Solo puedes subir un máximo de 5 imágenes"),
  title: z
    .string()
    .min(1, "El título es obligatorio")
    .max(25, "El título no puede exceder los 25 caracteres")
    .refine((val) => val.trim().length === val.length, {
      message: "El título no debe incluir espacios al inicio o al final",
    }),
  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(250, "La descripción no puede exceder los 250 caracteres"),
  availability: z.object({
    date: z
      .string()
      .nonempty("La fecha es obligatoria"),
    time: z
      .string()
      .nonempty("La hora es obligatoria"),
  }),
  capacity: z
    .number({
      required_error: "La capacidad es obligatoria",
      invalid_type_error: "La capacidad debe ser un número",
    })
    .positive("La capacidad debe ser mayor que cero"),
  pricePerPerson: z
    .number({
      required_error: "El precio por persona es obligatorio",
      invalid_type_error: "El precio por persona debe ser un número",
    })
    .positive("El precio debe ser mayor que cero"),
});

// Tipo inferido para usar en TypeScript si es necesario
export type AddExperienceSchema = z.infer<typeof addExperienceSchema>;
