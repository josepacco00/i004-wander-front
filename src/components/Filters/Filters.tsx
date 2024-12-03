import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import CategorySelect from "./CategorySelect";
import LocationInput from "./LocationInput";
import { IExperience } from "../../types/experience";

interface Filters {
  title: string;
  country: string;
  city: string;
  maxPrice: string;
  category: string;
}

interface QueryParams {
  title?: string;
  location?: string;
  maxPrice?: string;
  tags?: string;
}



const Filters: React.FC = () => {
  const BACK_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();

  

  const [filters, setFilters] = useState<Filters>({
    title: "",
    country: "",
    city: "",
    maxPrice: "",
    category: "",
  });

  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const { title, country, city, maxPrice, category } = filters;
  
    
    const locationParam = (country && city) 
      ? `${country},${city}` 
      : (country || city); 
  
    const newQueryParams = {
      title: title || undefined,
      location: locationParam || undefined, 
      maxPrice: maxPrice || undefined,
      tags: category || undefined, 
    };
  
    navigate(`?${queryString.stringify(newQueryParams)}`);
  };
  
  const fetchExperiences = async (queryParams: QueryParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `${BACK_URL}/experiences/get-all?${queryString.stringify(queryParams)}`
      );
      setExperiences(response.data);
    } catch (err) {
      setError("No existen experiencias.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchExperiences = () => {
    const { title, country, city, maxPrice, category } = filters;

    // Construimos `location` combinando `country` y `city`
    const locationParam = country && city ? `${country},${city}` : undefined;

    const queryParams = {
      title: title || undefined,
      location: locationParam || undefined, // Pasamos `location` combinado
      maxPrice: maxPrice || undefined,
      tags: category || undefined, // Mapeamos `category` a `tags`
    };

    fetchExperiences(queryParams);
    applyFilters();
  };

  useEffect(() => {
    const params = queryString.parse(location.search);

    const [country, city] = (params.location as string)?.split(",") || ["", ""];
    
    //@ts-ignore
    setFilters((prev) => ({
      ...prev,
      title: params.title || "",
      country: country || "",
      city: city || "",
      maxPrice: params.maxPrice || "",
      category: params.tags || "", // Mapeamos `tags` a `category` en el estado
    }));

    fetchExperiences(params);
    
  }, [location.search]);

  return (
    <div>
      <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex justify-between">
        <h2 className="mb-4 text-lg font-bold">Filtros</h2>
        <p className="px-3 text-sm" onClick={() => { navigate('/filters')}}>Resetear Filtros</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Buscar
            </label>
            <input
              id="title"
              type="text"
              placeholder="Nombre"
              value={filters.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <LocationInput
            updateQueryParams={(params) =>
              setFilters((prev) => ({
                ...prev,
                ...params,
              }))
            }
          />

          <CategorySelect
            updateQueryParams={(params) =>
              setFilters((prev) => ({
                ...prev,
                ...params,
              }))
            }
          />
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio Máximo
            </label>
            <select
              id="price"
              value={filters.maxPrice}
              onChange={(e) => handleInputChange("maxPrice", e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Cualquier precio</option>
              <option value="50">€50</option>
              <option value="100">€100</option>
              <option value="200">€200</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSearchExperiences}
          className="w-full py-2 mt-4 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
        >
          Buscar Experiencias
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p>Cargando experiencias...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="mb-4 text-lg font-bold">Experiencias</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {experiences.length > 0 ? (
                experiences.map((experience) => (
                  <div
                    key={experience.id}
                    className="p-4 overflow-hidden bg-white rounded-lg shadow-lg"
                  >
                    <img
                      alt={experience.title}
                      className="object-cover w-full h-32 rounded-t-lg"
                    />
                    <div className="mt-2">
                      <h3 className="font-medium text-md">{experience.title}</h3>
                      <p className="text-sm text-gray-600">
                        {experience.location[0] + ", " + experience.location[1]}
                      </p>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>💰 ${experience.price}</span>
                        <span>
                          📍 {experience.location[0]}, {experience.location[1]}
                        </span>
                        <span>
                          📍 {experience.tags[0]}
                        </span>
                      </div>
                      <button onClick={() => navigate('/experience/' + experience.id)}  className="w-full py-2 mt-4 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-600">
                        Más detalles
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No se encontraron experiencias.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
