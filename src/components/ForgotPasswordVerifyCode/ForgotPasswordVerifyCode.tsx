import React, { useState, useEffect } from "react";
import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordVerifyCode: React.FC = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(60);
    const [resendEnabled, setResendEnabled] = useState(false);
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [codeError, setCodeError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para los mensajes de error
    const [resendAttempts, setResendAttempts] = useState(0); // Contador de intentos de reenvío

    const email = localStorage.getItem("userEmail");

    if (!email) {
        navigate("/forgot-password");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        if (timer === 0) {
            setResendEnabled(true);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = async () => {
        if (timer === 0 && resendAttempts < 3) {
            try {
                setResendEnabled(false);
                setTimer(60); // Reinicia el temporizador
                setResendAttempts((prev) => prev + 1); // Incrementa el contador de intentos
                console.log("Reenviando código...");
    
                // Llamada a la API para reenviar el código
                const apiUrl = `${import.meta.env.VITE_API_URL}/recovery/forgot-password`; // URL de la API
    
                const response = await axios.post(apiUrl, { email });
    
                // Verifica la respuesta completa de la API
                console.log("Respuesta de la API:", response);
    
                if (response.status === 200) {
                    console.log("Código reenviado exitosamente");
                    setErrorMessage(null); // Limpiar cualquier error anterior
    
                    // Aquí verificamos si la respuesta contiene un nuevo código
                    if (response.data.newCode) {
                        console.log("Nuevo código recibido:", response.data.newCode);
                        setCode(response.data.newCode); // Actualizamos el estado con el nuevo código
                    } else {
                        console.log("No se recibió un nuevo código, usando el actual.");
                    }
                } else {
                    setErrorMessage("Hubo un problema al reenviar el código. Inténtalo de nuevo.");
                }
            } catch (error) {
                console.error("Error al intentar reenviar el código:", error);
                setErrorMessage("No se pudo reenviar el código. Por favor, intenta más tarde.");
            }
        } else if (resendAttempts >= 3) {
            setErrorMessage("Has alcanzado el límite de intentos. Intenta más tarde.");
        }
    };
    

    const validatePassword = (password: string) => {
        const lengthValid = password.length >= 8;
        const lowerCaseValid = /[a-z]/.test(password);
        const upperCaseValid = /[A-Z]/.test(password);
        const numberValid = /\d/.test(password);
        const specialCharValid = /[@#!]/.test(password);

        if (!lengthValid) return "Debe tener al menos 8 caracteres.";
        if (!lowerCaseValid || !upperCaseValid || !numberValid || !specialCharValid) {
            return "Debe contener una minúscula, una mayúscula, un número y un carácter especial (@, #, !).";
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const passwordValidation = validatePassword(password);
        if (passwordValidation) {
            setPasswordError(passwordValidation);
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setIsSubmitting(true);

            const apiUrl = `${import.meta.env.VITE_API_URL}/recovery/reset-password`;

            const response = await axios.post(apiUrl, {
                email,
                code,
                newPassword: password,
            });

            if (response.status === 200) {
                setShowModal(true);
                setCodeError(null);
                setPasswordError(null);
                setConfirmPasswordError(null);
            } else {
                setCodeError("El código ingresado no es válido. Por favor, verifica e inténtalo nuevamente.");
            }
        } catch (error: any) {
            console.error("Error al hacer la solicitud:", error);

            if (error.response && error.response.data) {
                const { message } = error.response.data;

                if (message.includes("invalid code")) {
                    setCodeError("El código ingresado no es válido. Por favor, verifica e inténtalo nuevamente.");
                } else {
                    setCodeError("Hubo un error al cambiar la contraseña. Intenta de nuevo.");
                }
            } else {
                setCodeError("Hubo un error inesperado. Por favor, inténtalo más tarde.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setCode(value);
            setCodeError(null);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(null);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(null);
    };

    return (
        <AuthLayout showText={false} showBackButton={false}>
            <div className="text-center">
                <p className="mb-4 text-sm text-gray-700">
                    Ingresa el código de verificación enviado<br />
                    al correo <span className="font-semibold text-dark">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
                    <div className="w-full">
                        <label htmlFor="code" className="block text-sm font-medium text-left text-dark">
                            Código
                        </label>
                        <input
                            id="code"
                            type="text"
                            placeholder="123456"
                            value={code}
                            onChange={handleCodeChange}
                            maxLength={6}
                            inputMode="numeric"
                            className={`w-full px-6 py-3 mt-2 text-left border-2 rounded-full text-dark ${codeError ? "border-red-500" : ""}`}
                        />
                        {codeError && <p className="text-xs text-red-500 mt-1">{codeError}</p>}
                    </div>

                    <div className="w-full">
                        <label htmlFor="password" className="block text-sm font-medium text-left text-dark">
                            Nueva contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Escribe tu nueva contraseña"
                            value={password}
                            onChange={handlePasswordChange}
                            className={`w-full px-6 py-3 mt-2 text-left border-2 rounded-full text-dark ${passwordError ? "border-red-500" : ""}`}
                        />
                        {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
                    </div>

                    <div className="w-full">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-left text-dark">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Repite tu nueva contraseña"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={`w-full px-6 py-3 mt-2 text-left border-2 rounded-full text-dark ${confirmPasswordError ? "border-red-500" : ""}`}
                        />
                        {confirmPasswordError && <p className="text-xs text-red-500 mt-1">{confirmPasswordError}</p>}
                    </div>

                    {/* Botón para reenviar el código */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-dark font-semibold">
                            ¿No recibiste el código?{" "}
                            <button
                                onClick={handleResend}
                                disabled={!resendEnabled || resendAttempts >= 3}
                                className={`text-brandYellow font-semibold ml-2 ${!resendEnabled || resendAttempts >= 3 ? "opacity-50 cursor-not-allowed" : "hover:text-yellow-600"}`}
                                style={{ backgroundColor: "transparent", border: "none", padding: 0 }}
                            >
                                Reenviar
                            </button>
                        </p>

                        {/* Contador de tiempo restante */}
                        <p className="text-sm text-dark mt-2">
                            Tiempo restante: {timer}s
                        </p>

                        {/* Barra de progreso del temporizador */}
                        <div className="w-48 h-2 mt-3 bg-gray-300 rounded-full mx-auto">
                            <div
                                className="h-2 rounded-full"
                                style={{
                                    width: `${(timer / 60) * 100}%`,  // Ancho de la barra basado en el tiempo restante
                                    backgroundColor: timer > 0 ? "#FFA500" : "#4CAF50",  // Amarillo cuando cuenta, verde al terminar
                                }}
                            />
                        </div>

                        {errorMessage && <p className="text-sm text-red-500 mt-3">{errorMessage}</p>}
                    </div>

                    <div className="flex justify-center w-full">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 mt-6 text-white bg-brandYellow rounded-full disabled:bg-gray-400"
                        >
                            {isSubmitting ? "Cargando..." : "Confirmar"}
                        </button>
                    </div>
                </form>
                {showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-dark">Contraseña cambiada con éxito</h3>
                            <button
                                onClick={() => navigate("/login")}
                                className="mt-4 px-6 py-2 bg-dark text-white rounded-full"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordVerifyCode;
