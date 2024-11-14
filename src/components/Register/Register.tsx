import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema, signUpSchema } from "../../schemas/signUp.schema"

const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    console.log(errors)

    const onSubmit = async (data: SignUpSchema) => {
        const newUser = JSON.stringify(data)
        console.log(newUser)
        try {
            // const response = await fetch(`${API_URL}/auth/register`, {
            const response = await fetch(`https://reqres.in/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: newUser
            })

            const result = await response.json()

            console.log(result)
        } catch (error) {
            console.log(error)
        }

        // BDD request
        // await new Promise((resolve) => setTimeout(resolve, 1000))

        reset()
    }

    return (
        <div className="min-w-[290px] w-fit flex flex-col gap-4 px-12 py-8 bg-slate-100 border border-slate-200/50 rounded-md">
            <p className="text-xl font-bold">Create your free account</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&_label]:text-sm [&_input]:px-2 [&_input]:py-1 [&_select]:px-2 [&_select]:py-1 [&_input]:ring-1 [&_input]:ring-slate-200 [&_input]:rounded-md [&_select]:rounded-md focus:[&_input]:bg-slate-100 focus:[&_input]:outline-none focus:[&_input]:ring-2 focus:[&_input]:ring-slate-300"
            >
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name")}
                    />
                    {errors.name && <span className="form__error-notification"> {errors.name.message} </span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register("email")} />
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
                <div>
                    <label htmlFor="role">Role</label>
                    <select {...register("role")} id="role">
                        <option value="tourist">Tourist</option>
                        <option value="provider">Provider</option>
                    </select>
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
                <button disabled={isSubmitting} type="submit" className="p-2 font-semibold bg-amber-400 hover:bg-amber-500 rounded-md disabled:bg-slate-400 text-center">
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    )
}

export default Register