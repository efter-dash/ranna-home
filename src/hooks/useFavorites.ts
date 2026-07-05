import { useCallback } from "react";
import { createStorageStore } from "@/lib/storageStore";

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

const isFavoriteRecipe = (f: unknown): f is FavoriteRecipe => {
  const c = f as FavoriteRecipe;
  return (
    !!c &&
    typeof c.id === "string" &&
    typeof c.titleBn === "string" &&
    typeof c.title === "string" &&
    Array.isArray(c.steps) &&
    Array.isArray(c.ingredientsList) &&
    Array.isArray(c.missingEssentials) &&
    Array.isArray(c.ingredientIds)
  );
};

const favoritesStore = createStorageStore<FavoriteRecipe[]>({
  key: "rannakori-favorites",
  fallback: [],
  validate: (raw) => (Array.isArray(raw) ? raw.filter(isFavoriteRecipe) : null),
});

export function useFavorites() {
  const favorites = favoritesStore.useStore();

  const addFavorite = useCallback((recipe: Omit<FavoriteRecipe, "id" | "savedAt">) => {
    const newFav: FavoriteRecipe = {
      ...recipe,
      id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    };
    favoritesStore.set((prev) => [newFav, ...prev]);
    return newFav.id;
  }, []);

  const removeFavorite = useCallback((id: string) => {
    favoritesStore.set((prev) => prev.filter((f) => f.id !== id));
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
