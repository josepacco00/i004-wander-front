import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../../schemas/login.schema";
import { useContext, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout.tsx";
import authServices from "../../services/auth.services.ts";
import { AuthContext } from "../../contexts/auth.context.tsx";
import { User } from "../../types/user.ts";
// import "./LoginForm.css";

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

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (credentials: LoginSchema) => {
    try {
      // Usar el servicio para la petición de login
      const response = await authServices.login(credentials);

      // Si la respuesta es exitosa
      if (response.status === 200) {
        setSuccessNotification("Inicio de sesión exitoso");

        // console.log(response.data);

        const user: User = {
          ...response.data.user,
          _id: response.data.userId,
        };

        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        // console.log(user);
        
        // Redirigir después de un tiempo
        setTimeout(() => {
          reset(); // Limpiar el formulario
          setUser(user)
          navigate("/")
        }, 2000);
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
        console.log(error)
        setReqError("Error en la comunicación con el servidor");
      }
      setTimeout(() => setReqError(null), 5000);
    }
  };

  return (
    <AuthLayout>
      {/* Formulario de inicio de sesión */}
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
            <span className="form__error-validation">{errors.email.message}</span>
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
            <span className="form__error-validation">{errors.password.message}</span>
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
        <p className="text-xs text-center mb-10">
          ¿Aún no tienes cuenta?
          <a href="/register" className="font-bold text-primary hover:text-tertiary">
            {" "}
            Regístrate
          </a>
        </p>
      </form>

      {/* Mostrar errores globales en la parte superior */}
      {reqError && (
        <div className="form__notification form__notification--error">
          <p>{reqError}</p>
        </div>
      )}

      {/* Notificación de éxito */}
      {successNotification && (
        <div className="form__notification form__notification--success">
          <p>{successNotification}</p>
        </div>
      )}
    </AuthLayout>
  );
};

export default Login;
