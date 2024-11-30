import React, { useState, useEffect } from "react";
import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom"; // Para redirección
import './ConfirmRegister.css';
import authServices from "../../services/auth.services";
import { AxiosError } from "axios";

const ConfirmRegister = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal de éxito
  const [code, setCode] = useState(""); // Guardar el código ingresado
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para manejar el error de validación
  const [tempEmail, setTempEmail] = useState<string>("")

  useEffect(() => {
    const email = localStorage.getItem("tempEmail")
    email ? setTempEmail(email) : navigate("/")

    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer); // Limpiar intervalo
    } else {
      setResendEnabled(true); // Habilitar el botón de reenviar cuando los 60 segundos se hayan agotado
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(60); // Resetear cuenta regresiva
    setResendEnabled(false); // Deshabilitar el botón hasta pasar otros 60 segundos
    // Lógica para reenviar el código
    console.log("Código reenviado.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar que el código no esté vacío
    if (code.trim() === "") {
      setErrorMessage("Por favor, ingresa el código de verificación.");
      return;
    }

    try {
      const res = await authServices.confirmAccount({ email: tempEmail, verificationCode: code })
      console.log(res)
      localStorage.removeItem("tempEmail")
      setShowModal(true); // Si el código es válido, mostramos el modal de éxito
    } catch (error) {
      if(error instanceof AxiosError) {
        console.log(error)
        if(error.response?.data.details) {
          setErrorMessage(error.response?.data.details.message)
        } else {
          setErrorMessage(error.response?.data.message)
        }
      } else {
        console.log(error)
      }

      setTimeout(() => setErrorMessage(null), 5000)
    }

    // Aquí puedes manejar la verificación del código
    // console.log("Código enviado para verificación:", code);

    // setErrorMessage(null); // Limpiar error si es correcto
  };

  // Función para manejar la entrada del código
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Permitir solo números y limitar a 6 caracteres
    if (/^[0-9]{0,6}$/.test(input)) {
      setCode(input);

      // Limpiar el mensaje de error mientras escribe
      if (input.trim() !== "") {
        setErrorMessage(null);
      }
    }
  };

  // Función para redirigir a la página de login
  const handleLoginRedirect = () => {
    navigate("/login"); // Redirigir al login
  };

  return (
    <AuthLayout showText={false}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-dark mb-4">Confirma tu cuenta</h2>
        <p className="text-sm text-gray-700 mb-6">
          Ingresa el código de verificación enviado<br />
          al correo <span className="font-semibold text-dark">{tempEmail}</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6"
        >
          <div className="w-full">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-dark text-left"
            >
              Código
            </label>
            <input
              id="code"
              type="text"
              placeholder="123456"
              value={code}
              onChange={handleCodeChange} // Llamar a la función de cambio
              className={`mt-2 w-full px-6 py-3 border-2 rounded-full text-dark text-left ${
                errorMessage ? "border-red-500" : ""
                }`} // Mostrar borde rojo si hay error
              maxLength={6} // Limitar a 6 caracteres
              pattern="[0-9]*" // Asegurar que solo se ingresen números
            />
            {/* Notificación de error */}
            {errorMessage && (
              <div className="form__notification form__notification--error">
                {errorMessage}
              </div>
            )}
          </div>

          {/* Contenedor de "¿No recibiste el código?" con cuenta regresiva */}
          <div className="resend-container">
            <span className="resend-text">¿No recibiste el código?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={!resendEnabled}
              className={`resend-button`}
            >
              Reenviar ({timeLeft === 60 ? "1:00" : `(${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")})`})
            </button>
          </div>

          {/* Barra de progreso naranja (debajo de la pregunta y botón) */}
          <div
            className={`progress-bar ${timeLeft !== 60 ? "progress-bar-filled" : ""}`}
            style={{
              width: `${(60 - timeLeft) * 100 / 60}%`, // La barra se llena conforme pasa el tiempo
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

        {/* Notificación de éxito */}
        {showModal && (
          <div className="form__notification form__notification--success">
            ¡Cuenta confirmada con éxito!
          </div>
        )}
      </div>

      {/* Modal de éxito al restablecer la cuenta */}
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
              <h2 className="text-2xl font-bold text-center">¡Cuenta confirmada con éxito!</h2>
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

export default ConfirmRegister;
