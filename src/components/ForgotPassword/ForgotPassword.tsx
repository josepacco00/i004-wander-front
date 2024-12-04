import React, { useState } from "react";
import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importamos axios para hacer solicitudes HTTP

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Para el mensaje de error
    const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

    // Maneja el cambio en el input del correo
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setErrorMessage(""); // Limpiamos el mensaje de error cuando el usuario cambia el correo
    };

    // Maneja el envío del formulario
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Validación del correo electrónico
        if (!email) {
            setErrorMessage("Por favor, ingresa un correo electrónico.");
            return;
        }
    
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Por favor, ingresa un correo electrónico válido.");
            return;
        }
    
        try {
            // Guardar el correo en el localStorage
            localStorage.setItem("userEmail", email);
    
            // Usamos la variable de entorno VITE_API_URL para construir la URL de la API
            const apiUrl = `${import.meta.env.VITE_API_URL}/recovery/forgot-password`;
    
            // Realizamos la solicitud POST para enviar el correo de recuperación
            const response = await axios.post(apiUrl, {
                email: email,
            });
    
            if (response.data.message === "Password recovery request sent successfully.") {
                setIsSuccess(true); // Marca como exitoso el envío del código
                setTimeout(() => {
                    navigate("/forgot-password-verify-code"); // Redirige a la página de verificación de código
                }, 1000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data) {
                    setErrorMessage(error.response.data.message || "Error en el servidor");
                } else {
                    setErrorMessage("Error desconocido");
                }
            }
        }
    };    

    return (
        <AuthLayout showText={false}>
            <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-dark">
                    <span>Recupera</span> <br />
                    <span>tu Contraseña</span>
                </h2>
                <p className="mb-4 text-sm text-gray-700">
                    Ingresa tu correo electrónico para recibir el código de recuperación de la contraseña.
                </p>

                {/* Formulario para enviar correo */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-6"
                >
                    <div className="w-full">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-left text-dark"
                        >
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="correo@ejemplo.com"
                            className="w-full px-6 py-3 mt-2 text-left border-2 rounded-full text-dark"
                        />
                    </div>

                    {/* Mostrar el mensaje de error debajo del input */}
                    {errorMessage && (
                        <p className="mt-2 ml-2 text-sm text-left text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    {/* Botón para enviar código */}
                    <button
                        type="submit"
                        className="w-[250px] bg-primary hover:bg-tertiary text-white font-semibold py-5 rounded-xll shadow-[0px_4px_10px_rgba(0,0,0,0.4)] transition disabled:bg-brandGrey disabled:cursor-not-allowed"
                    >
                        {isSuccess ? "Código enviado" : "Enviar código"}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
