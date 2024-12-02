import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapSection() {

  // const defaultCoords = [39.4699, -0.3763];

  return (
    <>
      <div className="px-5">
        <h1 className="text-xl font-bold ">Localizacion</h1>
        <p className="py-1 mb-4 text-sm text-gray-400">Ver en el mapa</p>
        <MapContainer
          center={[39.4699, -0.3763]}
          zoom={14}
          minZoom={13}
          maxZoom={17}
          boxZoom={true}
          scrollWheelZoom={false}
          style={{ height: "200px", zIndex: "9" }} 
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[39.4699, -0.3763]}>
          </Marker>
        </MapContainer>
        <div className="w-full h-[1px] bg-gray-300 my-5"></div>
      </div>
      
    </>
  );
}

export default MapSection;
