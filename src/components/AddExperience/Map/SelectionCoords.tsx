import {
    MapContainer,
    TileLayer,
    ZoomControl,
  } from "react-leaflet";
  import { useState } from "react";
  import { Location } from "./Location";
  
  import "leaflet/dist/leaflet.css";
  
  type Coords = [number | undefined, number | undefined];
  
  interface SelectCordsProps {
    coords: Coords;
    setCoords: (coords: Coords) => void;
    infoCoords: any;
  }
  
  function SelectCords({ coords, setCoords, infoCoords }: SelectCordsProps) {
    const cityInfo = infoCoords.city || infoCoords.province;
  
    const [isMapShowing, setIsMapShowing] = useState(false);
  
    const handleToggleMap = () => {
      setIsMapShowing((prev) => !prev);
    };
  
    const defaultCoords: [number, number] = [39.4699, -0.3763]; // Coordenadas predeterminadas (Valencia, España)
    const currentCoords =
      coords[0] !== undefined && coords[1] !== undefined
        ? (coords as [number, number])
        : defaultCoords;
  
    return (
      <div className="relative w-full">
        {isMapShowing ? (
          <div className="fixed top-0 left-0 z-[999] w-screen h-screen bg-white">
            <div className="absolute top-4 right-4 z-[1001] flex gap-4">
              <button
                className="px-3 py-1 font-bold text-white bg-red-500 rounded-md shadow-md"
                onClick={handleToggleMap}
              >
                Cerrar Mapa
              </button>
            </div>
  
            <MapContainer
              zoomControl={false}
              center={currentCoords}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Location setCoords={setCoords} selectedCoords={coords} />
              <ZoomControl position="bottomright" />
            </MapContainer>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3">
            <input
              type="text"
              value={
                coords[0] !== undefined && coords[1] !== undefined
                  ? `${cityInfo}, ${infoCoords.country}`
                  : "Selecciona una ubicación"
              }
              readOnly
              className="flex-grow p-3 border rounded-md shadow-md"
            />
            <button
              className="px-2 py-3 text-sm font-bold text-white rounded-md shadow-md hover:bg-blue-600"
              onClick={handleToggleMap}
            >
              Mostrar Mapa
            </button>
          </div>
        )}
      </div>
    );
  }
  
  export default SelectCords;
  