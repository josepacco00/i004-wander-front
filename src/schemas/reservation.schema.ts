import { z } from "zod"

export const createNewReservationSchema = (availableHours: Date[], participants: number) => {
	return z
	.object({
		email: z
			.string()
			.min(1, "El correo es obligatorio")
			.email({
				message: "Formato incorrecto: example@demo.com"
			})
			.trim()
			.toLowerCase(),
		phone: z
			.string()
			.regex(/^\d*$/, { message: "Por favor, introduzca solo números" })
			.min(6, { message: "El teléfono debe tener al menos 6 dígitos" })
			.max(12, { message: "El teléfono no puede tener más de 12 dígitos"})
			.refine(value => !isNaN(Number(value)), { message: "Debes introducir un número" } ),
		participants: z
			.string()
			.regex(/^[\d]*$/,"Debes introducir un número")
			.refine(value => {
				const num = Number(value)
				// console.log(participants)
				return num >= 1 && num <= participants
			}, `La capacidad mínima es de 1, y la máxima de ${participants}`),
		bookingDate: z
			.date({ message: "Seleccione una fecha y hora dentro de las disponibles" })
			.refine(date => {
				return availableHours.some(d => new Date(d).toString() === date.toString())
			}, "Seleccione una fecha y hora dentro de las disponibles")
	})
}

export type NewReservationSchema = z.infer<ReturnType<typeof createNewReservationSchema>>