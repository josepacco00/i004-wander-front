import React, { useState, useEffect } from "react";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { formatCategory, formatToShortDate } from "../../utils/getDateFormat";
import { DetailExperience } from "../../types/detailexperience";

import imageCity from '../../assets/img/City.jpg';

const Home: React.FC = () => {
  const BACK_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState("");
  const [popularExperiences, setPopularExperiences] = useState<DetailExperience[]>([]);
  const [ultimaLlamadaExperiences, setUltimaLlamadaExperiences] = useState<DetailExperience[]>([]);
  const navigate = useNavigate();

  const getCodeCountry = (country: string) => {
    switch (country) {
      case "España":
        return "ESP";
      case "Francia":
        return "FRA";
      case "Italia":
        return "ITA";
      default:
        return "";
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/filters?tags=${encodeURIComponent(category.toLowerCase())}`);
  };

  const handleImageClick = (id: string) => {
    navigate(`/experience/${id}`);
  };

  useEffect(() => {
    const fetchPopularExperiences = async () => {
      try {
        const response = await fetch(`${BACK_URL}/experiences/get-all`);
        const data = await response.json();
        setPopularExperiences(data.slice(0, 2));
      } catch (error) {
        console.error("Error fetching popular experiences:", error);
      }
    };
    fetchPopularExperiences();
  }, []);

  useEffect(() => {
    const fetchUltimaLlamadaExperiences = async () => {
      try {
        const response = await fetch(`${BACK_URL}/experiences/latest`);
        const data = await response.json();
        setUltimaLlamadaExperiences(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching última llamada experiences:", error);
      }
    };
    fetchUltimaLlamadaExperiences();
  }, []);

  const handleSearch = () => {
    const query = search.trim() ? encodeURIComponent(search) : "";
    navigate(`/filters?title=${query}`);
  };

  return (
    <div className="bg-white font-sans text-gray-800">
      {/* Header */}
      <header
        className="relative bg-cover bg-center text-black flex flex-col items-center rounded-md p-8 pt-9"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            Encuentra la experiencia que quieres vivir
          </h1>
          <div className="relative w-full max-w-md mt-8">
            <input
              type="text"
              placeholder="Busca experiencias"
              className="w-full p-2 pr-8 border border-gray-300 rounded-3xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="absolute top-1/2 right-0 w-10 h-10 flex items-center justify-center bg-brandYellow text-white rounded-full transform -translate-y-1/2 hover:bg-orange-600 transition-all"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m2.6-7.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4">
        {/* Popular Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Popular</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularExperiences.map((experience) => (
              <div key={experience.id} className="bg-gray-50 rounded-md overflow-hidden">
                <div
                  className="w-11/12 h-40 bg-cover bg-center rounded-lg mx-auto mt-2"
                  style={{
                    backgroundImage: `url(${experience.image || imageCity})`,
                  }}
                ></div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{experience.title} {getCodeCountry(experience.location[0])}</h3>
                    <p className="text-sm text-gray-600">{formatCategory(experience.tags)} - {formatToShortDate(experience.createdAt)}</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-brandYellow text-white rounded-md hover:bg-orange-600 transition-all"
                    onClick={() => handleImageClick(experience.id)}
                  >
                    Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Más recientes */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Más recientes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ultimaLlamadaExperiences.map((experience) => (
              <div key={experience.id} className="bg-gray-50 rounded-md overflow-hidden" onClick={() => handleImageClick(experience.id)}>
                <img
                  src={experience.image || imageCity}
                  alt={experience.title}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{experience.title}</h3>
                  <p className="text-sm text-gray-600">{experience.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categorías Section */}
        <section className="mt-8 mb-8">
          <h2 className="text-xl font-semibold mb-3">Categorías</h2>
          <div className="flex flex-wrap gap-2">
            {["Rural y agro", "Naturaleza", "Comida", "Tours", "Náutico", "Ciudad", "Eventos"].map((category, index) => (
              <span
                key={index}
                className="text-sm bg-brandYellow text-white px-4 py-2 rounded-full cursor-pointer hover:bg-orange-600 transition-all"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
