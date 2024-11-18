import React, { useState } from "react";
import imagelogo from "../../assets/img/imagelogo.png";
import imageletter from "../../assets/img/imageletter.png";
import './ConfirmRegister.css';

const ConfirmRegister: React.FC = () => {
    const [timer, setTimer] = useState(60); // Temporizador para reenvío de código
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para mostrar el modal de éxito

    // Inicia el temporizador y lo decrementa cada segundo
    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, []);

    // Función para reenviar el código cuando el temporizador llega a cero
    const handleResend = () => {
        if (timer === 0) {
            console.log("Código reenviado");
            setTimer(60); // Reinicia el temporizador
        }
    };

    // Maneja el envío del formulario y muestra el modal de éxito
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowSuccessModal(true);
    };

    return (
        <div className="flex min-h-screen items-center justify-center font-sans p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg relative">
                {/* Logo e introducción */}
                <div className="flex flex-col items-center mb-6">
                    <img className="logo" src={imagelogo} alt="Logo Wander" />
                    <img className="text-logo" src={imageletter} alt="Texto Wander" />
                </div>

                <h1 className="text-dark text-2xl font-extrabold text-center mb-6">
                    Confirma tu cuenta
                </h1>

                <p className="text-gray-600 text-center text-sm mb-6 leading-6">
                    Ingresa el código de verificación enviado al correo <span className="font-bold">correo@gmail.com</span>
                </p>

                {/* Formulario de verificación */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="code" className="sr-only">Código</label>
                        <input
                            type="text"
                            id="code"
                            placeholder="123456"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6}
                            className="w-full p-3 border border-brandGrey rounded-full focus:outline-none focus:ring-2 focus:ring-brandYellow text-sm placeholder-gray-600"
                        />
                    </div>

                    {/* Reenvío del código */}
                    <div className="text-center text-sm">
                        ¿No recibiste el código?{" "}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={timer > 0}
                            className={`font-bold ${timer === 0 ? "text-brandYellow hover:text-secondary" : "text-gray-400"}`}
                        >
                            Reenviar
                        </button>{" "}
                        <span className="text-gray-500">
                            {timer > 0 ? `0:${timer.toString().padStart(2, "0")}` : ""}
                        </span>
                    </div>

                    {/* Botón para verificar el código */}
                    <button
                        type="submit"
                        className="w-60 py-4 text-white bg-brandYellow rounded-3xl hover:opacity-90 disabled:opacity-50 mx-auto block"
                    >
                        Verificar Código
                    </button>
                </form>

                {/* Modal de éxito al completar la verificación */}
                {showSuccessModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-[2rem] p-8 w-80 shadow-lg">
                            <div className="flex flex-col items-center space-y-8">
                                {/* Icono de éxito */}
                                <div className="w-24 h-24 rounded-full bg-brandYellow flex items-center justify-center">
                                    <svg 
                                        className="w-14 h-14 text-white" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="3"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>

                                <h2 className="text-2xl font-bold text-center">
                                    ¡Registrado correctamente!
                                </h2>

                                {/* Botón para iniciar sesión */}
                                <button
                                    onClick={() => {
                                        console.log("Navegando al inicio de sesión");
                                    }}
                                    className="w-full py-4 text-white bg-brandYellow rounded-full hover:opacity-90 transition-colors"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmRegister;
