import { createContext, useState, ReactNode } from "react"
import { INewReservation, IReservationContext } from "../types/reservation"
import { Outlet } from "react-router-dom"
import { IExperience } from "../types/experience"

// 1. Crear el contexto y dar valor por defecto
const defaultState: IReservationContext = {
	experience: null,
	setExperience: () => { },
	reservation: null,
	updateReservationData: () => { },
	removeReservationData: () => { }
}

export const ReservationContext = createContext<IReservationContext>(defaultState)

// 2. Crear el proveedor, un componente que envuelve otros componentes para proveer el estado.
type ReservationProviderProps = {
	children: ReactNode
}

const ReservationProvider = ({ children }: ReservationProviderProps) => {
	// const storedExperience = localStorage.getItem("experience")
	// const storedReservation = localStorage.getItem("reservation")

	// const calculateInitialReservationData = (): Partial<INewReservation> => {
	// 	const data: INewReservation = JSON.parse(storedReservation!)

	// 	return  {
	// 		...data,
	// 		bookingDate: new Date(data.bookingDate)
	// 	}
	// }

	// const initialExperience = storedExperience ? JSON.parse(storedExperience) : null
	// const initialReservation = storedReservation ? calculateInitialReservationData() : null

	// const [experience, setExperience] = useState<IExperience | null>(initialExperience)
	// const [reservation, setReservation] = useState<Partial<INewReservation> | null>(initialReservation)

    const [experience, setExperience] = useState<IExperience | null>(() => {
        const storedExperience = localStorage.getItem("experience");
        return storedExperience ? JSON.parse(storedExperience) : null;
    });

    const [reservation, setReservation] = useState<Partial<INewReservation> | null>(() => {
        const storedReservation = localStorage.getItem("reservation");
        if (storedReservation) {
            const data: INewReservation = JSON.parse(storedReservation);
            return {
                ...data,
                bookingDate: new Date(data.bookingDate),
            };
        }
        return null;
    });

	const updateReservationData = (updatedData: Partial<INewReservation> | null) => {
		setReservation((prev) => prev ? ({ ...prev, ...updatedData }) : { ...updatedData })
	}

	const removeReservationData = () => setReservation(null)

	return (
		<ReservationContext.Provider
			value={{
				experience,
				setExperience,
				reservation,
				updateReservationData,
				removeReservationData
			}}>
			{children}
		</ReservationContext.Provider>
	)
}

export const ReservationProviderWrapper = () => {
	return (
		<ReservationProvider>
			<Outlet />
		</ReservationProvider>
	)
}