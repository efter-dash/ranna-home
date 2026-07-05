import { useCallback } from "react";
import { createStorageStore } from "@/lib/storageStore";

export interface RecipeHistoryEntry {
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
  timestamp: number;
}

const MAX_ENTRIES = 20;

const isHistoryEntry = (h: unknown): h is RecipeHistoryEntry => {
  const c = h as RecipeHistoryEntry;
  return (
    !!c &&
    typeof c.id === "string" &&
    typeof c.titleBn === "string" &&
    typeof c.title === "string" &&
    typeof c.timestamp === "number" &&
    Array.isArray(c.steps) &&
    Array.isArray(c.ingredientsList) &&
    Array.isArray(c.missingEssentials) &&
    Array.isArray(c.ingredientIds)
  );
};

const historyStore = createStorageStore<RecipeHistoryEntry[]>({
  key: "recipe_history_session",
  fallback: [],
  validate: (raw) => (Array.isArray(raw) ? raw.filter(isHistoryEntry) : null),
  storage: () => sessionStorage,
});

export function useRecipeHistory() {
  const history = historyStore.useStore();

  const addToHistory = useCallback((entry: Omit<RecipeHistoryEntry, "id" | "timestamp">) => {
    historyStore.set((prev) => {
      // Avoid duplicates by titleBn; keep the existing id so ?historyId= links stay valid
      const existing = prev.find((h) => h.titleBn === entry.titleBn);
      const filtered = prev.filter((h) => h.titleBn !== entry.titleBn);
      const newEntry: RecipeHistoryEntry = {
        ...entry,
        id: existing?.id ?? crypto.randomUUID(),
        timestamp: Date.now(),
      };
      return [newEntry, ...filtered].slice(0, MAX_ENTRIES);
    });
  }, []);

  const clearHistory = useCallback(() => {
    historyStore.set([]);
  }, []);

  return { history, addToHistory, clearHistory };
}
