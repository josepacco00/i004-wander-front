import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

interface CategorySelectProps {
  updateQueryParams: (params: Record<string, string | undefined>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ updateQueryParams }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value || undefined;
    updateQueryParams({ category: selectedCategory });
  };

  return (
    <div className="relative">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700"
      >
        Categoría
      </label>
      <select
        id="category"
        onChange={handleCategoryChange}
        className="w-full p-3 pr-10 border rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Categorías</option>
        <option value="naturaleza">Naturaleza</option>
        <option value="comida">Comida</option>
        <option value="tours">Tours</option>
        <option value="náutico">Náutico</option>
        <option value="ciudad">Ciudad</option>
        <option value="ruralyagro">Rural y agro</option>
        <option value="eventos">Eventos</option>
      </select>
      <ChevronDownIcon className="absolute right-4 top-11 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default CategorySelect;
