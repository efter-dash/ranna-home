import { useState, useEffect, useCallback } from "react";

export interface FavoriteRecipe {
  id: string;
  titleBn: string;
  title: string;
  prepTime: string;
  serves: string;
  difficulty: string;
  ingredientsList: string[];
  missingEssentials: string[];
  steps: string[];
  ingredientIds: string[];
  savedAt: string;
}

const STORAGE_KEY = "rannakori-favorites";

function loadFavorites(): FavoriteRecipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: FavoriteRecipe[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>(loadFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = useCallback((recipe: Omit<FavoriteRecipe, "id" | "savedAt">) => {
    const newFav: FavoriteRecipe = {
      ...recipe,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    };
    setFavorites((prev) => [newFav, ...prev]);
    return newFav.id;
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorited = useCallback(
    (titleBn: string) => favorites.some((f) => f.titleBn === titleBn),
    [favorites]
  );

  const getFavoriteByTitle = useCallback(
    (titleBn: string) => favorites.find((f) => f.titleBn === titleBn),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorited, getFavoriteByTitle };
}
