import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema, signUpSchema } from "../../schemas/signUp.schema"
import "./Register.css"
import { useState } from "react"

const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        // defaultValues: {
        //     name: "Javier",
        //     email: "javier@hidalgo.com",
        //     password: "Asdf2024!",
        //     confirmPassword: "Asdf2024!",
        //     role: "provider",
        //     terms: false
        // }
    })

    // Pruebas para notificaciones
    const [reqError, setReqError] = useState<string | null>()
    const [successNotification, setSuccessNotification] = useState<string | null>(null)

    console.log(errors)

    const onSubmit = async (data: SignUpSchema) => {

        // Pruebas de funcionamiento de la petición
        // const newUser = JSON.stringify(data)
        // console.log(newUser)

        // const userExample = JSON.stringify({
        //     email: "eve.hol@reqres.in",
        //     password: "string"
        // })
        // console.log(userExample)

        // try {
        //     // const response = await fetch(`${API_URL}/auth/register`, {
        //     const response = await fetch(`https://reqres.in/api/register`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: userExample
        //     })

        //     const result = await response.json()

        //     if (response.status === 400) {
        //         throw Error(result.error)
        //     } else if (response.status === 200) {
        //         reset()
        //         setSuccessNotification("User registered successfully")
        //         setTimeout(() => setSuccessNotification(null), 5000)
        //     }



        // } catch (error) {
        //     if (error instanceof Error) {
        //         setReqError(error.message)
        //     } else if (error && typeof error === "object" && "error" in error) {
        //         setReqError(error.error as string)
        //     }
        //     setTimeout(() => setReqError(null), 5000)
        // }

        // BDD request
        // await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return (
        <div className="w-full h-dvh flex flex-col gap-4 px-12 py-8 rounded-md">
            <div className="brand">
                <p className="font-bold text-sm text-center">Explora nuevas aventuras</p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:text-sm [&_label]:text-slate-800 [&_input]:px-4 [&_input]:py-1 [&_input]:text-sm [&_input]:ring-1 [&_input]:ring-slate-200 [&_input]:rounded-full focus:[&_input]:bg-slate-100 focus:[&_input]:outline-none focus:[&_input]:ring-2 focus:[&_input]:ring-slate-300 [&_input]:cursor-default"
            >
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        {...register("name")}
                        type="text"
                        id="name"
                        placeholder="John Doe"
                    />
                    {errors.name && <span className="form__error-notification"> {errors.name.message} </span>}
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
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register("password")} />
                    {errors.password && <span className="form__error-notification">{errors.password.message}</span>}

                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" id="confirmPassword" {...register("confirmPassword")} />
                    {errors.confirmPassword && <span className="form__error-notification">{errors.confirmPassword.message}</span>}
                </div>
                {/* <div>
                    <label htmlFor="location">Location</label>
                    <select {...register("location", {
                            required: true
                        })} id="location">
                        <option value="spain">Spain</option>
                        <option value="venezuela">Venezuela</option>
                        <option value="argentina">Argentina</option>
                        <option value="bolivia">Bolivia</option>
                        <option value="colombia">Colombia</option>
                        <option value="peru">Peru</option>
                    </select>
                    { errors.location && <span className="form__error-notification">Location is required</span> }
                    </div> */}
                <div className="relative">
                    <label htmlFor="role">Role</label>
                    <select className="px-4 py-2 rounded-full appearance-none" id="role" {...register("role")}>
                        <option value="tourist">Tourist</option>
                        <option value="provider">Provider</option>
                    </select>
                    <div className="absolute right-4 top-[calc(50%+4px)] p-1.5 pt-[5px] pb-[7px] rounded-full hover:bg-slate-400">
                        <i className=" w-2 h-2 block border-slate-800 border-l-2 border-b-2 -rotate-45"></i>
                    </div>
                    {errors.role && <span className="form__error-notification">{errors.role.message}</span>}
                </div>
                {/* <div>
                    <label>Preferences</label>
                    { preferencesOptions.map((option, index) => {
                        return <div key={crypto.randomUUID()} className="flex gap-2 items-center">
                        <input type="checkbox" {...register(`pref-${option}`) id={`pref-${option}`} value={option} />
                        <label htmlFor={`pref-${option}`}>{ option }</label>
                        </div>
                        }) }
                        </div> */}
                <div className="!flex-row [&_input]:ring-0">
                    <input {...register("terms")} type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms" className="!text-xs">Accept terms and conditions</label>
                    {errors.role && <span className="form__error-notification">{errors.role.message}</span>}
                </div>
                <button disabled={isSubmitting} type="submit" className="p-2 font-semibold bg-primary hover:bg-secondary rounded-full shadow-lg disabled:bg-slate-400 text-center">
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
                <p className="text-xs text-center">
                    ¿Ya tienes una cuenta?
                    <a href="" className="text-primary hover:text-secondary font-bold"> Inicia sesión</a>
                </p>
            </form>
            {reqError && <p className="form__error-notification">{reqError}</p>}
            {successNotification && <p className="form__success-notification">{successNotification}</p>}
        </div>
    )
}

export default Register