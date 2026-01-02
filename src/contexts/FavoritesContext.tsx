import React, { createContext, useContext, useState, useEffect } from "react";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (carId: string) => void;
  removeFavorite: (carId: string) => void;
  isFavorite: (carId: string) => boolean;
  toggleFavorite: (carId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("urin-motors-favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("urin-motors-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (carId: string) => {
    setFavorites((prev) => [...prev, carId]);
  };

  const removeFavorite = (carId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== carId));
  };

  const isFavorite = (carId: string) => favorites.includes(carId);

  const toggleFavorite = (carId: string) => {
    if (isFavorite(carId)) {
      removeFavorite(carId);
    } else {
      addFavorite(carId);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
