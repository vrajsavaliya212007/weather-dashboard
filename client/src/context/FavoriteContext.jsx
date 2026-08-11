import { createContext, useContext, useEffect, useState } from "react";
import { getFavorites } from "../services/favoriteApi";
import { useAuth } from "./AuthContext";
const FavoriteContext = createContext(null);

export const FavoriteProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    try {
      setLoading(true);
      const res = await getFavorites();
      setFavorites(res?.data || []);
    } catch (error) {
      console.error("Unable to load favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (!user) {
      setFavorites([]);
      return;
    }
    loadFavorites();
  }, [user, authLoading]);

  const isFavorite = (city) => {
    if (!city) {
      return false;
    }
    return favorites.some(
      (item) => item.city?.trim().toLowerCase() === city.trim().toLowerCase(),
    );
  };

  const getFavoriteByCity = (city) => {
    if (!city) {
      return null;
    }
    return (
      favorites.find(
        (item) => item.city?.trim().toLowerCase() === city.trim().toLowerCase(),
      ) || null
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        setFavorites,
        loading,
        loadFavorites,
        isFavorite,
        getFavoriteByCity,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoriteProvider");
  }
  return context;
};

export default FavoriteContext;
