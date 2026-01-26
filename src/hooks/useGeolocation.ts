'use client';

import { useEffect, useRef, useState } from 'react';

interface GeolocationState {
  lat: number;
  lng: number;
  accuracy?: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (attemptedRef.current) return;
    attemptedRef.current = true;

    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported');
      return;
    }

    // Small delay ensures hydration + user interaction readiness
    const id = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          });
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    }, 500);

    return () => clearTimeout(id);
  }, []);

  return { location, error };
};
