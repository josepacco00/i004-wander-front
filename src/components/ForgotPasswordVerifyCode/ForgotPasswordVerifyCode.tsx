import React, { useState, useEffect } from "react";
import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para redirigir

const ForgotPasswordVerifyCode: React.FC = () => {
    const [timer, setTimer] = useState(60); // Temporizador para reenvío de código
    const [resendEnabled, setResendEnabled] = useState(false); // Estado para habilitar el botón de reenvío
    const [verificationSuccess, setVerificationSuccess] = useState(false); // Estado para manejar el éxito de la verificación
    const [code, setCode] = useState(""); // Para almacenar el código ingresado
    const [errorMessage, setErrorMessage] = useState(""); // Para manejar el mensaje de error
    const navigate = useNavigate(); // Usamos el hook useNavigate para redirigir

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!code) {
            setErrorMessage("Por favor, ingresa el código de verificación."); // Si el campo está vacío
            return;
        }

        if (code.length !== 6) {
            setErrorMessage("El código debe ser de exactamente 6 dígitos.");
            return;
        }

        console.log("Código enviado para verificación");

        // Aquí puedes agregar la lógica para verificar el código
        // Si la verificación es exitosa, redirigir al cambio de contraseña
        setVerificationSuccess(true); // Simula que la verificación fue exitosa

        // Redirigir al formulario de cambio de contraseña
        setTimeout(() => {
            navigate("/change-password");
        }, 1000); // Redirige después de 1 segundo
    };

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Solo permite números y limita la longitud a 6 caracteres
        if (/^\d*$/.test(value) && value.length <= 6) {
            setCode(value); // Actualiza el código solo si es válido
        }
    };

    console.log(verificationSuccess);

    return (
        <AuthLayout showText={false}>
            <div className="text-center">
                <p className="mb-4 text-sm text-gray-700">
                    Ingresa el código de verificación enviado<br />
                    al correo <span className="font-semibold text-dark">correo@gmail.com</span>
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
                            onChange={handleCodeChange} // Controla la entrada para asegurarse de que solo se ingresen números y con longitud máxima de 6
                            maxLength={6} // Limita el input a 6 caracteres
                            inputMode="numeric" // Sugerir teclado numérico en dispositivos móviles
                            className="w-full px-6 py-3 mt-2 text-left border-2 rounded-full text-dark"
                        />
                    </div>

                    {/* Mostrar el mensaje de error debajo del input */}
                    {errorMessage && (
                        <p className="mt-2 ml-2 text-sm text-left text-red-500">
                            {errorMessage}
                        </p>
                    )}

                    {/* Contenedor de "¿No recibiste el código?" con cuenta regresiva */}
                    <div className="resend-container">
                        <span className="resend-text">¿No recibiste el código?</span>
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={!resendEnabled}
                            className="resend-button"
                        >
                            Reenviar ({timer === 60 ? "1:00" : `(${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")})`})
                        </button>
                    </div>

                    {/* Barra de progreso naranja (debajo de la pregunta y botón) */}
                    <div
                        className={`progress-bar ${timer !== 60 ? "progress-bar-filled" : ""}`}
                        style={{
                            width: `${(60 - timer) * 100 / 60}%`, // La barra se llena conforme pasa el tiempo
                        }}
                    ></div>

                    {/* Botón de Verificar Código */}
                    <button
                        type="submit"
                        className="w-[250px] bg-primary hover:bg-tertiary text-white font-semibold py-5 rounded-xll shadow-[0px_4px_10px_rgba(0,0,0,0.4)] transition disabled:bg-brandGrey disabled:cursor-not-allowed"
                    >
                        Verificar Código
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordVerifyCode;
