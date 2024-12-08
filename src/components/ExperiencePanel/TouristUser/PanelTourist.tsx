import { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import HeaderPanel from "../HeaderPanel";
// Importa el servicio de reservas (aunque ahora no se está usando en este ejemplo)
import bookingServices from "../../../services/booking.services";
import { AuthContext } from "../../../contexts/auth.context";
import { useContext } from "react";
import { Booking } from "../../../types/booking";

function PanelTourist() {
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [bookings, setBookings] = useState<Booking[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar la carga

  
  useEffect(() => {
    // TRAE LOS BOOKING DEL USUARIO
    const fetchBookings = async () => {
      try {
        const response = await bookingServices.getBookingsFromUser(userId);
        setBookings(response);
        console.log(bookings)
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <div>
      <HeaderPanel title="Mis Experiencias" />
      {/* Mostrar el loader mientras se cargan los datos */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
          <div className="w-6 h-6 border-b-2 border-current rounded-full animate-spin"></div>
        </div>
      ) : bookings && bookings.length > 0 ? (
        
        <div className="flex flex-col gap-2 mt-4">
          {bookings.map((booking) => (
            <ExperienceCard
              bookingInfo={booking}
              key={booking.id}
              idBooking={booking.id}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center">No tienes reservas.</p>
      )}
    </div>
  );
  
  
}

export default PanelTourist;
