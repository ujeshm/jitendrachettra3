'use client';
import { wardData } from '@/utils/boundaries/data';

import { BirgunjData } from '@/utils/boundaries/BirgunjData';
import { LocateFixed } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const MapDataDisplay = dynamic(() => import('./MapData/MapDataDisplay'), {
  ssr: false,
});

const MapComponent = dynamic(() => import('@/components/map-components/MapComponent').then((mod) => mod.MapComponent), {
  ssr: false,
});

const UserLocationMarker = dynamic(
  () => import('@/components/map-components/UserLocationMarker').then((mod) => mod.UserLocationMarker),
  {
    ssr: false,
  }
);

const LmcMap = () => {
  const [isLmc, setIsLmc] = useState(true);
  const [showVotingCenter, setShowVotingCenter] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.6588, 85.3247]);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [position, setPosition] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleSwitchData = () => {
    setIsLmc((p) => !p);
    setMapCenter(isLmc ? [27.0041, 84.8744] : [27.6588, 85.3247]);
  };

  const handleShowMyLocation = () => {
    setIsLocating(true);
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          setPosition({ lat: latitude, lng: longitude, accuracy });
          setShowUserLocation(true);
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapComponent boundaryData={isLmc ? wardData : BirgunjData} coordinate={mapCenter}>
        {showUserLocation && position && <UserLocationMarker position={position}></UserLocationMarker>}
        {showVotingCenter && isLmc && <MapDataDisplay />}
      </MapComponent>

      <div className="absolute flex gap-4 top-5 right-5 z-50">
        <button
          onClick={handleShowMyLocation}
          disabled={isLocating}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md transition-all hover:bg-gray-100 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
          title="Show My Location"
        >
          <LocateFixed size={20} className="text-blue-600" />
          <span>{isLocating ? 'Getting location...' : 'Show My Location'}</span>
        </button>

        {isLmc && (
          <button
            onClick={() => setShowVotingCenter((p) => !p)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md transition-all hover:bg-gray-100 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed capitalize"
            title="Show My Location"
          >
            <span>Voting center chettra 3</span>
          </button>
        )}
      </div>

      {/* <div className="absolute right-5 bottom-20 md:bottom-5 z-50 flex flex-col gap-3">
        <button
          onClick={handleSwitchData}
          className="cursor-pointer rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md hover:bg-gray-100"
        >
          Switch to {isLmc ? 'Parsa Area 1 (Birgunj)' : 'Lalitpur chhetra 3'}
        </button>
      </div> */}
    </div>
  );
};

export default LmcMap;
