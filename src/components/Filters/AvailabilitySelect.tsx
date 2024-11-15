import React from 'react';

const AvailabilitySelect: React.FC = () => {
    return (
        <div className="mb-4">
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                Disponibilidad
            </label>
            <select
                id="availability"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="">Selecciona disponibilidad</option>
                <option value="ahora">Disponible Ahora</option>
                <option value="fin-de-semana">Fines de Semana</option>
                <option value="proximamente">Próximamente</option>
                <option value="todo-el-año">Todo el Año</option>
            </select>
        </div>
    );
};

export default AvailabilitySelect;
