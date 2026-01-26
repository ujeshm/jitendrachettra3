'use client';
import { wardData } from '@/utils/boundaries/data';

import { BirgunjData } from '@/utils/boundaries/BirgunjData';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MapComponent = dynamic(() => import('@/components/map-components/MapComponent').then((mod) => mod.MapComponent), {
  ssr: false,
});

import { customIcon } from '@/helpers/helpers';
import { useGetCurrentLocation } from '@/hooks/useGetCurrentLocation';
import { Marker } from 'react-leaflet';

const UserLocationMarker = dynamic(
  () => import('@/components/map-components/UserLocationMarker').then((mod) => mod.UserLocationMarker),
  {
    ssr: false,
  }
);

const LmcMap = () => {
  const [isLmc, setIsLmc] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.6588, 85.3247]);
  const { loading, position, error } = useGetCurrentLocation();

  const handleSwitchData = () => {
    setIsLmc((p) => !p);
    setMapCenter(isLmc ? [27.0041, 84.8744] : [27.6588, 85.3247]);
  };

  return (
    <div className="relative h-full w-full">
      <MapComponent boundaryData={isLmc ? wardData : BirgunjData} coordinate={mapCenter}>
        {position && !loading && <Marker position={position} icon={customIcon}></Marker>}
      </MapComponent>

      <div className="absolute right-5 bottom-20 md:bottom-5 z-50 flex flex-col gap-3">
        <button
          onClick={handleSwitchData}
          className="cursor-pointer rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md hover:bg-gray-100"
        >
          Switch to {isLmc ? 'Parsa Area 1 (Birgunj)' : 'Lalitpur chhetra 3'}
        </button>
      </div>
    </div>
  );
};

export default LmcMap;
