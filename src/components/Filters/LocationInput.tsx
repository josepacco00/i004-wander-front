import React from 'react';

const LocationInput: React.FC = () => {
    return (
        <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Lugar
            </label>
            <input
                type="text"
                id="location"
                placeholder="Ingresa el país o ciudad"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
};

export default LocationInput;
