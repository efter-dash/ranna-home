import { useState, useEffect, useCallback } from "react";

interface PantryData {
  ingredients: string[];
  categoryTimestamps: Record<string, number>;
}

const STORAGE_KEY = "rannakori-pantry";

const getInitialData = (): PantryData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { ingredients: [], categoryTimestamps: {} };
};

export const usePantry = () => {
  const [data, setData] = useState<PantryData>(getInitialData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addIngredient = useCallback((id: string, category: string) => {
    setData((prev) => {
      if (prev.ingredients.includes(id)) return prev;
      return {
        ingredients: [...prev.ingredients, id],
        categoryTimestamps: {
          ...prev.categoryTimestamps,
          [category]: Date.now(),
        },
      };
    });
  }, []);

  const removeIngredient = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i !== id),
    }));
  }, []);

  const addMultiple = useCallback((ids: string[], category: string) => {
    setData((prev) => {
      const newIds = ids.filter((id) => !prev.ingredients.includes(id));
      if (newIds.length === 0) return prev;
      return {
        ingredients: [...prev.ingredients, ...newIds],
        categoryTimestamps: {
          ...prev.categoryTimestamps,
          [category]: Date.now(),
        },
      };
    });
  }, []);

  const isStale = useCallback(
    (category: string): boolean => {
      const ts = data.categoryTimestamps[category];
      if (!ts) return true;
      return Date.now() - ts > 7 * 24 * 60 * 60 * 1000;
    },
    [data.categoryTimestamps]
  );

  return {
    pantryIngredients: data.ingredients,
    categoryTimestamps: data.categoryTimestamps,
    addIngredient,
    removeIngredient,
    addMultiple,
    isStale,
  };
};
