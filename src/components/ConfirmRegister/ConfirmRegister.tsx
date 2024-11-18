// Importación de librerías necesarias
import React, { useState } from "react";  // Importamos React y useState para manejar el estado local
import imagelogo from "../../assets/img/imagelogo.png";  // Logo de la aplicación
import imageletter from "../../assets/img/imageletter.png";  // Texto del logo
import './ConfirmRegister.css';  // Estilos específicos del componente de confirmación de registro

// Componente ConfirmRegister para la verificación de cuenta
const ConfirmRegister: React.FC = () => {
    // Estado que maneja el temporizador para reenviar el código
    const [timer, setTimer] = useState(60); // Inicializa el temporizador en 60 segundos

    // Efecto que ejecuta la cuenta regresiva para el reenvío del código
    React.useEffect(() => {
        // Crea un intervalo que decrementa el temporizador cada segundo
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0)); // Si el timer es mayor que 0, decrementa, si es 0 lo mantiene en 0
        }, 1000);

        // Limpia el intervalo cuando el componente se desmonte o el temporizador termine
        return () => clearInterval(interval);
    }, []);  // El arreglo vacío [] asegura que el efecto solo se ejecute una vez al montar el componente

    // Función que maneja el reenvío del código cuando el temporizador llega a 0
    const handleResend = () => {
        if (timer === 0) {
            // Si el temporizador llegó a 0, reenviamos el código
            console.log("Código reenviado");
            setTimer(60);  // Reinicia el temporizador a 60 segundos
        }
    };

    // Función que maneja el envío del formulario y la verificación del código
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  // Prevenimos el comportamiento por defecto del formulario (recarga de página)
        // Aquí se podría agregar la lógica de verificación del código ingresado
        console.log("Código verificado");
    };

    return (
        <div className="flex min-h-screen items-center justify-center font-sans p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg">
                {/* Logo de la aplicación */}
                <div className="flex flex-col items-center mb-6">
                    <img className="logo" src={imagelogo} alt="Logo Wander" />  {/* Logo principal */}
                    <img className="text-logo" src={imageletter} alt="Texto Wander" />  {/* Texto del logo */}
                </div>

                {/* Título principal */}
                <h1 className="text-dark text-2xl font-extrabold text-center mb-6">
                    Confirma tu cuenta  {/* Título que indica que el usuario debe confirmar su cuenta */}
                </h1>

                {/* Instrucciones para el usuario */}
                <p className="text-gray-600 text-center text-sm mb-6 leading-6">
                    Ingresa el código de verificación enviado al correo <span className="font-bold">correo@gmail.com</span>  {/* Mensaje con el correo al que se envió el código */}
                </p>

                {/* Formulario para ingresar el código de verificación */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="code" className="sr-only">Código</label>  {/* Etiqueta para el campo de código */}
                        <input
                            type="text"
                            id="code"  // ID único para el campo, asociado a la etiqueta
                            placeholder="123456"  // Placeholder para el campo de código
                            inputMode="numeric"  // Asegura que el teclado numérico se muestre en dispositivos móviles
                            pattern="[0-9]*"  // Solo permite la entrada de números
                            maxLength={6}  // Limita la longitud máxima del código a 6 caracteres
                            className="w-full p-3 border border-brandGrey rounded-full focus:outline-none focus:ring-2 focus:ring-brandYellow text-sm placeholder-gray-600"
                        />
                    </div>

                    {/* Sección para reenviar el código, visible si el temporizador ha terminado */}
                    <div className="text-center text-sm">
                        ¿No recibiste el código?{" "}
                        <button
                            type="button"  // Este botón no envía el formulario, solo ejecuta una acción
                            onClick={handleResend}  // Ejecuta la función de reenvío del código
                            disabled={timer > 0}  // Desactiva el botón si el temporizador no ha terminado
                            className={`font-bold ${timer === 0 ? "text-brandYellow hover:text-secondary" : "text-gray-400"}`}
                        >
                            Reenviar  {/* Texto del botón para reenviar el código */}
                        </button>{" "}
                        <span className="text-gray-500">
                            {/* Muestra el temporizador en formato 0:00 */}
                            {timer > 0 ? `0:${timer.toString().padStart(2, "0")}` : ""}
                        </span>
                    </div>

                    {/* Botón para enviar el formulario */}
                    <button
                        type="submit"
                        className="w-60 py-4 text-white bg-brandYellow rounded-3xl hover:opacity-90 disabled:opacity-50 mx-auto block"
                    >
                        Verificar Código  {/* Texto del botón que indica la acción al enviarlo */}
                    </button>
                </form>
            </div>
        </div>
    );
};

// Exportamos el componente para su uso en otras partes de la aplicación
export default ConfirmRegister;
