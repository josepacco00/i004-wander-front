import { z } from "zod"

export const newReservationSchema = z
	.object({
		// experienceId: z
		// 	.string(),
		// userId: z
		// 	.string(),
		email: z
			.string(),
			// .min(1, "El correo es obligatorio")
			// .email({
			// 	message: "Formato incorrecto: example@demo.com"
			// })
			// .trim()
			// .toLowerCase(),
		phone: z.string(),
		// phone: z.object({
		// 	prefix: z
		// 		.string({ message: "El prefijo es obligatorio" })
		// 		.regex(/^\+[1-9]\d{0,2}$/, "Introduzca un prefijo correcto"),
		// 	number: z
		// 		.string({ message: "El número de teléfono es obligatorio" })
		// 		.regex(/^\d{6,10}$/, "El número de teléfono debe tener en 6 y 10 dígitos"),
		// }),
		participants: z
			.string()
			.regex(/^[\d]*$/),
		bookingDate: z.date().or(z.undefined())
			// .union([
			// 	z.date(),
			// 	z.tuple([z.date(), z.date()]),
			// 	z.undefined()
			// ])
	})

export type NewReservationSchema = z.infer<typeof newReservationSchema>