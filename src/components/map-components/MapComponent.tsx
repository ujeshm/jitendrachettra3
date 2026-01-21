'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ReactNode } from 'react';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';

type WardItem = {
  name?: string;
  ward_no?: number;
  id?: number;
};

interface MapComponentProps {
  children?: ReactNode;
  boundaryData?: any[];
}

const distinctColors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#A133FF',
  '#33FFF5',
  '#F5FF33',
  '#FF8C33',
  '#8C33FF',
  '#33FF8C',
  '#FF3333',
  '#33A1FF',
  '#A1FF33',
  '#FF5733',
  '#5733FF',
  '#33FF57',
  '#FF33F5',
  '#F533FF',
  '#33F5FF',
  '#FFB533',
];

const getColor = (id: number) => {
  return distinctColors[id % distinctColors.length];
};

export const MapComponent = ({ children, boundaryData }: MapComponentProps) => {
  // hover effect
  const onEachFeatureWard = (feature: any, layer: L.Layer) => {
    const item = feature.properties as WardItem;
    if (feature && item) {
      const wardNo = `${item?.name}`;
      if (!wardNo) return;
      layer.bindTooltip(wardNo, {
        direction: 'center',
        permanent: true,
      });
      layer.on('click', (e) => {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        const layerElement = e.target.getElement();
        if (layerElement) {
          layerElement.classList.add('no-focus-style');
        }
      });
    }
  };

  const geoJSONStyle = (feature: any) => {
    return {
      fillColor: getColor(feature.properties.id || 0),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.5,
    };
  };

  const geoJsonData: any = boundaryData?.map((item) => ({
    type: 'Feature',
    geometry: item.geometry,
    properties: {
      name: item.name,
      ward_no: item.ward_no,
      id: item.id,
    },
  }));

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <MapContainer center={[27.6588, 85.3247]} zoom={13} className="w-full absolute inset-0 z-0 h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={40}
        /> */}
        {geoJsonData && <GeoJSON data={geoJsonData} style={geoJSONStyle} onEachFeature={onEachFeatureWard} />}
        {children}
      </MapContainer>
    </div>
  );
};
