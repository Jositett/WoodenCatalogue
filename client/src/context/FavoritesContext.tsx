import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Door } from '@shared/schema';

interface FavoritesContextType {
  favorites: Door[];
  addFavorite: (doorId: number) => void;
  removeFavorite: (doorId: number) => void;
  isFavorite: (doorId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<Door[]>([]);
  
  // Get all doors for reference when adding favorites
  const { data: doors } = useQuery<Door[]>({
    queryKey: ['/api/doors'],
  });
  
  // Load favorite IDs from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        if (Array.isArray(parsed)) {
          setFavoriteIds(parsed);
        }
      } catch (error) {
        console.error('Failed to parse favorites from localStorage', error);
      }
    }
  }, []);
  
  // Update favorites whenever favoriteIds or doors changes
  useEffect(() => {
    if (doors) {
      const favoriteItems = doors.filter(door => favoriteIds.includes(door.id));
      setFavorites(favoriteItems);
    }
  }, [favoriteIds, doors]);
  
  // Save favoriteIds to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);
  
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
  
  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
  
  return (
    <FavoritesContext.Provider value={value}>
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