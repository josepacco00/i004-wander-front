import React, { useState, useEffect } from "react";
import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom"; // Para redirección
import './ChangePassword.css';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal de éxito
  const [password, setPassword] = useState(""); // Para manejar la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Para manejar la confirmación de la contraseña
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para manejar el error de validación

  const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de envío
  const [isPasswordValid, setIsPasswordValid] = useState(false); // Para manejar si la contraseña es válida
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(false); // Para verificar que las contraseñas coincidan

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

  // Función para manejar el cambio de la contraseña
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

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 text-dark mb-4">Cambiar Contraseña</h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-dark text-left">
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value); // Validamos la contraseña mientras se escribe
              }}
              className={`mt-2 w-full px-6 py-3 border-2 rounded-full text-dark text-left ${errorMessage ? "border-red-500" : ""}`}
            />

            {/* Mostrar error de menos de 8 caracteres si la contraseña es menor a 8 */}
            {password && password.length < 8 && (
              <p className="text-xs text-red-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
            )}

            {/* Mostrar los requisitos adicionales cuando la contraseña tenga al menos 8 caracteres */}
            {password.length >= 8 && (
              <p className="text-xs text-red-500 mt-1">
                La contraseña debe contener al menos una minúscula, una mayúscula, un número y uno de los siguientes caracteres (@, #, or !)
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark text-left">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-2 w-full px-6 py-3 border-2 rounded-full text-dark text-left ${errorMessage ? "border-red-500" : ""}`}
            />
            {errorMessage && <div className="form__notification form__notification--error">{errorMessage}</div>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isPasswordValid || !isPasswordsMatch}
            className="w-[250px] bg-primary hover:bg-tertiary text-white font-semibold py-5 rounded-xll shadow-[0px_4px_10px_rgba(0,0,0,0.4)] transition disabled:bg-brandGrey disabled:cursor-not-allowed"
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
              <h2 className="text-2xl font-bold text-center text-dark">¡Contraseña cambiada correctamente!</h2>
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

export default ChangePassword;
