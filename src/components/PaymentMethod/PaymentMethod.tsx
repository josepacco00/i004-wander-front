import React, { useState, useEffect, useContext } from 'react';
import mastercardLogo from '../../assets/img/mastercard.png';
import visaLogo from '../../assets/img/visa.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context'; // Importamos el contexto de autenticación
import image from "../../assets/img/vacationImage.png"; // Imagen de la experiencia (reemplaza esta con la correcta)
import { ReservationContext } from '../../contexts/reservation.context';

const PaymentMethod: React.FC = () => {
    const { reservation, updateReservationData, removeReservationData } = useContext(ReservationContext)
    const [selectedMethod, setSelectedMethod] = useState<'mastercard' | 'visa' | null>(reservation?.paymentMethod ? reservation.paymentMethod : null);
    const [error, setError] = useState<string>(''); // Estado para el error
    const navigate = useNavigate(); // Hook de React Router para navegación

    // Acceder al contexto para obtener los datos del usuario
    const { user } = useContext(AuthContext); // Extraemos el usuario del contexto

    // Bloquear el scroll al montar el componente
    useEffect(() => {
        // Si el contexto no tiene experiencia, debería navegar a la página de búsqueda de experiencias
        if (!reservation || !user) {
            removeReservationData()
            navigate("/")
        } else {
            // const reservation = localStorage.getItem("reservation")

            // reservation && updateReservationData(JSON.parse(reservation))
        }

        document.body.style.overflow = 'hidden'; // Desactivar scroll
        return () => {
            document.body.style.overflow = 'auto'; // Reactivar scroll al desmontar
        };
    }, []);

    const handlePaymentClick = () => {
        if (!selectedMethod) {
            setError('Por favor, selecciona un método de pago (Visa o MasterCard).');
        } else {
            const updatedData = {
                ...reservation,
                paymentMethod: selectedMethod
            }

            updateReservationData(updatedData)


            localStorage.setItem("reservation", JSON.stringify(updatedData))
            setError(''); // Limpiar el error si se seleccionó un método
        }
    };

    // Función para manejar la flecha de regreso
    const handleGoBack = () => {
        // navigate(-1); // Vuelve a la página anterior
        navigate("/booking")
    };

    return (
        <div className="w-full h-screen flex flex-col items-center p-6 overflow-hidden">
            <div className="w-full max-w-md flex flex-col h-full">

                {/* Nuevo icono de flecha para regresar */}
                <div className="flex items-center mb-8">
                    <button
                        type="button"
                        className="text-2xl flex items-center justify-center bg-transparent hover:bg-transparent border-none"
                        aria-label="Regresar"
                        onClick={handleGoBack} // Llamar a la función para ir hacia atrás
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-black hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <h1 className="text-xl font-bold ml-4">Confirmar y pagar</h1>
                </div>

                {/* Información del usuario */}
                {user && (
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={user.avatar}
                            alt="Avatar"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-black">{user.name}</p>
                            <p className="text-sm text-gray-500">{reservation?.email || user.email}</p>
                        </div>
                    </div>
                )}

                {/* Información de la orden */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                        <img
                            src={image} // Cambiar por una imagen real de las vacaciones
                            alt="Vacaciones"
                            className="w-16 h-16 rounded-lg object-cover" // Tamaño reducido
                        />
                    </div>
                    <div>
                        <h2 className="font-bold">Cocktail en la playa</h2>
                        <p className="text-sm text-gray-500">
                            Fecha de reserva:<span> </span>
                            {reservation?.bookingDate?.toLocaleDateString()},<span> </span>
                            {reservation?.bookingDate?.toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" })}</p>
                    </div>
                </div>

                <div className="border-b border-gray-200 mb-6"></div>

                {/* Información de precio */}
                <div className="flex items-center justify-between pb-6">
                    <span className="text-sm text-black font-bold">Precio total (IVA inc)</span>
                    <div className="flex items-center">
                        {/* Aquí los dos spans están juntos sin espacio adicional */}
                        <span className="font-bold text-lg">{reservation?.totalPrice}€</span>
                        <span className="text-lg">/ { reservation?.participants } Persona{ reservation!.participants! > 1 ? "s" : "" }</span>
                    </div>
                </div>

                {/* Línea fina arriba del precio total */}
                <div className="border-b border-gray-200 mb-6"></div>

                {/* Métodos de pago */}
                <div className="space-y-4 mb-6 flex-grow overflow-auto">
                    {/* Opción de pago con Mastercard */}
                    <label
                        className={`flex items-center border-2 rounded-xl p-4 cursor-pointer ${selectedMethod === 'mastercard' ? 'border-black' : 'border-gray-200'}`}
                    >
                        <img src={mastercardLogo} alt="MasterCard" className="w-14 h-8 mr-3" />
                        <span className="flex-1 font-medium">Tarjeta de crédito/débito</span>
                        <input
                            type="radio"
                            name="paymentMethod"
                            className="w-5 h-5 peer"
                            checked={(selectedMethod || reservation?.paymentMethod) === 'mastercard'}
                            onChange={() => setSelectedMethod('mastercard')}
                        />
                    </label>

                    {/* Opción de pago con Visa */}
                    <label
                        className={`flex items-center border-2 rounded-xl p-4 cursor-pointer ${selectedMethod === 'visa' ? 'border-black' : 'border-gray-200'}`}
                    >
                        <img src={visaLogo} alt="Visa" className="w-14 h-8 mr-3" />
                        <span className="flex-1 font-medium">Tarjeta de crédito/débito</span>
                        <input
                            type="radio"
                            name="paymentMethod"
                            className="w-5 h-5 peer"
                            checked={(selectedMethod || reservation?.paymentMethod) === 'visa'}
                            onChange={() => setSelectedMethod('visa')}
                        />
                    </label>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="text-red-500 text-sm mb-4">
                        {error}
                    </div>
                )}

                {/* Footer con solo el botón de "Pagar" */}
                <div className="fixed bottom-0 left-0 w-full p-5 bg-white container-shadow">
                    <Link
                        to="/payment-details"
                        state={{ selectedMethod }}
                    >
                        <button
                            type="button"
                            className="w-full py-2 text-white rounded-full"
                            onClick={handlePaymentClick} // Llamar a la validación
                            disabled={!selectedMethod && !reservation?.paymentMethod} // Deshabilitar si no se selecciona un método
                        >
                            Pagar
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default PaymentMethod;
