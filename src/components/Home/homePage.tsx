/**
 * @copyright 2024 Luis Iannello
 *
 */

import React from "react";
import "./homePage.css";

const Home: React.FC = () => {
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
          />
          <button className="search-button">
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
            <div className="experience-card">
              <div
                className="experience-image"
                style={{
                  backgroundImage: "url(https://picsum.photos/600/600)",
                }}
              ></div>
              <div className="experience-info">
                <div className="experience-info-content">
                  <h3 className="experience-title">Nature's Symphony (FR)</h3>
                  <p className="experience-date">Cascading Falls 17/08/2023</p>
                </div>
                <button className="reserve-button">Reservar</button>
              </div>
            </div>
            <div className="experience-card">
              <div
                className="experience-image"
                style={{
                  backgroundImage: "url(https://picsum.photos/600/600)",
                }}
              ></div>
              <div className="experience-info">
                <div className="experience-info-content">
                  <h3 className="experience-title">Cultural Rhythms (ITA)</h3>
                  <p className="experience-date">Heritage House 19/09/2023</p>
                </div>
                <button className="reserve-button">Reservar</button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Última llamada */}
        <section className="ultima-llamada section-padding mt-8">
          <h2 className="section-title2">Última llamada</h2>
          <div className="grid-container2">
            <div
              className="experience-card2"
              style={{ backgroundImage: "url(https://picsum.photos/200/200)" }}
            >
              <div className="experience-info2">
                <h3 className="experience-title2">Ancient</h3>
                <p className="experience-date2">Grand Plaza 20/09/2023</p>
              </div>
            </div>
            <div
              className="experience-card2"
              style={{ backgroundImage: "url(https://picsum.photos/200/200)" }}
            >
              <div className="experience-info2">
                <h3 className="experience-title2">Flavors of the Market</h3>
                <p className="experience-date2">Market Street 22/09/2023</p>
              </div>
            </div>
            <div
              className="experience-card2"
              style={{ backgroundImage: "url(https://picsum.photos/200/200)" }}
            >
              <div className="experience-info2">
                <h3 className="experience-title2">Excitement</h3>
                <p className="experience-date2">Peak Point 23/09/2023</p>
              </div>
            </div>
            <div
              className="experience-card2"
              style={{ backgroundImage: "url(https://picsum.photos/200/200)" }}
            >
              <div className="experience-info2">
                <h3 className="experience-title2">Tranquil Haven</h3>
                <p className="experience-date2">Zeh Garden Resort 29/09/2023</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Categorías */}
        <section className="section">
          <h2 className="section-title">Categorías</h2>
          <div className="category-tags">
            <span className="category">Rural y agro</span>
            <span className="category">Naturaleza</span>
            <span className="category">Comida</span>
            <span className="category">Tours</span>
            <span className="category">Náutico</span>
            <span className="category">Ciudad</span>
            <span className="category">Eventos</span>
            <span className="category">Última llamada</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
