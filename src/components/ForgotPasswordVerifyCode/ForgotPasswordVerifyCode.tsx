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
    const [errorResend, setErrorResend] = useState<string | null>(null);  // Error para reenviar el código
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
        if (timer === 0) {
            try {
                const apiUrl = "http://localhost:5005/api/recovery/forgot-password";
                const response = await axios.post(apiUrl, { email });

                if (response.status === 200) {
                    setTimer(60);
                    setResendEnabled(false);
                    setErrorResend(null);
                    console.log("Código reenviado con éxito");
                }
            } catch (error: any) {
                console.error("Error al reenviar el código:", error);
                setErrorResend("Hubo un error al reenviar el código. Intenta nuevamente.");
            }
        }
    };

    const validatePassword = (password: string) => {
        // const lengthValid = password.length >= 8 && password.length <= 12;
        const lowerCaseValid = /[a-z]/.test(password);
        const upperCaseValid = /[A-Z]/.test(password);
        const numberValid = /\d/.test(password);
        const specialCharValid = /[@#!]/.test(password);

        let errorMessage = "";
        if (password.length > 12) {
            errorMessage = "La contraseña no puede ser mayor de 12 caracteres.";
        } else if (password.length < 8) {
            errorMessage = "La contraseña debe tener al menos 8 caracteres.";
        } else if (!lowerCaseValid || !upperCaseValid || !numberValid || !specialCharValid) {
            errorMessage = "Debe contener una minúscula, una mayúscula, un número y un carácter especial (@, #, !).";
        }
        return errorMessage;
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

            const apiUrl = "http://localhost:5005/api/recovery/reset-password";

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
                        {codeError && <p className="mt-1 text-xs text-red-500">{codeError}</p>}
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
                        {passwordError && <p className="mt-1 text-xs text-red-500">{passwordError}</p>}
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
                        {confirmPasswordError && <p className="mt-1 text-xs text-red-500">{confirmPasswordError}</p>}
                    </div>

                    {/* Mensaje para reenviar código */}
                    <div className="mt-6 text-sm">
                        <p className="text-gray-700">¿No recibiste el codigo?</p>
                        <button
                            onClick={handleResend}
                            disabled={!resendEnabled}
                            className={`mt-2 px-6 py-3 rounded-full text-white ${resendEnabled ? "bg-secondary" : "bg-gray-400 cursor-not-allowed"}`}
                        >
                            {resendEnabled ? "Reenviar código" : `Reenviar en ${timer}s`}
                        </button>
                        {errorResend && <p className="mt-1 text-xs text-red-500">{errorResend}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 mt-6 text-white bg-brandYellow rounded-3xl"
                    >
                        {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
                    </button>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-[2rem] p-8 w-80 shadow-lg">
                        <div className="flex flex-col items-center space-y-8">
                            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-brandYellow">
                                <svg
                                    className="text-white w-14 h-14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-center">¡Contraseña cambiada con éxito!</h2>
                            <button
                                onClick={() => navigate("/login")}
                                className="w-[200px] py-6 text-white bg-brandYellow rounded-3xl"
                            >
                                Ir a Iniciar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default ForgotPasswordVerifyCode;
