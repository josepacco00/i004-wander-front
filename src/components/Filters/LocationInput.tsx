import React from 'react';

interface LocationInputProps {
  updateQueryParams: (params: Record<string, string | undefined>) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ updateQueryParams }) => {
  return (
    <>
      {/* Country Filter */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          País
        </label>
        <select
          id="country"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => updateQueryParams({ country: e.target.value || undefined })}
        >
          <option value="">Selecciona un país</option>
          <option value="España">España</option>
          <option value="Francia">Francia</option>
          <option value="Italia">Italia</option>
        </select>
      </div>

      {/* City Filter */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Ciudad
        </label>
        <input
          id="city"
          type="text"
          placeholder="Ciudad"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => updateQueryParams({ city: e.target.value || undefined })}
        />
      </div>
    </>
  );
};

export default LocationInput;
