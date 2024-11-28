import React from 'react';
import LocationInput from './LocationInput';
import CategorySelect from './CategorySelect';
import AvailabilitySelect from './AvailabilitySelect';
import CalendarPicker from './CalendarPicker';
import Header from './Header';
import Recommendations from './Recommendations';

const Filters: React.FC = () => {
    return (
        <div className="filters p-4 bg-gray-100 rounded-lg shadow-md">
            <Header/>
            <h2 className="text-xl font-bold mb-4">Filtros</h2>
            <LocationInput />
            <CategorySelect />
            <AvailabilitySelect />
            <CalendarPicker />
            <Recommendations />
        </div>
    );
};

export default Filters;
