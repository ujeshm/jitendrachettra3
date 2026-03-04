'use client';

import { VotingCenter } from '@/utils/data/votersDataList';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import { useMemo, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

interface MapDataDisplayProps {}

const MapDataDisplay = ({}: MapDataDisplayProps) => {
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);
  // Prepare data with lat/lng values from API
  const transformedPoints = useMemo(() => {
    // Use VotingCenter data directly; it already contains lat and lng fields
    return VotingCenter.map((point) => ({ ...point }));
  }, []);

  const getMarkerIcon = (pointId: number) =>
    L.icon({
      iconUrl: selectedPointId === pointId ? '/marker/red.svg' : '/marker/blue.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

  return (
    <>
      <MarkerClusterGroup
        chunkedLoading
        showCoverageOnHover={false}
        spiderfyOnMaxZoom
        zoomToBoundsOnClick
        maxClusterRadius={60}
      >
        {VotingCenter.map((point) => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={getMarkerIcon(point.id)}
            eventHandlers={{
              click: () => setSelectedPointId(point.id),
            }}
          >
            <Popup>
              <div>
                <p className="font-bold">{point.name}</p>
                <p>Ward number: {point.ward_no}</p>
                {point.address && <p>Address: {point.address}</p>}
                {point.phone && <p>Phone: {point.phone}</p>}
                {point?.google_maps_link && (
                  <p>
                    Google Maps:{' '}
                    <a
                      href={point.google_maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open Link
                    </a>
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
};

export default MapDataDisplay;
