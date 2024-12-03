import React from 'react';

interface CategorySelectProps {
  updateQueryParams: (params: Record<string, string | undefined>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ updateQueryParams }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value || undefined;
    console.log('Selected Category:', selectedCategory); // Debugging
    updateQueryParams({ category: selectedCategory });
  };

  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Categoría
      </label>
      <select
        id="category"
        onChange={handleCategoryChange}
        className="w-full p-2 border rounded-lg"
      >
        <option value="">Todas las categorías</option>
        <option value="naturaleza">Naturaleza</option>
        <option value="comida">Comida</option>
        <option value="tours">Tours</option>
        <option value="náutico">Náutico</option>
        <option value="ciudad">Ciudad</option>
        <option value="ruralyagro">Rural y agro</option>
        <option value="eventos">Eventos</option>

        
      </select>
    </div>
  );
};

export default CategorySelect;


