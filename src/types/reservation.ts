import { IExperience } from "./experience"

export type ReservationStatus = "pending" | "confirmed" | "canceled"
export type ReservationPaymentStatus = "paid" | "pending"
export type ReservationPaymentMethod = "mastercard" | "visa"

export interface IReservationContext {
	experience: IExperience | null,
	setExperience: (experience: IExperience) => void,
	reservation: Partial<INewReservation> | null,
	updateReservationData: (updatedData: Partial<INewReservation> | null) => void
	removeReservationData: () => void
}

export interface IReservation {
	_id: string,
	// orderNum: string // Cambiarlo por una fecha u otro dato
	experienceId: string,
	userId: string,
	status: ReservationStatus,
	bookingDate: Date,
	totalPrice: number,
	participants: number,
	paymentStatus: ReservationPaymentStatus
	createdAt: Date
}

export interface INewReservation {
	userId: string | null,
	experienceId: string | null,
	paymentStatus: ReservationPaymentStatus,
	status: ReservationStatus,
	bookingDate: Date,
	participants: number,
	totalPrice: number,
	email?: string | null,
	phone?: string | null,
	paymentMethod?: ReservationPaymentMethod  // Agregada la propiedad 'paymentMethod' como opcional
}

// Total price se calcula en el back de java
// Falta añadir el Date en el endpoint de Nodejs
export type INewReservationToNode = Omit<INewReservation, "email" | "phone" | "paymentMethod">
