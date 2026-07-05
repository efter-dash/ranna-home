import { useCallback } from "react";
import { createStorageStore } from "@/lib/storageStore";
import { INGREDIENT_BY_ID } from "@/data/ingredients";

interface PantryData {
  ingredients: string[];
  categoryTimestamps: Record<string, number>;
}

const STALE_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

const pantryStore = createStorageStore<PantryData>({
  key: "rannakori-pantry",
  fallback: { ingredients: [], categoryTimestamps: {} },
  validate: (raw) => {
    const d = raw as PantryData;
    if (
      !d ||
      !Array.isArray(d.ingredients) ||
      typeof d.categoryTimestamps !== "object" ||
      d.categoryTimestamps === null
    ) {
      return null;
    }
    return {
      ingredients: d.ingredients.filter((i) => typeof i === "string"),
      categoryTimestamps: d.categoryTimestamps,
    };
  },
});

const categoryOf = (id: string) => INGREDIENT_BY_ID.get(id)?.category;

export const usePantry = () => {
  const data = pantryStore.useStore();

  const addIngredient = useCallback((id: string, category: string) => {
    pantryStore.set((prev) => {
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
    pantryStore.set((prev) => {
      const ingredients = prev.ingredients.filter((i) => i !== id);
      const categoryTimestamps = { ...prev.categoryTimestamps };
      // Drop the category timestamp when its last item leaves, so a later
      // re-add starts the staleness clock fresh instead of inheriting it
      const category = categoryOf(id);
      if (category && !ingredients.some((i) => categoryOf(i) === category)) {
        delete categoryTimestamps[category];
      }
      return { ingredients, categoryTimestamps };
    });
  }, []);

  const isStale = useCallback(
    (category: string): boolean => {
      const ts = data.categoryTimestamps[category];
      if (!ts) return true;
      return Date.now() - ts > STALE_AFTER_MS;
    },
    [data.categoryTimestamps]
  );

  return {
    pantryIngredients: data.ingredients,
    addIngredient,
    removeIngredient,
    isStale,
  };
};
