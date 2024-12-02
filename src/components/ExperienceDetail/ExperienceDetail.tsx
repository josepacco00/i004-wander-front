import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImageCardExperience from "./ImageCardExperience";
import InfoExperience from "./InfoExperience";
import MapSection from "./MapSection";
import ReviewSection from "./ReviewSection";

import { getExperienceById } from "../../services/experience.services";

import { useContext } from "react";
import { ReservationContext } from "../../contexts/reservation.context";
import { IExperience } from "../../types/experience";

function ExperienceDetail() {
  const navigate = useNavigate();

  const { setExperience } = useContext(ReservationContext);

  const [experience, setDataExperience] = useState<IExperience>(
    {} as IExperience
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    setIsLoading(true);

    // Obtener el ID de los params
    const experienceId = window.location.pathname.split("/")[2];

    // Obtener la informacion de la experiencia por ID
    getExperienceById(experienceId)
      .then((data) => {
        setDataExperience(data);
        console.log("Experience: ", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      }).finally(
        () => {
          setIsLoading(false);
        }
      )
      ;
  }, []);

  // Redirige a booking y manda informacion al contexto
  const handleBooking = () => {
    setExperience(experience);
    navigate("/booking");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <div className="w-6 h-6 border-b-2 border-current rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mb-28">
      {/* Seccion de imagenes (Posible slider u otra forma de mostrar las imagenes) */}
      <ImageCardExperience
        title={experience?.title}
        rating={experience?.rating}
      />

      {/* Informacion detallada de la experiencia */}
      <InfoExperience
        location={experience?.location}
        description={experience?.description}
        capacity={experience?.capacity}
      />

      {/* Mapa de la experiencia */}
      <MapSection coords={experience?.location} />

      {/* Seccion de reseñas de la experiencia */}
      <ReviewSection />

      <div className="fixed z-[100] bottom-0 flex items-center justify-between w-full gap-12 p-5 px-5 bg-white container-shadow">
        <h1 className="text-primary">
          <span className="font-bold">€{experience?.price}</span>/Persona
        </h1>
        <button
          onClick={handleBooking}
          className="w-full py-2 text-white rounded-full bg-primary"
        >
          Reservar
        </button>
      </div>
    </div>
  );
}

export default ExperienceDetail;
