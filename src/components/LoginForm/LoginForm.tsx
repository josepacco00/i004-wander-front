import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../../schemas/login.schema";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom"; // Para redirección
import AuthLayout from "../../layout/AuthLayout.tsx"; // Asegúrate de importar el AuthLayout
import "./LoginForm.css";
import authServices from "../../services/auth.services.ts";
import { AuthContext } from "../../contexts/auth.context.tsx";
import { User } from "../../types/user.ts";

const Login: React.FC = () => {
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
  const  { setUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const onSubmit = async (credentials: LoginSchema) => {
    try {
      // Usar el servicio para la petición de login
      const response = await authServices.login(credentials);

      // Si la respuesta es exitosa
      if (response.status === 200) {
        reset(); // Limpiar el formulario
        setSuccessNotification("Inicio de sesión exitoso");

        console.log(response.data)
        // Guardar el token en localStorage o en un estado global (ejemplo)
        localStorage.setItem("authToken", response.data.token);

        const user: User = {
          ...response.data.user,
          _id: response.data.userId
          // _id: response.data.userId
        }

        console.log(user)
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)

        // Redirigir después de un tiempo
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      // Manejo de errores
      if (error instanceof AxiosError && error.response?.data) {
        if (error.response.data.errors) {
          setReqError(error.response.data.errors.join(", "));
        } else {
          setReqError(error.response.data.message);
        }
      } else {
        setReqError("Error desconocido. Por favor intente de nuevo.");
      }
      setTimeout(() => setReqError(null), 5000);
    }
  };

  return (
    <AuthLayout>
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
            href="/forgot-password"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          disabled={isSubmitting || !isValid}
          type="submit"
          className="px-4 py-3 mt-4 font-semibold text-center text-white rounded-full shadow-lg bg-primary hover:bg-tertiary disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Iniciando sesión..." : "Inicia sesión"}
        </button>
        <p className="text-xs text-center">
          ¿Aún no tienes cuenta?
          <a href="/register" className="font-bold text-primary hover:text-tertiary">
            {" "}
            Regístrate
          </a>
        </p>
      </form>
      {reqError && <p className="form__error-notification">{reqError}</p>}
      {successNotification && (
        <p className="form__success-notification">{successNotification}</p>
      )}
    </AuthLayout>
  );
};

export default Login;
