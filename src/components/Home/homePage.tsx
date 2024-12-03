/**
 * @copyright 2024 Luis Iannello
 *
 */

import React from "react";
import { useState, useEffect } from "react";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa/index";
import axios from "axios";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [popularExperiences, setPopularExperiences] = useState([]);
  const [ultimaLlamadaExperiences, setUltimaLlamadaExperiences] = useState<
    any[]
  >([]);
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    // Redirigir al filtro correspondiente con la categoría en minúsculas
    navigate(`/filters?category=${encodeURIComponent(category.toLowerCase())}`);
  };

  useEffect(() => {
    // Llamar a la API
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          "https://newapi.rutasvip.click/api/experiences/get-all"
        );
        const data = await response.json();
        setPopularExperiences(data.slice(0, 2)); // Guardar solo las dos primeras experiencias
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  useEffect(() => {
    // Llamar a la API
    const fetchExperiences = async () => {
      try {
        const response = await fetch(
          "https://newapi.rutasvip.click/api/experiences/latest"
        );
        const data = await response.json();
        setUltimaLlamadaExperiences(data.slice(0, 4)); // Guardar solo las dos primeras experiencias
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div className="home">
      <header className="header">
        {/* <img src="src\assets\img\imagelogo.png" alt="Logo" className="logo" /> */}
        <h1 className="header-title">
          Encuentra la experiencia que quieres vivir
        </h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Busca experiencias"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Actualizar el estado
          />
          <button
            onClick={() => {
              // Si search está vacío, simplemente redirigimos a la ruta de filtros sin ningún query.
              const query = search.trim() ? encodeURIComponent(search) : ""; // Si search está vacío, no se pasa nada
              navigate(`/filters?title=${query}`);
            }}
            className="search-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m2.6-7.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      <main>
        {/* Sección Popular */}
        <section className="section section-padding">
          <h2 className="section-title">Popular</h2>
          <div className="grid-container">
            {popularExperiences.map((experience) => (
              <div key={experience.id} className="experience-card">
                <div
                  className="experience-image"
                  style={{
                    backgroundImage: `url(${
                      experience.image || "https://via.placeholder.com/600"
                    })`,
                  }}
                ></div>
                <div className="experience-info">
                  <div className="experience-info-content">
                    <h3 className="experience-title">{experience.title}</h3>
                    <p className="experience-date">{experience.date}</p>
                  </div>
                  <button
                    className="reserve-button"
                    onClick={() => navigate(`/experiences/${experience.id}`)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Última llamada */}
        <section className="ultima-llamada section-padding mt-8">
          <h2 className="section-title2">Última llamada</h2>
          <div className="grid-container2">
            {ultimaLlamadaExperiences.map((experience) => (
              <div key={experience.id} className="experience-card2">
                <div
                  className="experience-image"
                  style={{
                    backgroundImage: `url(${
                      experience.image || "https://via.placeholder.com/200"
                    })`,
                  }}
                  onClick={() => handleImageClick(experience.id)} // Click on image redirects
                ></div>
                <div className="experience-info2">
                  <h3 className="experience-title2">{experience.title}</h3>
                  <p className="experience-date2">{experience.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Categorías */}
        <section className="section">
          <h2 className="section-title">Categorías</h2>
          <div className="category-tags">
            <span
              className="category"
              onClick={() => handleCategoryClick("Rural y agro")}
            >
              Rural y agro
            </span>
            <span
              className="category"
              onClick={() => handleCategoryClick("Naturaleza")}
            >
              Naturaleza
            </span>
            <span
              className="category"
              onClick={() => handleCategoryClick("Comida")}
            >
              Comida
            </span>
            <span
              className="category"
              onClick={() => handleCategoryClick("Tours")}
            >
              Tours
            </span>
            <span
              className="category"
              onClick={() => handleCategoryClick("Náutico")}
            >
              Náutico
            </span>
            <span
              className="category"
              onClick={() => handleCategoryClick("Ciudad")}
            >
              Ciudad
            </span>
            <span
              className="category"
              onClick={() => handleCategoryClick("Eventos")}
            >
              Eventos
            </span>
            <span
              className="category"
              onClick={() => handleCategoryClick("Última llamada")}
            >
              Última llamada
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
