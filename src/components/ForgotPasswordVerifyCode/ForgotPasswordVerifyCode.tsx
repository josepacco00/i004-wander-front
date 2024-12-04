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
    const [codeError, setCodeError] = useState<string | null>(null); // Error del código
    const [passwordError, setPasswordError] = useState<string | null>(null); // Error de contraseña
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null); // Error de confirmación
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
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

    const handleResend = () => {
        if (timer === 0) {
            console.log("Código reenviado");
            setTimer(60);
            setResendEnabled(false);
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
            
            // Manejar el error basado en el mensaje de la API
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
            setCodeError(null); // Limpiar error al editar
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(null); // Limpiar error al editar
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError(null); // Limpiar error al editar
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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 text-white bg-orange-500 rounded-3xl mt-6"
                    >
                        {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
                    </button>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-3xl p-8 w-96 shadow-lg text-center">
                        <h2 className="text-2xl font-semibold text-dark">¡Contraseña cambiada correctamente!</h2>
                        <p className="text-sm text-gray-500">Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar sesión.</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-4 py-3 px-8 bg-brandYellow text-white rounded-full shadow-md hover:bg-secondary transition duration-200"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default ForgotPasswordVerifyCode;
