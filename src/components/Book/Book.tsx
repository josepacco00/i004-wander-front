import React, { useContext, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import "./Book.css"
import DatePicker from "react-datepicker";
import { ReservationContext } from "../../contexts/reservation.context";
import { useForm } from "react-hook-form";
import { NewReservationSchema, newReservationSchema } from "../../schemas/reservation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { INewReservation } from "../../types/reservation";
import { useNavigate } from "react-router-dom";
import { userMock } from "../../mocks/user.mock";
import { addDays } from "date-fns"

const Book: React.FC = () => {
    // Esta data vendría de la consulta al contexto de autenticación
    const user = userMock

    const { experience, reservation, updateReservationData } = useContext(ReservationContext)
    const [startDate, setStartDate] = useState<Date | null>(reservation && reservation.bookingDate ? reservation.bookingDate : null)
    const navigate = useNavigate()

    useEffect(() => {
        // Si el contexto no tiene experiencia, debería navegar a la página de búsqueda de experiencias
        if (!reservation || !experience) {
            navigate("/")
        }

    }, [experience, reservation])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid, isSubmitting },
    } = useForm<NewReservationSchema>({
        defaultValues: {
            bookingDate: reservation && reservation.bookingDate || undefined,
            participants: reservation && reservation.participants || "2",
            email: reservation && reservation.email || "",
            phone: reservation && reservation.phone || ""
        },
        mode: "onChange",
        resolver: zodResolver(newReservationSchema),
    })

    // console.log("ERRORES: ", errors)
    console.log("VALUES: ", watch())

    const onChange = (date: Date | null) => {
        // console.log(date)
        date && (
            setStartDate(date),
            setValue("bookingDate", date)
        )
    }

    const onSubmit = (data: Partial<INewReservation>) => {

        const updatedData = {
            ...reservation,
            bookingDate: startDate!,
            participants: data.participants,
            totalPrice: experience!.price * Number(data.participants)
        }
        updateReservationData(updatedData)

        // console.log(reservation)
        localStorage.setItem("reservation", JSON.stringify(updatedData))

        navigate("/payment-details")
    }

    return (
        <div className="w-full h-dvh flex flex-col gap-4 p-6">
            {/* <div>
                <p>MINI DATA DE LA EXPERIENCIA</p>
                <p>{experience!.title}</p>
            </div> */}
            <p className="text-base font-semibold">Selecciona la fecha</p>
            <div className="mx-auto">
                <DatePicker
                    selected={startDate ? startDate : undefined}
                    onChange={onChange}
                    excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                    inline
                />
            </div>
            <div className="">
                <p className="text-lg font-semibold">Detalle</p>
                <p className="text-xs">Comprueba los datos para la reserva</p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:text-[10px] [&_input]:px-4 [&_input]:py-2.5 mb-32"
                >
                    <div>
                        <label htmlFor="people" className="">Personas</label>
                        <input
                            {...register("participants")}
                            type="number"
                            id="people"
                        />
                        {errors.participants && <span className="form__error-notification"> {errors.participants.message} </span>}
                    </div>
                    <div className="">
                        <label htmlFor="phone">Teléfono</label>
                        <div className="flex flex-row gap-2">
                            {/* <input
                                // {...register("prefix")}
                                className="w-10"
                                type="text"
                                id="prefix"
                            /> */}
                            <input
                                {...register("phone")}
                                className="grow"
                                type="text"
                                id="phone"
                                value={user.phone}
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
                            value={user.email}
                        />
                        {errors.email && <span className="form__error-notification">{errors.email.message}</span>}
                    </div>

                    <div className="actions shadow-top fixed right-0 left-0 bottom-0 w-full p-6 !flex-row flex-1 bg-white [&>button]:w-full [&>button]:p-2">
                        <button disabled={isSubmitting} type="submit" className="bg-neutral-100 hover:text-white text-neutral-500" onClick={() => navigate("/experience-details")}>
                            Volver
                        </button>
                        <button disabled={!isValid || !watch("bookingDate")} type="submit" className="">
                            Siguiente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Book;