import { useState, useEffect } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";

interface LocationProps {
  setCoords: (coords: [number, number]) => void;
  selectedCoords: [number | undefined, number | undefined];
}

export const Location = ({ setCoords, selectedCoords }: LocationProps) => {
  const [positionOnClick, setPositionOnClick] = useState<LatLng | null>(null);


  useEffect(() => {
    if (selectedCoords[0] !== undefined && selectedCoords[1] !== undefined) {
      setPositionOnClick(new LatLng(selectedCoords[0], selectedCoords[1]));
    }
  }, [selectedCoords]);

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      setPositionOnClick(latlng);
      setCoords([latlng.lat, latlng.lng]); 
    },
  });

  return (
    <>
      {positionOnClick && (
        <Marker position={positionOnClick}></Marker>
      )}
    </>
  );
};
