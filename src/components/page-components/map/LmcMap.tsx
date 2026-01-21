'use client';
import { wardData } from '@/utils/boundaries/data';
import dynamic from 'next/dynamic';

// Dynamically import MapComponent to prevent server-side execution of Leaflet
const MapComponent = dynamic(() => import('@/components/map-components/MapComponent').then((mod) => mod.MapComponent), {
  ssr: false,
});

const LmcMap = () => {
  return <MapComponent boundaryData={wardData} />;
};

export default LmcMap;
