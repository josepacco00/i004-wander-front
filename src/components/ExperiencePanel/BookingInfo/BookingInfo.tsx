import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HeaderPanel from "../HeaderPanel";
import imageSafari from "../../../assets/img/Safari.jpg";

//@ts-ignore
import Cookies from "js-cookie";
import { getStatus } from "../../../utils/getDateFormat";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import reviewServices from "../../../services/review.services";

function BookingInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [booking, setBooking] = useState<any>(null);
  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userHasReview, setUserHasReview] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Estado para controlar el modal de confirmación
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Mensaje de éxito

  function formatDateAndTime(dateString: string) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    return { date: formattedDate, time: formattedTime };
  }

  const { date, time } = formatDateAndTime(booking?.bookingDate || "");
  const { text } = getStatus(booking?.status || "");

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);

        const storedBooking = Cookies.get("booking");
        if (storedBooking) {
          const parsedBooking = JSON.parse(storedBooking);
          setBooking(parsedBooking);

          const experienceId = parsedBooking.experienceId;

          const experienceResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/experiences/${experienceId}`
          );
          const experienceData = await experienceResponse.json();
          setExperience(experienceData);

          const reviewsResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/reviews/experience/${experienceId}`
          );
          const reviews = await reviewsResponse.json();

          // Busca si el usuario ya tiene una reseña
          const userReview = reviews.find(
            (review: any) => review.userId === userId
          );
          if (userReview) {
            setUserHasReview(true);
            setReviewId(userReview.id); // Guarda el ID de la reseña
          } else {
            setUserHasReview(false);
          }
        } else {
          console.error("No se encontró la reserva en las cookies.");
        }
      } catch (error) {
        console.error("Error fetching booking or experience data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookingData();
  }, [id, userId]);

  const { provider } = booking || {};

  const handleDeleteReview = async () => {
    if (!reviewId) return;

    try {
      await reviewServices.delete(reviewId); // Usa el servicio actualizado

      setSuccessMessage("Reseña eliminada con éxito."); // Muestra el mensaje de éxito
      setUserHasReview(false);
      setReviewId(null);
      setShowConfirmationModal(false); // Cierra el modal

      // Oculta el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error eliminando la reseña:", error);
      alert("Hubo un problema al eliminar la reseña.");
    }
  };

  const handleShowConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <div className="w-6 h-6 border-b-2 border-current rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!booking || !experience) {
    return <p>No se encontraron datos.</p>;
  }

  return (
    <div>
      <HeaderPanel title="Información de Reserva" />
      <div className="px-5 my-5">
        <img
          src={imageSafari}
          alt="Imagen de Safari"
          className="object-cover w-full h-32 rounded-3xl"
        />
        <h1 className="mt-4 mb-4 font-bold text-center">{experience.title}</h1>
        <div className="flex flex-col gap-3">
          <Info first="Fecha" second={date} />
          <Info
            first="Lugar"
            second={experience.location[0] + ", " + experience.location[1]}
          />
          <Info first="Hora" second={time} />
          <Info
            first="Participantes"
            second={`${booking.participants} ${
              booking.participants === 1 ? "Persona" : "Personas"
            }`}
          />
          <Info first="Precio Total" second={`€${booking.totalPrice}`} />
          <Info first="Estado" second={text} />
          <Info
            first="Ubicación"
            second={
              <ButtonNavigate
                latitude={experience.location[2]}
                longitude={experience.location[3]}
              />
            }
          />
          <Info
            first="Experiencia"
            second={
              <button
                onClick={() => navigate(`/experience/${experience.id}`)}
                className="px-4 py-0.5"
              >
                Ver información
              </button>
            }
          />
          {booking.status === "CONFIRMED" && (
            <Info
              first="Reseña"
              second={
                userHasReview ? (
                  <button
                    onClick={handleShowConfirmation} // Muestra el modal de confirmación
                    className="px-4 py-0.5 bg-tertiary"
                  >
                    Eliminar Reseña
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/review/${experience.id}`);
                      Cookies.set(
                        "experience",
                        JSON.stringify({ title: experience.title }),
                        { expires: 7 }
                      ); // Se guarda por 7 días
                    }}
                    className="px-4 py-0.5"
                  >
                    Agregar Reseña
                  </button>
                )
              }
            />
          )}
        </div>
        <div className="py-4">
          <h1 className="py-2 font-bold text-center">Datos del proveedor</h1>
          <div className="flex flex-col gap-3">
            <Info first="Nombre" second={provider.name} />
            <Info first="Correo" second={provider.email} />
            <Info first="Telefono" second={provider.phone} />
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white w-96 rounded-xl">
            <h2 className="text-lg font-bold text-center text-gray-800">
              ¿Estás seguro?
            </h2>
            <p className="mb-4 text-center text-gray-700">
              ¿Quieres eliminar esta reseña?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteReview}
                className="px-4 py-2 text-white rounded"
              >
                Eliminar
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-white rounded bg-tertiary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="fixed bottom-0 p-2 text-white transform -translate-x-1/2 bg-green-500 rounded left-1/2">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default BookingInfo;

const Info = ({ first, second }: { first: string; second: string | any }) => {
  return (
    <div className="flex items-center justify-between pb-1 border-b border-b-gray-200">
      <p className="text-sm font-bold">{first}</p>
      <p className="text-sm">{second}</p>
    </div>
  );
};

const ButtonNavigate = ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  const openLocation = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <button onClick={openLocation} className="px-4 py-0.5">
      Ver ubicación
    </button>
  );
};
