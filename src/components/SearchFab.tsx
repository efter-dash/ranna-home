import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { INGREDIENT_DATA } from "@/data/ingredients";

interface SearchFabProps {
  onSelectIngredient: (id: string) => void;
  selectedIngredients: Set<string>;
  hasSelection?: boolean;
}

const SearchFab = ({ onSelectIngredient, selectedIngredients, hasSelection = false }: SearchFabProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const results = query.trim().length > 0
    ? INGREDIENT_DATA.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.localName.includes(query)
      ).slice(0, 8)
    : [];

  return (
    <div ref={containerRef} className={`fixed right-4 sm:right-6 z-30 flex flex-col items-end gap-2 transition-all duration-300 ${hasSelection ? 'bottom-32' : 'bottom-6'}`}>
      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="w-72 max-h-64 overflow-y-auto rounded-2xl bg-card border border-border shadow-xl">
          {results.map((item) => {
            const isSelected = selectedIngredients.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectIngredient(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-secondary/60 ${
                  isSelected ? "bg-primary/10" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold truncate">{item.localName}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                </div>
                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-base filled-icon">check_circle</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {isOpen && query.trim().length > 0 && results.length === 0 && (
        <div className="w-72 rounded-2xl bg-card border border-border shadow-xl px-4 py-6 text-center text-sm text-muted-foreground">
          কিছু পাওয়া যায়নি
        </div>
      )}

      {/* Search bar / FAB */}
      <div
        className={`flex items-center rounded-full shadow-xl transition-all duration-300 ${
          isOpen
            ? "w-72 bg-card border border-border px-3 py-2"
            : "w-12 h-12 bg-primary justify-center cursor-pointer hover:scale-105"
        }`}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {isOpen ? (
          <>
            <Search className="text-muted-foreground flex-shrink-0" size={18} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="খুঁজুন... / Search..."
              className="flex-1 bg-transparent text-sm outline-none px-2 text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                setQuery("");
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <Search className="text-primary-foreground" size={20} />
        )}
      </div>
    </div>
  );
};

export default SearchFab;
