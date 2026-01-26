import { useEffect, useState } from 'react';

type Location = {
  lat: number;
  lng: number;
  accuracy: number;
};

const FALLBACK_POSITION: [number, number] = [27.7172, 85.324];

export const useGetCurrentLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  const position: [number, number] | null = location ? [location.lat, location.lng] : error ? FALLBACK_POSITION : null;

  return { location, position, error, loading };
};
