import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../../schemas/login.schema";
import "./LoginForm.css";
import imagelogo from "../../assets/img/imagelogo.png";
import imageletter from "../../assets/img/imageletter.png";
import { useState } from "react";
import authServices from "../../services/auth.services"; // Importar authServices
import { useNavigate } from "react-router-dom"; // Para la redirección

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Para la validación en tiempo real
  });

  // Manejo de notificaciones
  const [reqError, setReqError] = useState<string | null>(null);
  const [successNotification, setSuccessNotification] = useState<string | null>(null);

  // Simulación de token (esto puede venir de otro lugar, como un cookie o localStorage)
  const token = "TOKEN_AQUI"; // Este token puede ser el que obtienes tras el login previo

  const onSubmit = async (data: LoginSchema) => {
    // Este es solo un ejemplo; normalmente tendrías el token de algún lugar, como localStorage o un state global
    const token = "TOKEN_AQUI"; // Deberías obtener el token real de alguna forma.

    try {
      // Log para ver lo que se va a enviar a la API
      console.log("Intentando iniciar sesión con token: ", token);

      // Llamar al servicio de autenticación para hacer login con el token
      const response = await authServices.login(token);

      // Log para ver la respuesta de la API
      console.log("Respuesta de la API: ", response);

      if (response.status === 200) {
        // Si la respuesta es exitosa, resetea el formulario y muestra notificación
        reset();
        setSuccessNotification("Inicio de sesión exitoso");
        setTimeout(() => setSuccessNotification(null), 5000);

        // Redirigir al usuario (ejemplo de redirección después de login)
        navigate("/home"); // Cambia la ruta según corresponda a tu app
      } else {
        throw new Error("Error en el inicio de sesión");
      }
    } catch (error) {
      // Manejo de errores
      if (error instanceof Error) {
        setReqError(error.message);
      }
      setTimeout(() => setReqError(null), 5000);
    }
  };

  return (
    <div className="w-full mx-auto h-dvh flex flex-col items-center p-6">
      <div className="brand">
        <div className="flex flex-col items-center mb-6">
          <img
            src={imagelogo}
            alt="Logo de Wander"
            className="w-[140px] md:w-[180px] mb-4"
          />
          <img
            src={imageletter}
            alt="Texto Wander"
            className="w-[100px] md:w-[160px] mb-2"
          />
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
          <a
            href="/reset-password"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
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
