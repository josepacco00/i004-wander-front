import React from 'react';
import city from '../../assets/img/City.jpg';
import mountain from '../../assets/img/Mountain.jpg';
import safari from '../../assets/img/Safari.jpg';

const recommendationsData = [
    {
        title: "Desert Safari Adventure",
        description: "Experience the thrill of a desert safari with dune bashing and camel rides.",
        image: safari,
    },
    {
        title: "City Cultural Tour",
        description: "Discover the rich culture and history of the city with a guided tour.",
        image: city,
    },
    {
        title: "Mountain Trekking Expedition",
        description: "Join a mountain trekking adventure for breathtaking views and excitement.",
        image: mountain,
    },
    // Add more recommendations as needed
];

const Recommendations: React.FC = () => {
    return (
        <div className="recommendations mt-6">
            <h2 className="text-lg font-semibold mb-4">Recomendaciones</h2>
            <div className="grid gap-4">
                {recommendationsData.map((item, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg p-4 bg-white">
                        <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-t-lg" />
                        <div className="mt-2">
                            <h3 className="font-medium text-md">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;
