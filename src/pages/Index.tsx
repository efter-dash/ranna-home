import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Fish } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { INGREDIENT_DATA, categories, Category } from "@/data/ingredients";
import HamburgerMenu from "@/components/HamburgerMenu";
import SearchFab from "@/components/SearchFab";

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
    <div className="relative flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="flex items-center justify-center mb-1 relative">
          <div className="absolute left-0">
            <HamburgerMenu />
          </div>
          <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-1">
            <span className="text-primary">রান্না</span>
            <Fish className="text-primary" size={22} />
            <span className="text-foreground">করি</span>
          </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">আপনার প্যান্ট্রি থেকে রান্না করুন</p>
          </div>
          <Link
            to="/favorites"
            className="absolute right-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
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
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide md:justify-center">
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
      <div className="flex-1 px-4 sm:px-6 lg:px-8 pt-4 pb-28">
        <p className="text-base font-semibold text-muted-foreground mb-3 text-center">
          আপনার বাসায় যা যা আছে বেছে নিন — <span className="font-bold text-primary transition-all duration-300">{selectedIngredients.size}</span> টি বাছাই
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
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
                    className="w-full h-full object-cover scale-110"
                    loading="lazy"
                    decoding="async"
                    fetchPriority={filteredIngredients.indexOf(item) < 6 ? "high" : "low"}
                  />
                </div>

                {/* Label */}
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

      <SearchFab onSelectIngredient={toggleIngredient} selectedIngredients={selectedIngredients} />

      {/* Floating Action Button */}
      {selectedIngredients.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 sm:px-6 lg:px-8 z-20">
          <div className="w-full sm:max-w-md sm:mx-auto flex items-center gap-2">
            <button
              onClick={() => setSelectedIngredients(new Set())}
              className="flex-shrink-0 w-12 h-12 rounded-2xl bg-destructive/90 text-destructive-foreground flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
              title="সব বাদ দিন"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
            </button>
            <button
              onClick={handleCookNow}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined filled-icon leading-none align-middle" style={{ fontSize: '20px' }}>skillet</span>
              <span className="leading-none">চলুন রান্না করি !</span>
              <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full leading-none">
                {selectedIngredients.size}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
