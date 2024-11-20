// Importación de librerías necesarias
import React from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "../../schemas/login.schema"; 
import imagelogo from "../../assets/img/imagelogo.png";
import imageletter from "../../assets/img/imageletter.png"; 
import './LoginForm.css';

// Interfaz para las propiedades del componente InputField
interface InputProps {
    id: keyof LoginSchema;
    label: string;
    type: string;
    placeholder: string;
    register: UseFormRegister<LoginSchema>;
    error?: string;
}

// Componente que representa un campo de input con validación
const InputField: React.FC<InputProps> = ({ id, label, type, placeholder, register, error }) => (
    <div className="space-y-1">
        <label htmlFor={id} className="text-dark">{label}</label>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            {...register(id)}
            className="w-full p-3 border border-brandGrey rounded-full focus:outline-none focus:ring-2 focus:ring-brandYellow text-sm placeholder-gray-600"
        />
        {error && <span className="text-tertiary text-sm">{error}</span>}
    </div>
);

// Componente principal para el formulario de login
const Login: React.FC = () => {
    // Configuración del formulario con React Hook Form y Zod para validación
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    // Maneja el envío del formulario
    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        console.log("Iniciando sesión con:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center font-sans p-4">
            <div className="w-full max-w-md">
                {/* Logo e introducción */}
                <div className="flex flex-col items-center mb-6">
                    <img className="logo" src={imagelogo} alt="Logo de Wander" />
                    <img className="text-logo" src={imageletter} alt="Texto Wander" />
                    <p className="text-dark text-base font-bold text-center mb-2">Explora nuevas aventuras</p>
                </div>

                {/* Formulario de login */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Campos de correo electrónico y contraseña */}
                    <InputField
                        id="email"
                        label="Correo electrónico"
                        type="email"
                        placeholder="Introduce tu correo electrónico"
                        register={register}
                        error={errors.email?.message}
                    />
                    <InputField
                        id="password"
                        label="Contraseña"
                        type="password"
                        placeholder="Introduce tu contraseña"
                        register={register}
                        error={errors.password?.message}
                    />

                    {/* Enlace para recuperar la contraseña */}
                    <div className="text-right">
                        <a href="/reset-password" className="text-sm text-gray-500 hover:text-gray-700">¿Olvidaste tu contraseña?</a>
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="w-52 py-4 text-white bg-brandYellow rounded-3xl hover:opacity-90 disabled:opacity-50 mx-auto block"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Iniciando sesión..." : "Inicia sesión"}
                    </button>
                </form>

                {/* Enlace para registro */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    ¿Aún no tienes cuenta?{" "}
                    <a href="/register" className="text-brandYellow hover:text-secondary">Regístrate</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
