import { useEffect, useState } from "react";
import HeaderPanel from "../HeaderPanel";
import CustomerCard from "./CustomerCard";
import bookingService from "../../../services/booking.services";
import { useParams } from "react-router-dom";

function ManageCustomers() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [uniqueTimes, setUniqueTimes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("PENDING");
  const [selectedDate, setSelectedDate] = useState<string>("Todos");
  const [selectedTime, setSelectedTime] = useState<string>("Todos");
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const { id } = useParams();

  // Mover fetchBookings fuera del useEffect
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getBookingsFromExperience(id);
      setBookings(data);

      const dates: string[] = Array.from(
        new Set(data.map((booking: any) => booking.bookingDate.split("T")[0]))
      );
      
      setUniqueDates(dates);

      const times: string[] = Array.from(
        new Set(
          data.map((booking: any) =>
            new Date(booking.bookingDate).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          )
        )
      );
      
      setUniqueTimes(times);

      setFilteredBookings(data); // Inicialmente mostramos todo
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookings(); // Llamada al fetchBookings
    }
  }, [id]);

  useEffect(() => {
    // Filtrar los bookings según el estado activo, fecha y hora seleccionados
    const filterResults = () => {
      let filtered = bookings.filter((booking) => booking.status === activeTab);

      if (selectedDate !== "Todos") {
        filtered = filtered.filter((booking) =>
          booking.bookingDate.startsWith(selectedDate)
        );
      }

      if (selectedTime !== "Todos") {
        filtered = filtered.filter((booking) => {
          const bookingTime = new Date(booking.bookingDate).toLocaleTimeString(
            "en-GB",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          );
          return bookingTime === selectedTime;
        });
      }

      setFilteredBookings(filtered);
    };

    filterResults();
  }, [activeTab, selectedDate, selectedTime, bookings]);

  const handleBookingUpdate = () => {
    if (id) {
      fetchBookings(); // Vuelve a llamar a fetchBookings al actualizar
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <div className="w-6 h-6 border-b-2 border-current rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabTranslations: { [key: string]: string } = {
    PENDING: "Pendientes",
    CONFIRMED: "Confirmados",
    CANCELLED: "Cancelados",
  };

  return (
    <div>
      <HeaderPanel title="Clientes" />

      {/* Filters */}
      <div className="flex justify-between gap-5 px-2 py-4">
        <select
          className="w-full"
          name="date"
          id="date-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <select
          className="w-full"
          name="time"
          id="time-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {uniqueTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {["PENDING", "CONFIRMED", "CANCELLED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-sm font-semibold border-b-2 ${
              activeTab === tab
                ? "text-white bg-tertiary border-tertiary"
                : "border-transparent"
            } `}
          >
            {tabTranslations[tab]}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="mt-5">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <CustomerCard
              onBookingUpdate={handleBookingUpdate} 
              dataBooking={booking}
              activeTab={activeTab}
              key={booking.id}
            />
          ))
        ) : (
          <p className="text-center">
            No hay reservas en {tabTranslations[activeTab]}.
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageCustomers;
