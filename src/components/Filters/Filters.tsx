import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Recommendations from './Recommendations';
import CategorySelect from './CategorySelect';
import LocationInput from './LocationInput';

const Filters: React.FC = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: '',
    country: '',
    city: '',
    maxPrice: '',
    category: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const { search, country, city, maxPrice, category } = filters;

    const newQueryParams = {
      search: search || undefined,
      country: country || undefined,
      city: city || undefined,
      maxPrice: maxPrice || undefined,
      category: category || undefined,
    };

    console.log('Query Params:', newQueryParams); // Debugging
    navigate(`?${queryString.stringify(newQueryParams)}`);
  };

  return (
    <div>
      {/* Header */}

      {/* Filters Section */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-bold mb-4">Filtros</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Search Input */}
          <div className="col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Buscar
            </label>
            <input
              id="search"
              type="text"
              placeholder="Nombre"
              value={filters.search}
              onChange={(e) => handleInputChange('search', e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Location Filters */}
          <LocationInput
            updateQueryParams={(params) =>
              setFilters((prev) => ({
                ...prev,
                ...params,
              }))
            }
          />

          {/* Category and Price Filters */}
          <CategorySelect
            updateQueryParams={(params) =>
              setFilters((prev) => ({
                ...prev,
                ...params,
              }))
            }
          />
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Precio Máximo
            </label>
            <select
              id="price"
              value={filters.maxPrice}
              onChange={(e) => handleInputChange('maxPrice', e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Cualquier precio</option>
              <option value="50">€50</option>
              <option value="100">€100</option>
              <option value="200">€200</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={applyFilters}
          className="w-full bg-yellow-500 text-white font-bold py-2 rounded-full hover:bg-yellow-600 mt-4"
        >
          Buscar Experiencias
        </button>
      </div>

      {/* Recommendations Section */}
      <Recommendations />
    </div>
  );
};

export default Filters;
