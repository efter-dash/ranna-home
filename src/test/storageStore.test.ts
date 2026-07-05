import { describe, it, expect, beforeEach } from "vitest";
import { createStorageStore } from "@/lib/storageStore";

interface Data {
  items: string[];
}

const KEY = "test-store";

const validate = (raw: unknown): Data | null => {
  const d = raw as Data;
  if (!d || !Array.isArray(d.items)) return null;
  return { items: d.items.filter((i) => typeof i === "string") };
};

const makeStore = () =>
  createStorageStore<Data>({
    key: KEY,
    fallback: { items: [] },
    validate,
  });

describe("createStorageStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the fallback when storage is empty", () => {
    const store = makeStore();
    expect(store.get()).toEqual({ items: [] });
  });

  it("loads persisted state from storage", () => {
    localStorage.setItem(KEY, JSON.stringify({ items: ["a", "b"] }));
    const store = makeStore();
    expect(store.get()).toEqual({ items: ["a", "b"] });
  });

  it("falls back when storage contains invalid JSON", () => {
    localStorage.setItem(KEY, "{not json");
    const store = makeStore();
    expect(store.get()).toEqual({ items: [] });
  });

  it("falls back when the stored shape fails validation", () => {
    localStorage.setItem(KEY, JSON.stringify(["wrong", "shape"]));
    const store = makeStore();
    expect(store.get()).toEqual({ items: [] });
  });

  it("strips invalid entries via validate on load", () => {
    localStorage.setItem(KEY, JSON.stringify({ items: ["a", 42, null, "b"] }));
    const store = makeStore();
    expect(store.get()).toEqual({ items: ["a", "b"] });
  });

  it("persists direct writes to storage", () => {
    const store = makeStore();
    store.set({ items: ["x"] });
    expect(store.get()).toEqual({ items: ["x"] });
    expect(JSON.parse(localStorage.getItem(KEY)!)).toEqual({ items: ["x"] });
  });

  it("supports functional updates based on previous state", () => {
    const store = makeStore();
    store.set({ items: ["x"] });
    store.set((prev) => ({ items: [...prev.items, "y"] }));
    expect(store.get()).toEqual({ items: ["x", "y"] });
  });

  it("notifies subscribers on every write, and stops after unsubscribe", () => {
    const store = makeStore();
    let notified = 0;
    const unsubscribe = store.subscribe(() => {
      notified += 1;
    });

    store.set({ items: ["a"] });
    store.set((prev) => ({ items: [...prev.items, "b"] }));
    expect(notified).toBe(2);

    unsubscribe();
    store.set({ items: [] });
    expect(notified).toBe(2);
  });
});
