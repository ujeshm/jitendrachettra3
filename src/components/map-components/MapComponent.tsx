'use client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ReactNode, useEffect } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';

type WardItem = {
  name?: string;
  ward_no?: number;
  id?: number;
};

interface MapComponentProps {
  children?: ReactNode;
  boundaryData?: any[];
  coordinate?: [number, number];
}

const distinctColors = [
  '#FF5733', // red-orange
  '#33FF57', // green
  '#3357FF', // blue
  '#FF33A1', // pink
  '#A133FF', // purple
  '#33FFF5', // cyan
  '#F5FF33', // yellow
  '#FF8C33', // orange
  '#8C33FF', // violet
  '#33FF8C', // mint
  '#FF3333', // red
  '#33A1FF', // sky blue
  '#A1FF33', // lime
  '#5733FF', // indigo
  '#FF33F5', // magenta
  '#F533FF', // deep pink
  '#33F5FF', // light cyan
  '#FFB533', // amber

  // 🔽 added strong, map-safe colors
  '#1ABC9C', // teal
  '#16A085', // dark teal
  '#2ECC71', // emerald
  '#27AE60', // dark green
  '#3498DB', // blue
  '#2980B9', // dark blue
  '#9B59B6', // purple
  '#8E44AD', // dark purple
  '#34495E', // blue-gray
  '#2C3E50', // navy
  '#F39C12', // orange-yellow
  '#D35400', // burnt orange
  '#E67E22', // carrot
  '#C0392B', // dark red
  '#7F8C8D', // gray
  '#95A5A6', // light gray
];

const getColor = (id: number) => {
  return distinctColors[id % distinctColors.length];
};

const FlyToLocation = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, {
        duration: 2,
      });
    }
  }, [center, zoom, map]);

  return null;
};

export const MapComponent = ({ children, boundaryData, coordinate = [27.6588, 85.3247] }: MapComponentProps) => {
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
      <MapContainer center={coordinate} zoom={13} className="w-full absolute inset-0 z-0 h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={40}
        /> */}
        {geoJsonData && (
          <GeoJSON
            key={boundaryData?.[0]?.name}
            data={geoJsonData}
            style={geoJSONStyle}
            onEachFeature={onEachFeatureWard}
          />
        )}
        <FlyToLocation center={coordinate} zoom={13} />
        {children}
      </MapContainer>
    </div>
  );
};
