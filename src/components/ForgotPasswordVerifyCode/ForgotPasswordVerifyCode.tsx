import React, { useState, useEffect } from "react";
import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom"; // Para redirección

const ForgotPasswordVerifyCode: React.FC = () => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(60); // Temporizador para reenvío de código
    const [resendEnabled, setResendEnabled] = useState(false); // Estado para habilitar el botón de reenvío
    const [code, setCode] = useState(""); // Para almacenar el código ingresado
    const [password, setPassword] = useState(""); // Nueva contraseña
    const [confirmPassword, setConfirmPassword] = useState(""); // Confirmar contraseña
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para manejar el error de validación
    const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de envío
    const [isPasswordValid, setIsPasswordValid] = useState(false); // Para manejar si la contraseña es válida
    const [isPasswordsMatch, setIsPasswordsMatch] = useState(false); // Para verificar que las contraseñas coincidan
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal de éxito
    const [passwordTouched, setPasswordTouched] = useState(false); // Para saber si el usuario ya tocó el campo de la contraseña

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        if (timer === 0) {
            setResendEnabled(true); // Habilitar el botón de reenvío cuando el tiempo se haya agotado
        }

        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = () => {
        if (timer === 0) {
            console.log("Código reenviado");
            setTimer(60);
            setResendEnabled(false); // Deshabilitar el botón de reenvío hasta que pasen otros 60 segundos
        }
    };

    // Validación de la contraseña (mínimo 8 caracteres, una mayúscula, un número y un carácter especial)
    const validatePassword = (password: string) => {
        const lengthValid = password.length >= 8;
        const lowerCaseValid = /[a-z]/.test(password);
        const upperCaseValid = /[A-Z]/.test(password);
        const numberValid = /\d/.test(password);
        const specialCharValid = /[@#!]/.test(password);

        setIsPasswordValid(lengthValid && lowerCaseValid && upperCaseValid && numberValid && specialCharValid);
    };

    // Verificamos que las contraseñas coincidan
    useEffect(() => {
        setIsPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isPasswordValid || !isPasswordsMatch) {
            setErrorMessage("Las contraseñas no son válidas o no coinciden.");
            return;
        }

        try {
            setIsSubmitting(true);

            // Simulamos la lógica de cambio de contraseña
            console.log("Contraseña cambiada con éxito:", password);

            // Si todo va bien, mostramos el modal de éxito
            setShowModal(true);
            setErrorMessage(null); // Limpiar cualquier mensaje de error
        } catch (error) {
            setErrorMessage("Hubo un error al cambiar la contraseña. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Función para redirigir al login
    const handleLoginRedirect = () => {
        navigate("/login");
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Solo permite números y limita la longitud a 6 caracteres
        if (/^\d*$/.test(value) && value.length <= 6) {
            setCode(value); // Actualiza el código solo si es válido
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        validatePassword(e.target.value); // Validamos la contraseña mientras se escribe
        setPasswordTouched(true); // Marcamos que el usuario ya tocó el campo
    };

    return (
        <AuthLayout showText={false} showBackButton={false}>
            <div className="text-center">
                <p className="mb-4 text-sm text-gray-700">
                    Ingresa el código de verificación enviado<br />
                    al correo <span className="font-semibold text-dark">correo@gmail.com</span>
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
                    {/* Código */}
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
                            className="w-full px-6 py-3 mt-2 text-left border-2 rounded-full text-dark"
                        />
                    </div>
                    {errorMessage && (
                        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                    )}

                    {/* Nueva contraseña */}
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
                            className={`w-full px-6 py-3 mt-2 text-left border-2 rounded-full text-dark ${passwordTouched && password.length < 8 ? "border-red-500" : ""}`}
                        />
                        {passwordTouched && password.length < 8 && (
                            <p className="text-xs text-red-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
                        )}
                        {passwordTouched && !isPasswordValid && password.length >= 8 && (
                            <p className="text-xs text-red-500 mt-1">
                                La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de los siguientes caracteres (@, #, or !)
                            </p>
                        )}
                    </div>

                    {/* Confirmar contraseña */}
                    <div className="w-full">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-left text-dark">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Repite tu nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-6 py-3 mt-2 text-left border-2 rounded-full text-dark ${errorMessage ? "border-red-500" : ""}`}
                        />
                    </div>

                    {/* Temporizador y mensaje de reenvío */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-dark font-semibold">
                            ¿No recibiste el código?{" "}
                            <button
                                onClick={handleResend}
                                disabled={!resendEnabled}
                                className={`text-orange-500 font-semibold ml-2 transition-colors ${resendEnabled ? "hover:text-orange-600" : "opacity-50 cursor-not-allowed"}`}
                                style={{
                                    backgroundColor: resendEnabled ? 'transparent' : 'transparent',
                                    border: 'none',
                                    cursor: resendEnabled ? 'pointer' : 'not-allowed',
                                }}
                            >
                                Reenviar
                            </button>
                        </p>
                        <div className="w-48 h-2 mt-3 bg-gray-300 rounded-full mx-auto">
                            <div
                                className="h-2 rounded-full"
                                style={{
                                    width: `${(timer / 60) * 100}%`,
                                    backgroundColor: timer > 0 ? "#FFA500" : "#4CAF50", // Naranja
                                }}
                            />
                        </div>
                        <p className="mt-1 text-sm text-dark">{timer} segundos restantes</p>
                    </div>

                    <button
                        type="submit"
                        disabled={!isPasswordValid || !isPasswordsMatch}
                        className="w-full py-3 text-white bg-orange-500 rounded-3xl mt-6"
                    >
                        {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
                    </button>
                </form>
            </div>

            {/* Modal de éxito */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-[2rem] p-8 w-80 shadow-lg">
                        <div className="flex flex-col items-center space-y-8">
                            <div className="w-24 h-24 rounded-full bg-brandYellow flex items-center justify-center">
                                <svg
                                    className="w-14 h-14 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-center text-dark flex flex-wrap justify-center">
                                ¡Contraseña <span className="block">cambiada correctamente!</span>
                            </h2>
                            <button
                                onClick={handleLoginRedirect} // Redirigir al login
                                className="w-[200px] py-6 text-white bg-brandYellow rounded-3xl"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default ForgotPasswordVerifyCode;
