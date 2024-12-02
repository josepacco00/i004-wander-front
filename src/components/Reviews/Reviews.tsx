import React, { useState, useEffect } from 'react';

const Reviews: React.FC = () => {
  const [rating, setRating] = useState<number | string>('');
  const [review, setReview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [activity, setActivity] = useState<{ title: string; image: string } | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

 
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setFetchError(null); // Reset any previous error
        const response = await fetch('https://jsonplaceholder.typicode.com/photos/1'); // API de ejemplo
        if (!response.ok) {
          throw new Error('Failed to fetch activity details');
        }
        const data = await response.json();
        setActivity({
          title: data.title || 'Default Activity Title', // Reemplazar con la info del API
          image: data.url || 'https://via.placeholder.com/300x150', // Reemplazar con la info del API
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching activity:', error.message);
          setFetchError(error.message);
        } else {
          console.error('Unexpected error:', error);
          setFetchError('An unexpected error occurred while fetching activity details');
        }
      }
    };

    fetchActivity();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          review,
          activity: activity?.title, // Include the fetched activity title
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const data = await response.json();
      console.log('Review submitted successfully:', data);

      setSuccess(true);
      setRating('');
      setReview('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error submitting review:', error.message);
        setSuccess(false);
      } else {
        console.error('Unexpected error:', error);
        setSuccess(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Back Button and Title */}
      <div className="flex items-center mb-6">
        <button className="text-lg text-gray-600 mb-6">{"<"} </button>
        <h1 className="text-lg font-bold text-gray-700 text-center mb-6">Añadir reseña</h1>
      </div>

      {/* Show loading or error while fetching activity */}
      {fetchError ? (
        <p className="text-red-500 text-center">Error: {fetchError}</p>
      ) : !activity ? (
        <p className="text-gray-500 text-center">
          Cargando datos de la actividad...
        </p>
      ) : (
        <>
          {/* Render fetched activity image and title */}
          <div className="mb-6">
            <img
              src={activity.image} // Dynamically rendered from the API
              alt={activity.title}
              className="w-[300px] h-[150px] object-cover rounded-lg mx-auto"
            />
          </div>
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            {activity.title}
          </h2>
        </>
      )}

      {/* Review Form */}
      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className="mb-6">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Calificación
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={loading}
          >
            <option value="">Selecciona una calificación</option>
            <option value="5">5 - Excelente</option>
            <option value="4">4 - Muy bueno</option>
            <option value="3">3 - Bueno</option>
            <option value="2">2 - Regular</option>
            <option value="1">1 - Malo</option>
          </select>
        </div>

        {/* Review Text Area */}
        <div className="mb-6">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Reseña
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Describe tu experiencia."
            className="w-full p-3 border rounded-lg text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
            rows={4}
            disabled={loading}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-medium ${
            loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
          } text-white shadow-md transition duration-200`}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Añadir reseña"}
        </button>
      </form>

      {/* Success/Failure Message */}
      {success === true && (
        <p className="text-green-500 text-center mt-6">
          Reseña enviada con éxito.
        </p>
      )}
      {success === false && (
        <p className="text-red-500 text-center mt-6">
          Error al enviar la reseña. Intenta de nuevo.
        </p>
      )}
    </div>
  );
};

export default Reviews;
