// Importación de librerías necesarias
import React from "react";  // Importamos React para utilizar JSX
import { useForm, SubmitHandler, FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";  // Importamos hooks de React Hook Form para el manejo de formularios
import { zodResolver } from "@hookform/resolvers/zod";  // Importamos el resolver para conectar Zod con React Hook Form
import { LoginSchema, loginSchema } from "../../schemas/login.schema";  // Importamos el esquema de validación para login (Zod)
import imagelogo from "../../assets/img/imagelogo.png";  // Importamos la imagen del logo
import imageletter from "../../assets/img/imageletter.png";  // Importamos la imagen con el texto del logo
import './LoginForm.css';  // Importamos los estilos CSS específicos del formulario

// Definición de la interfaz para los props del componente InputField
interface InputProps {
    id: keyof LoginSchema; // Asegura que solo se usen las claves definidas en el esquema LoginSchema
    label: string;  // Texto que se muestra en la etiqueta del input
    type: string;  // Tipo de input (e.g., "email", "password")
    placeholder: string;  // Texto que aparece en el input antes de que el usuario lo rellene
    register: UseFormRegister<LoginSchema>; // Función de registro del formulario, con el tipo específico del esquema de validación
    error?: string;  // Mensaje de error opcional para mostrar en caso de que haya un error de validación
}

// Componente InputField: se encarga de renderizar los campos del formulario
const InputField: React.FC<InputProps> = ({ id, label, type, placeholder, register, error }) => (
    <div className="space-y-1">
        {/* Etiqueta del input */}
        <label htmlFor={id} className="text-dark">{label}</label>
        
        {/* Campo de input */}
        <input
            type={type}  // Tipo de campo (email, password, etc.)
            id={id}  // ID para el campo, usado para la etiqueta 'htmlFor'
            placeholder={placeholder}  // Placeholder del campo
            {...register(id)}  // Registramos el campo con el hook de React Hook Form para validación y manejo
            className="w-full p-3 border border-brandGrey rounded-full focus:outline-none focus:ring-2 focus:ring-brandYellow text-sm placeholder-gray-600"  // Estilos del input
        />
        
        {/* Si hay un error, mostramos el mensaje */}
        {error && <span className="text-tertiary text-sm">{error}</span>}
    </div>
);

// Componente principal del formulario de login
const Login: React.FC = () => {
    // Configuración del formulario usando React Hook Form
    const {
        register,  // Función que nos permite conectar nuestros inputs con React Hook Form
        handleSubmit,  // Función que maneja la sumisión del formulario
        formState: { errors, isSubmitting },  // Estado del formulario (errores y si está enviando)
    } = useForm<LoginSchema>({  // Usamos el esquema LoginSchema para la validación
        resolver: zodResolver(loginSchema),  // Usamos Zod como el resolver para validación de esquemas
    });

    // Función que maneja la sumisión del formulario
    const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
        // Simulamos la acción de iniciar sesión con los datos recibidos
        console.log("Iniciando sesión con:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center font-sans p-4">
            <div className="w-full max-w-md">
                {/* Logo e introducción */}
                <div className="flex flex-col items-center mb-6">
                    <img className="logo" src={imagelogo} alt="Logo de Wander" />  {/* Logo de la aplicación */}
                    <img className="text-logo" src={imageletter} alt="Texto Wander" />  {/* Texto con nombre de la app */}
                    <p className="text-dark text-base font-bold text-center mb-2">
                        Explora nuevas aventuras  {/* Slogan de la aplicación */}
                    </p>
                </div>

                {/* Formulario de inicio de sesión */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Campo de correo electrónico */}
                    <InputField
                        id="email"  // Identificador del campo
                        label="Correo electrónico"  // Etiqueta del campo
                        type="email"  // Tipo de campo
                        placeholder="Introduce tu correo electrónico"  // Placeholder del campo
                        register={register}  // Conexión con React Hook Form
                        error={errors.email?.message}  // Error relacionado con el campo 'email'
                    />
                    
                    {/* Campo de contraseña */}
                    <InputField
                        id="password"  // Identificador del campo
                        label="Contraseña"  // Etiqueta del campo
                        type="password"  // Tipo de campo (contraseña oculta)
                        placeholder="Introduce tu contraseña"  // Placeholder del campo
                        register={register}  // Conexión con React Hook Form
                        error={errors.password?.message}  // Error relacionado con el campo 'password'
                    />
                    
                    {/* Enlace para recuperar la contraseña */}
                    <div className="text-right">
                        <a href="/reset-password" className="text-sm text-gray-500 hover:text-gray-700">
                            ¿Olvidaste tu contraseña?  {/* Texto para redirigir al usuario a la página de recuperación */}
                        </a>
                    </div>
                    
                    {/* Botón de envío del formulario */}
                    <button
                        type="submit"
                        className="w-52 py-4 text-white bg-brandYellow rounded-3xl hover:opacity-90 disabled:opacity-50 mx-auto block"  // Estilos del botón
                        disabled={isSubmitting}  // Deshabilitamos el botón mientras se está enviando el formulario
                    >
                        {isSubmitting ? "Iniciando sesión..." : "Inicia sesión"}  {/* Texto del botón dependiendo del estado de envío */}
                    </button>
                </form>

                {/* Enlace para registrar una nueva cuenta */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    ¿Aún no tienes cuenta?{" "}
                    <a href="/register" className="text-brandYellow hover:text-secondary">
                        Regístrate  {/* Enlace para redirigir al usuario a la página de registro */}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;  // Exportamos el componente Login para poder usarlo en otras partes de la aplicación
