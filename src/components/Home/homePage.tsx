import React from "react";
import './homePage.css';

const Home: React.FC = () => {
  return (
    <div className="bg-white font-sans text-gray-800">
      <header
        className="relative bg-cover bg-center text-black flex flex-col items-center rounded-md p-8 pt-9"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg')",
        }}
      >
        {/* Overlay negro */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Contenido del header */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            Encuentra la experiencia que quieres vivir
          </h1>
          <div className="relative w-full max-w-md mt-8">
            <input
              type="text"
              placeholder="Busca experiencias"
              className="w-full p-2 pr-8 border border-gray-300 rounded-3xl"
            />
            <button className="absolute top-1/2 right-0 w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full transform -translate-y-1/2 hover:bg-orange-600 transition-all">
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
        </div>
      </header>

      <main className="px-4">
        {/* Sección Popular */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Popular</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[ 
              { title: "Nature's Symphony", date: "Cascading Falls 17/08/2023", img: "https://picsum.photos/800/400?random=2" },
              { title: "Cultural Rhythms", date: "Heritage House 19/09/2023", img: "https://picsum.photos/800/400?random=3" },
            ].map((experience, index) => (
              <div key={index} className="bg-gray-50 rounded-md overflow-hidden">
                <div
                  className="w-11/12 h-40 bg-cover bg-center rounded-lg mx-auto mt-2"
                  style={{ backgroundImage: `url(${experience.img})` }}
                ></div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{experience.title}</h3>
                    <p className="text-sm text-gray-600">{experience.date}</p>
                  </div>
                  <button className="px-4 py-2 bg-brandYellow text-white rounded-md hover:bg-orange-600 transition-all">
                    Reservar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Ofertas exclusivas */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Ofertas exclusivas</h2> {/* Cambié "Última llamada" a "Ofertas exclusivas" */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[ 
              { title: "Gastronomy Tour", date: "Market Street 22/09/2023", img: "https://picsum.photos/300/300?random=4" },
              { title: "Adventure Awaits", date: "Peak Point 23/09/2023", img: "https://picsum.photos/300/300?random=5" },
              { title: "Cultural Fiesta", date: "Grand Plaza 20/09/2023", img: "https://picsum.photos/300/300?random=6" },
              { title: "Relax & Unwind", date: "Zeh Garden Resort 29/09/2023", img: "https://picsum.photos/300/300?random=7" },
            ].map((experience, index) => (
              <div key={index} className="mt-2 bg-gray-50 shadow-md rounded-xl overflow-hidden relative">
                <img
                  src={experience.img}
                  alt={experience.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 text-white p-4 flex flex-col justify-end">
                  <h3 className="text-lg font-semibold">{experience.title}</h3>
                  <p className="text-sm">{experience.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección Categorías */}
        <section className="mt-8 mb-8">
          <h2 className="text-xl font-semibold mb-3">Categorías</h2>
          <div className="flex flex-wrap gap-2">
            {["Rural y agro", "Naturaleza", "Comida", "Tours", "Náutico", "Ciudad", "Eventos", "Última llamada"].map(
              (category, index) => (
                <span
                  key={index}
                  className="text-sm bg-brandYellow text-white px-4 py-2 rounded-full cursor-pointer hover:bg-orange-600 transition-all"
                >
                  {category}
                </span>
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
