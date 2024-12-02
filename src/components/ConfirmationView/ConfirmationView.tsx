import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa"; // Para los iconos
import AuthLayout from "../../layout/AuthLayout"; // Importamos AuthLayout
import vacationImage from "../../assets/img/vacationImage.png"; // Asegúrate de tener la imagen en esta ruta
import { Link } from "react-router-dom";
import './ConfirmationView.css';

const ConfirmationView = () => {

  return (
    <AuthLayout showText={false} logoClassName="logoClassName" showBackButton={false}> {/* Solo aquí se pasa la clase personalizada */}
       <div className="w-full max-w-md"> {/* Ajustamos la altura para que no haya un exceso de margen blanco */}
          {/* Contenido principal */}
          <div className="text-center mt-[100px] mb-0"> {/* Ajuste en el margin-top para centrar más el contenido, y eliminamos el margen inferior */}
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-left">¡Experiencia confirmada!</h2>

            {/* Información de la reserva */}
            <div className="flex items-center justify-start gap-4 mb-4">
              <div className="relative">
                <img
                  src={vacationImage} // Aquí se usa la nueva imagen
                  alt="Cocktail en la playa" // Descripción apropiada
                  className="w-16 h-16 rounded-lg object-cover" // Tamaño reducido
                />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">Cocktail en la playa</p>
                <p className="text-sm text-gray-600">Order number #837nx38</p>
              </div>
            </div>

            {/* Detalles adicionales con margen ajustado */}
            <div className="text-left mb-12 mt-6 ml-1"> {/* Ajuste de márgenes */}
              <p className="flex items-center text-dark mb-2">
                <FaCalendarAlt className="text-brandYellow mr-2" />
                <span>13 al 15 de noviembre</span>
              </p>
              <p className="flex items-center text-dark mb-2">
                <FaClock className="text-brandYellow mr-2" />
                <span>18:00 hs</span>
              </p>
              <p className="flex items-center text-dark">
                <FaMapMarkerAlt className="text-brandYellow mr-2" />
                <span>Malibu Beach, California</span>
              </p>
            </div>

            {/* Botón de volver con hover rojo */}
            <Link to="/">
              <button className="w-full py-3 bg-brandYellow text-white font-bold rounded-full hover:bg-tertiary hover:text-white transition mb-0"> {/* Eliminamos margen inferior del botón */}
                Volver al inicio
              </button>
            </Link>
          </div>
        </div>
    </AuthLayout>
  );
};

export default ConfirmationView;
