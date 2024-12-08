import imageSafari from "../../../assets/img/Safari.jpg";
import { useNavigate } from "react-router-dom";
import { Booking } from "../../../types/booking";
import { getStatus } from "../../../utils/getDateFormat";
import { formatToShortDate } from "../../../utils/getDateFormat";

// @ts-ignore
import Cookies from "js-cookie";

interface ExperienceCardProps {
  idBooking: string;
  bookingInfo: Booking;
  // userId: string;
}

function ExperienceCard({ idBooking, bookingInfo }: ExperienceCardProps) {
  const navigate = useNavigate();

  // experienceId posiblemente tenga que extraerlo 
  const { status, bookingDate, experienceTitle  } = bookingInfo; 
  console.log(bookingInfo)

  const dateFormatted = formatToShortDate(bookingDate);

  const { text, color } = getStatus(status);

  
  // Redirecciona a la informacion de la reserva para el usuario
  const handleBooking = () => {
    // Guardar el booking en la cookie
    Cookies.set("booking", JSON.stringify(bookingInfo), { expires: 7 });
    navigate(`/booking-info/${idBooking}`);
  };

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div>
        <img
          src={imageSafari} // Usamos la imagen de la experiencia si está disponible
          alt="Imagen de Safari"
          className="max-w-[95px] h-28 rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 overflow-hidden">
        <h1 className="text-lg font-semibold truncate">
          {experienceTitle} {/* Nombre de la experiencia */}
        </h1>
        <p>
          Estado: <span className={color}>{text}</span>
        </p>
        <p>Fecha: {dateFormatted}</p>
        <div className="flex gap-2 text-xs">
          <button
            onClick={handleBooking}
            className="px-2 py-1 text-white rounded"
          >
            Ver Reserva
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
