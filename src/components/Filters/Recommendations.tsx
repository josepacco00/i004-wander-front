import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  country: string;
  city: string;
  date: string;
}

// Placeholder data for activities
const placeholderRecommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Aventura de senderismo en montaña',
    description: 'Explora los impresionantes senderos de montaña y experimenta la naturaleza en su máxima expresión.',
    image: 'https://via.placeholder.com/300x200',
    category: 'nature',
    price: 100,
    country: 'Spain',
    city: 'Madrid',
    date: '2024-08-17',
  },
  {
    id: 2,
    title: 'Recorrido Cultural de Ruinas Antiguas',
    description: 'Sumérgete en la historia y explora ruinas antiguas junto a guías expertos.',
    image: 'https://via.placeholder.com/300x200',
    category: 'cultural',
    price: 50,
    country: 'Italy',
    city: 'Roma',
    date: '2024-09-01',
  },
  {
    id: 3,
    title: 'Relajación en la Playa',
    description: 'Relájate en playas pristinas y disfruta de la refrescante brisa oceanica.',
    image: 'https://via.placeholder.com/300x200',
    category: 'relaxation',
    price: 200,
    country: 'France',
    city: 'Montpellier',
    date: '2024-10-15',
  },
];

const Recommendations: React.FC = () => {
  const location = useLocation();
  const [recommendationsData, setRecommendationsData] = useState<Recommendation[]>([]);

  const filterRecommendations = (queryParams: Record<string, string | undefined>) => {
    let filteredData = placeholderRecommendations;

    if (queryParams.search?.toString()) {
      filteredData = filteredData.filter((item) => item.title.toLowerCase().includes(queryParams.search!.toString().toLowerCase())
      );
    }
    if (queryParams.category) {
      filteredData = filteredData.filter((item) => item.category === queryParams.category);
    }
    if (queryParams.country) {
      filteredData = filteredData.filter((item) => item.country === queryParams.country);
    }
    if (queryParams.city?.toString()) {
      filteredData = filteredData.filter((item) => item.city.toLowerCase().includes(queryParams.city!.toString().toLowerCase())
      );
    }
    if (queryParams.maxPrice) {
      filteredData = filteredData.filter((item) => item.price <= Number(queryParams.maxPrice));
    }
    if (queryParams.date) {
      filteredData = filteredData.filter((item) => item.date === queryParams.date);
    }

    setRecommendationsData(filteredData);
  };

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    filterRecommendations(queryParams as Record<string, string | undefined>);
  }, [location.search]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 ml-2">Recomendaciones</h2>
      <div className="grid gap-4">
        {recommendationsData.map((item) => (
          <div
            key={item.id}
            className="rounded-lg overflow-hidden shadow-lg p-4 bg-white"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="mt-2">
              <h3 className="font-medium text-md">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>💰 ${item.price}</span>
                <span>
                  📍 {item.country}, {item.city}
                </span>
              </div>
              <button className="w-full bg-yellow-500 text-white font-bold py-2 rounded-full hover:bg-yellow-600 mt-4">
                Mas detalles
              </button>
            </div>
          </div>
        ))}
        {recommendationsData.length === 0 && (
          <p className="text-gray-500 text-center">
            No se encontraron actividades que coincidan con los filtros
            seleccionados.
          </p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
