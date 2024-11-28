import React from 'react';

const CategorySelect: React.FC = () => {
    return (
        <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
            </label>
            <select
                id="category"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">Selecciona una categoría</option>
                <option value="naturaleza">Naturaleza</option>
                <option value="aventura">Aventura</option>
                <option value="cultural">Cultural</option>
                <option value="relajación">Relajación</option>
            </select>
        </div>
    );
};

export default CategorySelect;
