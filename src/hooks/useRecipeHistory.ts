import { useState, useEffect, useCallback } from "react";

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

const HISTORY_KEY = "recipe_history_session";

function getHistory(): RecipeHistoryEntry[] {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useRecipeHistory() {
  const [history, setHistory] = useState<RecipeHistoryEntry[]>(getHistory);

  const addToHistory = useCallback((entry: Omit<RecipeHistoryEntry, "id" | "timestamp">) => {
    setHistory((prev) => {
      // Avoid duplicates by titleBn
      const filtered = prev.filter((h) => h.titleBn !== entry.titleBn);
      const newEntry: RecipeHistoryEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      const updated = [newEntry, ...filtered].slice(0, 20); // Keep max 20
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    sessionStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  }, []);

  // Sync on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return { history, addToHistory, clearHistory };
}
