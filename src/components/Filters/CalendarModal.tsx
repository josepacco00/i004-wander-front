import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const CalendarModal: React.FC<{ isOpen: boolean; onRequestClose: () => void }> = ({ isOpen, onRequestClose }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [countryCode, setCountryCode] = useState('+34'); // Default to Spain

    const countryCodes = [
        { code: '+1', label: 'US' },
        { code: '+44', label: 'UK' },
        { code: '+91', label: 'India' },
        { code: '+61', label: 'Australia' },
        { code: '+81', label: 'Japan' },
        { code: '+49', label: 'Germany' },
        { code: '+33', label: 'France' },
        { code: '+34', label: 'Spain' },
        { code: '+55', label: 'Brazil' },
        { code: '+86', label: 'China' },
        { code: '+7', label: 'Russia' },
        { code: '+39', label: 'Italy' },
        { code: '+52', label: 'Mexico' },
        { code: '+27', label: 'South Africa' },
        { code: '+82', label: 'South Korea' },
        { code: '+966', label: 'Saudi Arabia' },
        { code: '+971', label: 'United Arab Emirates' },
        { code: '+30', label: 'Greece' },
        { code: '+31', label: 'Netherlands' },
        { code: '+32', label: 'Belgium' },
        { code: '+36', label: 'Hungary' },
        { code: '+47', label: 'Norway' },
        { code: '+48', label: 'Poland' },
        { code: '+46', label: 'Sweden' },
        { code: '+45', label: 'Denmark' },
        { code: '+41', label: 'Switzerland' },
        { code: '+90', label: 'Turkey' },
        { code: '+64', label: 'New Zealand' },
        { code: '+351', label: 'Portugal' },
        { code: '+234', label: 'Nigeria' },
        { code: '+92', label: 'Pakistan' },
        { code: '+880', label: 'Bangladesh' },
        { code: '+964', label: 'Iraq' },
        { code: '+20', label: 'Egypt' },
        { code: '+353', label: 'Ireland' },
        { code: '+84', label: 'Vietnam' },
        { code: '+63', label: 'Philippines' },
        { code: '+94', label: 'Sri Lanka' },
        { code: '+66', label: 'Thailand' },
        { code: '+212', label: 'Morocco' },
        { code: '+213', label: 'Algeria' },
        { code: '+216', label: 'Tunisia' },
        { code: '+962', label: 'Jordan' },
        { code: '+961', label: 'Lebanon' },
        { code: '+98', label: 'Iran' },
        { code: '+972', label: 'Israel' },
        { code: '+353', label: 'Ireland' },
        { code: '+372', label: 'Estonia' },
        { code: '+371', label: 'Latvia' },
        { code: '+370', label: 'Lithuania' },
        { code: '+359', label: 'Bulgaria' },
        { code: '+40', label: 'Romania' },
        { code: '+380', label: 'Ukraine' },
        { code: '+256', label: 'Uganda' },
        { code: '+254', label: 'Kenya' },
        { code: '+233', label: 'Ghana' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 bg-white p-4 rounded-lg shadow-lg mx-4 my-8 md:mx-auto md:w-96"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="text-center">
                <h2 className="text-lg font-semibold mb-4">Selecciona la fecha</h2>

                {/* Calendar */}
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    inline
                    className="mb-4"
                />

                {/* Additional Fields */}
                <div className="text-left mb-4">
                    <h3 className="text-lg font-medium mb-1">Detalle</h3>
                    <p className="text-base text-gray-600">Chequea tus datos para la reserva</p>
                </div>

                <div className="text-left mb-4">
                    <label htmlFor="persons" className="block text-base mb-1">Personas</label>
                    <select id="persons" className="w-full p-2 border rounded-lg">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                {/* Phone Number Section */}
                <div className="mb-4 flex items-center">
                    <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-20 text-center"
                    >
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.code} - {country.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        id="phone"
                        placeholder="600 123 123"
                        className="w-full p-2 border-t border-r border-b border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="text-left mb-4">
                    <label htmlFor="email" className="block text-base mb-1">Email</label>
                    <input type="email" id="email" placeholder="Tu email" className="w-full p-2 border rounded-lg" />
                </div>

                {/* Buttons */}
                <div className="flex w-full gap-2">
                    <button
                        onClick={onRequestClose}
                        className="w-1/2 px-4 py-2 bg-gray-300 text-center font-semibold rounded-full"
                    >
                        Volver
                    </button>
                    <button
                        onClick={onRequestClose}
                        className="w-1/2 px-4 py-2 bg-yellow-500 text-white text-center font-semibold rounded-full"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CalendarModal;