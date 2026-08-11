import { useState } from "react";

function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError("Unable to fetch location.");
        setLoading(false);
      },
    );
  };

  return {
    location,
    loading,
    error,
    getCurrentLocation,
  };
}

export default useGeolocation;
