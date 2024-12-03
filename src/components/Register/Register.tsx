import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema, signUpSchema } from "../../schemas/signUp.schema"
import AuthLayout from "../../layout/AuthLayout";
import "./Register.css"
import authServices from "../../services/auth.services";
import { countriesPhoneList } from "../../mocks/countriesPhoneList.mock";

const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isValid, isSubmitting },
    } = useForm<SignUpSchema>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: {
                prefix: "+34",
                number: ""
            },
            role: "tourist",
            age: false,
        },
        mode: "onChange",
        resolver: zodResolver(signUpSchema)
    })

    // Para gestionar las notificaciones del BFF
    const [reqError, setReqError] = useState<string[] | null>()
    const [successNotification, setSuccessNotification] = useState<string | null>(null)

    const navigate = useNavigate()

    const onSubmit = async (data: SignUpSchema) => {
        // Eliminamos el confirmPassword y el booleano de la data final
        const { confirmPassword, age, ...rest } = data

        // Es necesario hacer la transformación del teléfono aquí, si no da error de tipos en la validación de react-hook-form con zod
        const newUser = {
            ...rest,
            phone: `${data.phone.prefix}${data.phone.number}`
        }

        try {
            await authServices.register(newUser)

            localStorage.setItem("tempEmail", newUser.email)
            setSuccessNotification("Usuario registrado")

            setTimeout(() => {
                setSuccessNotification(null)
                reset()
                navigate("/confirm-register")
            }, 5000)

        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.data) {

                    if (error.response.data.errors) {
                        setReqError(error.response.data.errors)
                    } else {
                        setReqError([error.response.data.details.message])
                    }
                } else {
                    setReqError([error.message])
                }
            } else {
                console.log(error)
            }

            setTimeout(() => setReqError(null), 5000)
        }
    }

    return (
        <AuthLayout>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:text-sm [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm"
            >
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                        {...register("name")}
                        type="text"
                        id="name"
                        placeholder="John Doe"
                    />
                    {errors.name &&
                        <span className="form__error-validation"> {errors.name.message} </span>}
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        {...register("email")}
                        type="email"
                        id="email"
                        placeholder="john@doe.com"
                    />
                    {errors.email &&
                        <span className="form__error-validation">{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        {...register("password")}
                        type="password"
                        id="password"
                    />
                    {errors.password &&
                        <span className="form__error-validation">{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Repite tu contraseña</label>
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        id="confirmPassword"
                    />
                    {errors.confirmPassword &&
                        <span className="form__error-validation">{errors.confirmPassword.message}</span>}
                </div>
                <div>
                    <label htmlFor="location">País</label>
                    <input
                        {...register("location")}
                        type="text"
                        id="location"
                    />
                    {errors.location &&
                        <span className="form__error-validation">{errors.location.message}</span>}
                </div>
                <div>
                    <label htmlFor="phone">Teléfono</label>
                    <div className="flex gap-2">
                        <Controller
                            name="phone.prefix"
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="phone-prefix">
                                    {
                                        countriesPhoneList.map((ph, i) =>
                                            <option key={`${Date.now()}-${i}`} value={ph.prefijo}>{`${ph.bandera} ${ph.prefijo}`}</option>)
                                    }
                                </select>
                            )}
                        />
                        <Controller
                            name="phone.number"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="number"
                                    className="grow" />
                            )}
                        />
                    </div>
                    {errors.phone && errors.phone.prefix &&
                        <span className="form__error-validation">{errors.phone.prefix.message}</span>}
                    {errors.phone && errors.phone.number &&
                        <span className="form__error-validation">{errors.phone.number.message}</span>}
                </div>
                <div className="relative">
                    <label htmlFor="role">Quiero registrarme como...</label>
                    <select
                        {...register("role")}
                        id="role"
                        className="hover:bg-neutral-300">
                        <option value="tourist" className="bg-white">Turista</option>
                        <option value="provider" className="bg-white">Proveedor</option>
                    </select>
                    <div className="absolute right-4 top-[calc(50%+4px)] p-1.5 pt-[5px] pb-[7px] rounded-full pointer-events-none">
                        <i className="w-2 h-2 block border-neutral-800 border-l-2 border-b-2 -rotate-45"></i>
                    </div>
                    {errors.role &&
                        <span className="form__error-validation">{errors.role.message}</span>}
                </div>
                <div className="mt-2">
                    <label className="!text-xs">Para registrarte en la plataforma debes ser mayor de edad. Al marcar la siguiente casilla confirmas tener al menos 18 años.</label>
                    <div className="flex items-center gap-2">
                        <input
                            {...register("age")}
                            type="checkbox"
                            name="age"
                            id="age"
                        />
                        <label htmlFor="age" className="!text-xs">Soy mayor de edad (18+ años)</label>
                    </div>
                </div>
                {errors.age &&
                    <span className="form__error-validation">{errors.age.message}</span>}

                <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className="mt-4 px-4 py-3 shadow-lg disabled:bg-neutral-400 disabled:cursor-not-allowed">
                    {isSubmitting ? "Registrando..." : "Regístrate"}
                </button>
                <p className="text-xs text-center">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                        to={"/login"}
                        className="text-primary hover:text-tertiary font-bold">
                        Inicia sesión
                    </Link>
                </p>
            </form>

            {reqError &&
                <div className="form__notification form__notification--error">
                    {
                        reqError.map((e, i) => <p key={`${Date.now()}-${i}`}>{e}</p>)
                    }
                </div>
            }
            {successNotification &&
                <p className="form__notification form__notification--success">{successNotification}</p>}
        </AuthLayout >
    )
}

export default Register