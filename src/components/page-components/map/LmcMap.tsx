'use client';
import { wardData } from '@/utils/boundaries/data';

import { BirgunjData } from '@/utils/boundaries/BirgunjData';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MapComponent = dynamic(() => import('@/components/map-components/MapComponent').then((mod) => mod.MapComponent), {
  ssr: false,
});

const LmcMap = () => {
  const [isLmc, setIsLmc] = useState(true);

  const handleSwitchData = () => setIsLmc((p) => !p);
  return (
    <div className="relative h-full w-full">
      <MapComponent
        boundaryData={isLmc ? wardData : BirgunjData}
        coordinate={isLmc ? [27.6588, 85.3247] : [27.0041, 84.8744]}
      />
      <button
        onClick={handleSwitchData}
        className="absolute bottom-5 cursor-pointer right-5 z-50 rounded-lg bg-white px-4 py-2 font-semibold text-black shadow-md hover:bg-gray-100"
      >
        Switch to {isLmc ? 'Parsa Area 1(Birgunj)' : 'LMC ward'}
      </button>
    </div>
  );
};

export default LmcMap;
