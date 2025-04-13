import React, { createContext, useContext, useState, useEffect } from 'react';
import { Door } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';

interface FavoritesContextType {
  favorites: Door[];
  addFavorite: (doorId: number) => void;
  removeFavorite: (doorId: number) => void;
  isFavorite: (doorId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  
  // Load favorite IDs from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavoriteIds(JSON.parse(savedFavorites));
    }
  }, []);
  
  // Save favorite IDs to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);
  
  // Fetch all doors to get the full details for favorites
  const { data: doors = [] } = useQuery<Door[]>({
    queryKey: ['/api/doors'],
  });
  
  const favorites = doors.filter(door => favoriteIds.includes(door.id));
  
  const addFavorite = (doorId: number) => {
    setFavoriteIds(prev => {
      if (!prev.includes(doorId)) {
        return [...prev, doorId];
      }
      return prev;
    });
  };
  
  const removeFavorite = (doorId: number) => {
    setFavoriteIds(prev => prev.filter(id => id !== doorId));
  };
  
  const isFavorite = (doorId: number) => {
    return favoriteIds.includes(doorId);
  };
  
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;