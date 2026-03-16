import { useState } from "react";
import { X, Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { INGREDIENT_DATA, categories, Category } from "@/data/ingredients";

interface PantryAddSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pantryIngredients: string[];
  onAdd: (id: string, category: string) => void;
  onRemove: (id: string) => void;
}

const PantryAddSheet = ({
  open,
  onOpenChange,
  pantryIngredients,
  onAdd,
  onRemove,
}: PantryAddSheetProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = INGREDIENT_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesQuery =
      query.trim().length === 0 ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.localName.includes(query);
    return matchesCategory && matchesQuery;
  });

  const inPantry = new Set(pantryIngredients);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-0">
        <SheetHeader className="px-4 pb-2">
          <SheetTitle className="text-center text-lg">উপকরণ যোগ করুন</SheetTitle>
        </SheetHeader>

        {/* Search */}
        <div className="px-4 pb-2">
          <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-2">
            <Search size={16} className="text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="খুঁজুন..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X size={14} className="text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {filtered.map((item) => {
              const isInPantry = inPantry.has(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    isInPantry ? onRemove(item.id) : onAdd(item.id, item.category)
                  }
                  className={`relative flex flex-col items-center rounded-xl overflow-hidden border-2 transition-all ${
                    isInPantry
                      ? "border-primary shadow-md shadow-primary/20"
                      : "border-border"
                  }`}
                >
                  <div className="w-full aspect-square bg-muted overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full px-1.5 py-1.5 text-center bg-card">
                    <p className="text-[11px] font-bold truncate">{item.localName}</p>
                    <p className="text-[9px] text-muted-foreground truncate">{item.name}</p>
                  </div>
                  {isInPantry && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary-foreground filled-icon" style={{ fontSize: "14px" }}>check</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PantryAddSheet;
