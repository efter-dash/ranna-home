import { useSyncExternalStore } from "react";

export interface StorageStore<T> {
  useStore: () => T;
  get: () => T;
  set: (next: T | ((prev: T) => T)) => void;
  subscribe: (listener: () => void) => () => void;
}

/**
 * A tiny shared store backed by web storage. Every component reading it via
 * `useStore()` sees the same state and re-renders on writes, unlike per-hook
 * `useState(loadFromStorage)` copies that silently diverge.
 *
 * `validate` guards against corrupted or legacy values already in storage:
 * return null to reject and fall back to `fallback`.
 */
export function createStorageStore<T>(opts: {
  key: string;
  fallback: T;
  validate: (raw: unknown) => T | null;
  storage?: () => Storage;
}): StorageStore<T> {
  const getStorage = opts.storage ?? (() => localStorage);

  const load = (): T => {
    try {
      const raw = getStorage().getItem(opts.key);
      if (raw !== null) {
        const validated = opts.validate(JSON.parse(raw));
        if (validated !== null) return validated;
      }
    } catch {
      // Unreadable storage or invalid JSON: fall through to the fallback
    }
    return opts.fallback;
  };

  let cache: T = load();
  const listeners = new Set<() => void>();

  const get = () => cache;

  const set = (next: T | ((prev: T) => T)) => {
    cache = typeof next === "function" ? (next as (prev: T) => T)(cache) : next;
    try {
      getStorage().setItem(opts.key, JSON.stringify(cache));
    } catch (e) {
      // Quota exceeded or storage unavailable: keep the in-memory state usable
      console.error(`Failed to persist "${opts.key}":`, e);
    }
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const useStore = () => useSyncExternalStore(subscribe, get, get);

  return { useStore, get, set, subscribe };
}
