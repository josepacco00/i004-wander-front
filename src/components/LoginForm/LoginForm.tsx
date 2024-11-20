import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../../schemas/login.schema";
import "./LoginForm.css";
import imagelogo from "../../assets/img/imagelogo.png";
import imageletter from "../../assets/img/imageletter.png";
import { useState } from "react";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // Manejo de notificaciones
  const [reqError, setReqError] = useState<string | null>();
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
    const userLogin = JSON.stringify(data);

    try {
      // Simulación de petición
      // const response = await fetch(`${API_URL}/auth/login`, {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: userLogin,
      // });

      // const result = await response.json();

      // if (response.status === 400) {
      //     throw Error(result.error);
      // } else if (response.status === 200) {
      //     reset();
      //     setSuccessNotification("Inicio de sesión exitoso");
      //     setTimeout(() => setSuccessNotification(null), 5000);
      // }
    } catch (error) {
      // Manejo de errores
      // if (error instanceof Error) {
      //     setReqError(error.message);
      // }
      // setTimeout(() => setReqError(null), 5000);
    }
  };

  return (
    <div className="w-full mx-auto h-dvh flex flex-col items-center p-6">
      <div className="brand">
        <div className="flex flex-col items-center mb-6">
          <img src={imagelogo} alt="Logo de Wander" className="w-[140px] md:w-[180px] mb-4" />
          <img src={imageletter} alt="Texto Wander" className="w-[100px] md:w-[160px] mb-2" />
          <p className="text-black text-base max-sm:text-sm font-bold text-center">
            Explora nuevas aventuras
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_label]:text-sm [&_label]:text-slate-800 [&_input]:px-4 [&_input]:py-3 [&_input]:text-sm [&_input]:ring-1 [&_input]:ring-slate-200 [&_input]:rounded-full focus:[&_input]:bg-slate-100 focus:[&_input]:outline-none focus:[&_input]:ring-2 focus:[&_input]:ring-slate-300 [&_input]:cursor-default"
      >
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="john@doe.com"
          />
          {errors.email && (
            <span className="form__error-notification">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="••••••••"
          />
          {errors.password && (
            <span className="form__error-notification">{errors.password.message}</span>
          )}
        </div>
        <div className="text-right">
          <a href="/reset-password" className="text-sm text-gray-500 hover:text-gray-700">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          disabled={isSubmitting || !isValid}
          type="submit"
          className="mt-4 px-4 py-3 font-semibold bg-primary hover:bg-tertiary text-white rounded-full shadow-lg disabled:bg-slate-400 text-center disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Iniciando sesión..." : "Inicia sesión"}
        </button>
        <p className="text-xs text-center">
          ¿Aún no tienes cuenta?
          <a href="/register" className="text-primary hover:text-tertiary font-bold">
            {" "}
            Regístrate
          </a>
        </p>
      </form>
      {reqError && <p className="form__error-notification">{reqError}</p>}
      {successNotification && (
        <p className="form__success-notification">{successNotification}</p>
      )}
    </div>
  );
};

export default Login;
