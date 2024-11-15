import React, { useState } from 'react';
import CalendarModal from './CalendarModal';

const CalendarPicker: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="mb-4">
            <label htmlFor="calendar" className="block text-sm font-medium text-gray-700 mb-1">
                Calendario
            </label>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Selecciona una fecha
            </button>

            {/* Calendar Modal */}
            <CalendarModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CalendarPicker;
