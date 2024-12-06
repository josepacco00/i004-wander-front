import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

interface LocationInputProps {
  value: string; // Recibe el valor de city
  onChange: (value: string) => void; // Recibe la función para manejar cambios
  updateQueryParams: (params: Record<string, string | undefined>) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChange,
  updateQueryParams,
}) => {
  return (
    <>
      <div className="relative">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          País
        </label>
        <select
          id="country"
          className="w-full p-3 pr-10 border rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => updateQueryParams({ country: e.target.value || undefined })}
        >
          <option value="">País</option>
          <option value="España">España</option>
          <option value="Francia">Francia</option>
          <option value="Italia">Italia</option>
        </select>
        <ChevronDownIcon className="absolute right-4 top-2/2 transform -translate-y-9 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          Ciudad
        </label>
        <input
          id="city"
          type="text"
          placeholder="Ciudad"
          className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value} // Usa el valor recibido del componente padre
          onChange={(e) => onChange(e.target.value)} // Llama a la función onChange para actualizar el valor de city en el estado
        />
      </div>
    </>
  );
};

export default LocationInput;
