import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";

function ReviewSection({ id }: { id: string }) {
  const BACK_URL = import.meta.env.VITE_API_URL;

  const [reviews, setReviews] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false); // Estado para mostrar todas las reseñas

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch(`${BACK_URL}/reviews/experience/${id}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    getReviews();
  }, [id]);
   
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0; 
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); 
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2); 

  return (
    <div className="px-5">
      <h1 className="text-xl font-bold">Reseñas</h1>
      {reviews.length !== 0 && (
        <p className="text-gray-400">{calculateAverageRating()} ({reviews.length}) reseñas</p>
      )}

      <div className="flex flex-col gap-5 mt-4">
        {reviews.length === 0 ? (
          <p>No existen reseñas para esta experiencia</p>
        ) : (
          displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>

      {reviews.length > 2 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="p-3 font-bold border-[1.5px] px-8 py-3 mt-4 border-black rounded-xl"
        >
          Ver otras reseñas
        </button>
      )}
    </div>
  );
}

export default ReviewSection;
