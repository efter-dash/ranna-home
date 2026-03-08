import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Fish } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { INGREDIENT_DATA, categories, Category } from "@/data/ingredients";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const shuffledAll = useMemo(
    () => [...INGREDIENT_DATA].sort(() => Math.random() - 0.5),
    []
  );

  const filteredIngredients = selectedCategory === "all"
    ? shuffledAll
    : INGREDIENT_DATA.filter((i) => i.category === selectedCategory);

  const toggleIngredient = (id: string) => {
    setSelectedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCookNow = () => {
    if (selectedIngredients.size === 0) return;
    const ids = Array.from(selectedIngredients).join(",");
    navigate(`/recipe?ingredients=${ids}`);
  };

  return (
    <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-card shadow-xl">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-1">
          <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-1">
            <span className="text-primary">রান্না</span>
            <Fish className="text-primary" size={22} />
            <span className="text-foreground">করি</span>
          </h1>
            <p className="text-xs text-muted-foreground mt-0.5">আপনার প্যান্ট্রি থেকে রান্না করুন</p>
          </div>
          <Link
            to="/favorites"
            className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined text-primary">favorite</span>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            <span className="material-symbols-outlined text-sm">grid_view</span>
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <span className="material-symbols-outlined text-sm">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient Grid */}
      <div className="flex-1 px-4 pt-4 pb-28">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          আপনার বাসায় যা যা আছে বেছে নিন — <span className="font-semibold text-primary">{selectedIngredients.size}</span> টি বাছাই
        </p>
        <div className="grid grid-cols-3 gap-3">
          {filteredIngredients.map((item) => {
            const isSelected = selectedIngredients.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleIngredient(item.id)}
                className={`relative flex flex-col items-center rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-primary shadow-md shadow-primary/20 scale-[1.02]"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {/* Image */}
                <div className="w-full aspect-square bg-muted overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Label - localName prominent, English name smaller */}
                <div className="w-full px-2 py-2 text-center bg-card">
                  <p className="text-xs font-bold truncate">{item.localName}</p>
                  <p className="text-[10px] text-muted-foreground">{item.name}</p>
                </div>

                {/* Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-primary-foreground text-sm filled-icon">check</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      {selectedIngredients.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
          <button
            onClick={handleCookNow}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/30 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined filled-icon">skillet</span>
            Ranna Kori — Cook Now!
            <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full ml-1">
              {selectedIngredients.size}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
