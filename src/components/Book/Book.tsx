import React, { useContext, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import "./Book.css"
import DatePicker from "react-datepicker";
import { ReservationContext } from "../../contexts/reservation.context";
import { useForm } from "react-hook-form";
import { NewReservationSchema, createNewReservationSchema } from "../../schemas/reservation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { INewReservation } from "../../types/reservation";
import { useNavigate } from "react-router-dom";
// import bookingServices from "../../services/booking.services";
import { AuthContext } from "../../contexts/auth.context";

const Book: React.FC = () => {
    const { experience, reservation, updateReservationData, removeReservationData } = useContext(ReservationContext)
    const { user } = useContext(AuthContext)
    const [startDate, setStartDate] = useState<Date | null>(reservation?.bookingDate ? reservation.bookingDate : null)
    const [availableHours, setAvailableHours] = useState<Date[] | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Si el contexto no tiene experiencia, debería navegar a la página de búsqueda de experiencias
        if (!experience  || !user) {
            removeReservationData()
            navigate("/")
        } else {
            updateReservationData({
                userId: user._id,
                experienceId: experience.id,
                paymentStatus: "paid",
                status: "pending",
                email: user.email,
                phone: user.phone
            })
        }
    }, [experience, user])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid, isSubmitting },
    } = useForm<NewReservationSchema>({
        defaultValues: {
            bookingDate: reservation && reservation.bookingDate ? new Date(reservation.bookingDate) : undefined,
            participants: reservation && reservation.participants ? String(reservation.participants) : "1",
            email: reservation && reservation.email ? reservation.email : user?.email,
            phone: reservation && reservation.phone ? reservation.phone : user?.phone
        },
        mode: "onChange",
        resolver: zodResolver(createNewReservationSchema(experience!.availabilityDates, experience!.capacity)),
    })

    console.log("VALUES: ", watch())
    // console.log("ERRORES: ", errors)

    const onSubmit = async (data: NewReservationSchema) => {
        const updatedData: Partial<INewReservation> = {
            ...reservation,
            participants: Number(data.participants),
            totalPrice: experience!.price * Number(data.participants),
            bookingDate: data.bookingDate,
            email: data.email,
            phone: data.phone
        }

        updateReservationData(updatedData)
        localStorage.setItem("reservation", JSON.stringify(updatedData))

        // try {
        //     const response = await bookingServices.create({
        //         bookingDate: updatedData.bookingDate,
        //         experienceId: updatedData.experienceId!,
        //         participants: updatedData.participants!,
        //         userId: updatedData.userId!
        //     })

        //     console.log(response)
        // } catch (error) {
        //     console.log(error)
        // }

        navigate("/payment-details")
    }

    const onChange = (date: Date | null) => {
        if (date) {
            setStartDate(date)
            // setValue("bookingDate", undefined)
            calculateAvailableHours(date)
        }
    }

    // Cálculo para las fechas que se deben excluir del calendario
    const excludeDates = (): Date[] | [] => {
        if (experience && experience.availabilityDates.length > 0) {
            const availabilityDates = experience.availabilityDates.map(date => new Date(date))
            return availabilityDates
        }

        return []
    }

    // Cálculo para recuperar las horas hábiles de una experiencia según el día
    const calculateAvailableHours = (date: Date) => {
        const availableHours = experience!.availabilityDates.filter(
            dateVal => new Date(dateVal).toDateString() == date.toDateString()
        )

        setAvailableHours(availableHours)
        // return availableHours || []
    }

    const handleChangeTime = (date: Date) => {
        // console.log("DATE:", typeof date)

        setValue("bookingDate", new Date(date))
        setStartDate(date)
    }

    const handleGoBack = () => {
        const reservationTemp = localStorage.getItem("reservation")

        if(reservationTemp) {
            localStorage.removeItem("reservation")
        }

        removeReservationData()

        navigate(`/experience/${experience?.id}`)
    }

    return (
        <div className="relative flex flex-col w-full gap-4 p-6 h-dvh mb-28">
            <div>
                <p>{experience!.title}</p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:text-[10px] [&_input]:px-4 [&_input]:py-2.5 mb-32"
            >
                <p className="text-base font-semibold">Selecciona una fecha entre las disponibles</p>
                <div className="mx-auto">
                    <DatePicker
                        selected={startDate ? startDate : undefined}
                        onChange={onChange}
                        includeDates={excludeDates()}
                        inline
                    />

                    {
                        availableHours
                        && (
                            <div>
                                <p className="text-xs">Selecciona una hora entre de las disponibles</p>
                                <div className="flex gap-2 mt-2">
                                    {
                                        availableHours.map(date => {
                                            const hours = String(new Date(date).getHours()).padStart(2, "0")
                                            const minutes = String(new Date(date).getMinutes()).padStart(2, "0")

                                            console.log(date.toString() === startDate?.toString())

                                            return <button type="button" className={`px-2 py-1 ${date.toString() === startDate?.toString() ? "!bg-tertiary" : ""}`} onClick={() => handleChangeTime(date)}>{hours}:{minutes}</button>
                                        })
                                    }

                                </div>

                            </div>
                        )
                    }
                    {
                        watch("bookingDate") && <p className="text-xs">Fecha seleccionada: {watch("bookingDate").toLocaleString()}</p>
                    }
                    {errors.bookingDate && <span className="form__error-notification"> {errors.bookingDate.message} </span>}
                </div>
                <p className="text-lg font-semibold">Detalle</p>
                <p className="text-xs">Comprueba los datos para la reserva</p>
                <div>
                    <label htmlFor="people" className="">Personas</label>
                    <input
                        {...register("participants")}
                        type="number"
                        id="people"
                        max={experience?.capacity}
                    />
                    {errors.participants && <span className="form__error-notification"> {errors.participants.message} </span>}
                </div>
                <div className="">
                    <label htmlFor="phone">Teléfono</label>
                    <div className="flex flex-row gap-2">
                        <input
                            {...register("phone")}
                            className="grow"
                            type="text"
                            id="phone"
                        />
                    </div>
                    {errors.phone && <span className="form__error-notification">{errors.phone.message}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        placeholder="john@doe.com"
                    />
                    {errors.email && <span className="form__error-notification">{errors.email.message}</span>}
                </div>

                <div className="actions shadow-top fixed right-0 left-0 bottom-0 w-full p-6 !flex-row flex-1 bg-white [&>button]:w-full [&>button]:p-2">
                    <button disabled={isSubmitting} type="submit" className="bg-neutral-100 hover:text-white text-neutral-500" onClick={handleGoBack}>
                        Volver
                    </button>
                    <button disabled={!isValid || !watch("bookingDate")} type="submit" className="">
                        Siguiente
                    </button>
                </div>
            </form >
        </div >
    );
}

export default Book;