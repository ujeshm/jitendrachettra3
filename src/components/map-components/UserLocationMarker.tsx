'use client';
import L from 'leaflet';
import { useEffect } from 'react';
import { Marker, useMap } from 'react-leaflet';

interface UserLocationMarkerProps {
  position: {
    lat: number;
    lng: number;
    accuracy: number;
  };
}

const customIcon = L.icon({
  iconUrl: '/image/locationIco.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export const UserLocationMarker = ({ position }: UserLocationMarkerProps) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 15, {
        duration: 2,
      });
    }
  }, [map, position]);

  if (!position) return null;

  return (
    <>
      {/* <Circle
        center={[position.lat, position.lng]}
        radius={position.accuracy}
        pathOptions={{
          fillColor: '#4285F4',
          fillOpacity: 0.15,
          color: '#4285F4',
          opacity: 0.3,
          weight: 1,
        }}
      />
      <CircleMarker
        center={[position.lat, position.lng]}
        radius={8}
        pathOptions={{
          fillColor: '#4285F4',
          fillOpacity: 1,
          color: 'white',
          opacity: 1,
          weight: 3,
        }}
      /> */}
      <Marker position={[position.lat, position.lng]} icon={customIcon} />
    </>
  );
};
