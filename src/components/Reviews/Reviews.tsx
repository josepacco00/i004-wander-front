import React, { useState, useContext } from "react";
//@ts-ignore
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import imageSafari from "../../assets/img/Safari.jpg";
import { AuthContext } from "../../contexts/auth.context";
import HeaderPanel from "../ExperiencePanel/HeaderPanel";
import reviewServices from "../../services/review.services";
import { useNavigate } from "react-router-dom";

const Reviews: React.FC = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const userId = user?._id;
  const navigate = useNavigate();

  const [rating, setRating] = useState<number | undefined>();
  const [review, setReview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ rating?: string; review?: string }>({
    rating: "",
    review: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const CookieExperience = Cookies.get("experience");
  const experience = JSON.parse(CookieExperience);

  // Validación de campos
  const isFormValid = () => {
    let formIsValid = true;
    const errors: { rating?: string; review?: string } = {};

    if (!rating || rating < 1 || rating > 5) {
      errors.rating = "La calificación debe ser entre 1 y 5.";
      formIsValid = false;
    }
    if (!review || review.length < 10) {
      errors.review = "La reseña debe tener al menos 10 caracteres.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar antes de proceder
    if (!isFormValid()) {
      console.log("Formulario inválido: Verifica los campos.");
      return;
    }

    // Verificar que el usuario y el ID de la experiencia estén disponibles
    if (!userId || !id) {
      setMessage("Información de usuario o experiencia faltante.");
      return;
    }

    setLoading(true);
    setMessage(null); // Limpiar el mensaje anterior

    try {
      const data = {
        experienceId: id,
        userId,
        rating: Number(rating),
        comment: review,
      };
      console.log("Datos enviados: ", data);

      const response = await reviewServices.create(data);
      console.log(response);

      if (response.status === 200) {
        setRating(0);
        setReview("");
        setMessage("Reseña enviada con éxito!");
        console.log("Reseña enviada con éxito");
      } else if (response.message === "Review uploaded successfully.") {
        setMessage("Reseña enviada con éxito!");
        setTimeout(() => navigate(-1), 2500);
      } else {
        setMessage("Hubo un error al enviar la reseña.");
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      setMessage("Error al enviar la reseña. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 mx-auto rounded-lg">
      <div className="py-2">
        <HeaderPanel title="Agregar Reseña" />
      </div>

      <>
        <div className="mb-6">
          <img
            src={experience?.image || imageSafari}
            alt={experience?.title}
            className="w-full h-[150px] object-cover rounded-lg mx-auto"
          />
        </div>
        <h2 className="mb-6 text-xl font-bold text-center text-gray-800">
          {experience?.title}
        </h2>
      </>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="rating"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Calificación
          </label>
          <select
            id="rating"
            value={rating}
            //@ts-ignore
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-3 text-gray-700 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={loading}
          >
            <option value="">Selecciona una calificación</option>
            <option value="5">5 - Excelente</option>
            <option value="4">4 - Muy bueno</option>
            <option value="3">3 - Bueno</option>
            <option value="2">2 - Regular</option>
            <option value="1">1 - Malo</option>
          </select>
          {errors.rating && (
            <p className="mt-2 text-sm text-red-500">{errors.rating}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="review"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Reseña
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Describe tu experiencia."
            className="w-full p-3 text-gray-700 bg-white border rounded-lg shadow-sm resize-y focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={4}
            disabled={loading}
          ></textarea>
          {errors.review && (
            <p className="mt-2 text-sm text-red-500">{errors.review}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-medium ${
            loading ? "bg-gray-400" : ""
          } text-white shadow-md transition duration-200`}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Añadir reseña"}
        </button>

        {message && (
          <p
            className={`text-center ${
              message.includes("error") ? "text-red-500" : "text-green-500"
            } mt-4`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Reviews;
