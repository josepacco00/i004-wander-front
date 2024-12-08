import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import bookingServices from "../../../services/booking.services";

type ConfirmationModalProps = {
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  message: string; 
};

function ConfirmationModal({ isOpen, onClose, onConfirm, message } : ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white w-96 rounded-xl">
        <p className="mb-4 text-center text-gray-700">{message}</p>
        <div className="flex justify-around">
          <button
            className="px-4 py-2 text-white rounded"
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="px-4 py-2 text-white rounded bg-tertiary"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

function CustomerCard({ activeTab, dataBooking, onBookingUpdate }: any) {
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const { tourist, participants, id: bookingId } = dataBooking;
  const { name, email, phone } = tourist;
  console.log(tourist)

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [notification, setNotification] = useState<{ message: string; color: string } | null>(null);

  const showNotification = (message: string, color: string) => {
    setNotification({ message, color });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleConfirmBooking = async () => {
    try {
      await bookingServices.updateBooking(bookingId, { userId, status: "CONFIRMED" });
      showNotification("Reserva confirmada con éxito.", "bg-green-600");
      setTimeout(() => onBookingUpdate(), 1500); 
    } catch (error) {
      console.error(error);
      showNotification("Error al confirmar la reserva.", "bg-red-600");
    } finally {
      setModalOpen(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await bookingServices.updateBooking(bookingId, { userId, status: "CANCELLED" });
      showNotification("Reserva cancelada con éxito.", "bg-primary");
      onBookingUpdate(); // Llamamos a la función para actualizar los bookings en ManageCustomers
    } catch (error) {
      console.error(error);
      showNotification("Error al cancelar la reserva.", "bg-red-600");
    } finally {
      setModalOpen(false);
    }
  };

  const openConfirmModal = () => {
    setModalMessage("¿Estás seguro de que deseas confirmar esta reserva?");
    setModalAction(() => handleConfirmBooking);
    setModalOpen(true);
  };

  const openCancelModal = () => {
    setModalMessage("¿Estás seguro de que deseas cancelar esta reserva?");
    setModalAction(() => handleCancelBooking);
    setModalOpen(true);
  };

  return (
    <section className="flex flex-col gap-3 p-3 border border-gray-300 rounded-xl">
      <div className="flex h-full gap-2">
        <img src={"https://medvirturials.com/img/default-image.png"} alt="" className="w-24 rounded-xl" />
        <div>
          <h1 className="font-bold">{name}</h1>
          <h2>{email}</h2>
          <p>{phone}</p>
          <p>
            {participants} {participants === 1 ? "Persona" : "Personas"}
          </p>
        </div>
      </div>
      {activeTab === "PENDING" && (
        <div className="flex items-center w-full gap-2 text-sm">
          <button
            onClick={openConfirmModal}
            className="w-full px-2 py-1 text-white rounded"
          >
            Confirmar
          </button>
          <button
            onClick={openCancelModal}
            className="w-full px-2 py-1 text-white rounded bg-tertiary"
          >
            Cancelar
          </button>
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={modalAction || (() => {})}
        message={modalMessage}
      />
      {notification && (
        <div
          className={`fixed w-full px-4 py-2 text-white transform -translate-x-1/2 rounded shadow-lg bottom-4 left-1/2 ${notification.color}`}
        >
          {notification.message}
        </div>
      )}
    </section>
  );
}

export default CustomerCard;
