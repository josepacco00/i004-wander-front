import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../../schemas/login.schema";
import imagelogo from "../../assets/img/imagelogo.png";
import imageletter from "../../assets/img/imageletter.png";
import './loginForm.css';

const Login: React.FC = () => {
    // Inicialización del formulario utilizando React Hook Form y validación con Zod
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema), // Validación de esquema con Zod
    });

    // Función de manejo de envío del formulario
    const onSubmit = async (data: LoginSchema) => {
        console.log("Iniciando sesión con:", data);
        // Aquí se implementaría la lógica para autenticar al usuario, por ejemplo, llamando a una API
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                {/* Sección del logo y mensaje introductorio */}
                <div className="flex flex-col items-center mb-6">
                    <img src={imagelogo} alt="Logo de Wander" className="logo" />
                    <img src={imageletter} alt="Texto Wander" className="text-logo" />
                    <p className="text-black text-base font-bold text-center">
                        Explora nuevas aventuras
                    </p>
                </div>

                {/* Formulario de inicio de sesión */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Campo de email */}
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Introduce tu correo electrónico"
                            {...register("email")}
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm placeholder-gray-600"
                        />
                        {/* Mostrar mensaje de error si el campo email es inválido */}
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Campo de contraseña */}
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Introduce tu contraseña"
                            {...register("password")}
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm placeholder-gray-600"
                        />
                        {/* Mostrar mensaje de error si el campo password es inválido */}
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Enlace para restablecer la contraseña */}
                    <div className="text-right">
                        <a href="/reset-password" className="text-sm text-gray-500 hover:text-gray-700">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    {/* Botón de envío con estilo personalizado */}
                    <button
                        type="submit"
                        className="w-52 py-4 text-white bg-[#ff9d14] rounded-3xl hover:opacity-90 disabled:opacity-50 mx-auto block"
                        disabled={isSubmitting} // Deshabilitar el botón durante el envío
                    >
                        {isSubmitting ? "Iniciando sesión..." : "Inicia sesión"} {/* Mostrar texto según el estado de envío */}
                    </button>
                </form>

                {/* Enlace para registrarse si no se tiene cuenta */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    ¿Aún no tienes cuenta?{" "}
                    <a href="/register" className="text-[#ff9d14] hover:text-[#ff7a00]">
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
