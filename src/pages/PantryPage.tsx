import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INGREDIENT_DATA, categories } from "@/data/ingredients";
import { usePantry } from "@/hooks/usePantry";
import HamburgerMenu from "@/components/HamburgerMenu";
import PantryAddSheet from "@/components/PantryAddSheet";

const CATEGORY_LABELS: Record<string, string> = {
  Vegetable: "শাকসবজি",
  Fish: "মাছ",
  Meat: "মাংস",
  Essential: "মশলা ও অন্যান্য",
};

const PantryPage = () => {
  const navigate = useNavigate();
  const {
    pantryIngredients,
    addIngredient,
    removeIngredient,
    isStale,
  } = usePantry();
  const [sheetOpen, setSheetOpen] = useState(false);

  const pantryItems = INGREDIENT_DATA.filter((i) =>
    pantryIngredients.includes(i.id)
  );

  const grouped = categories.reduce(
    (acc, cat) => {
      acc[cat.id] = pantryItems.filter((i) => i.category === cat.id);
      return acc;
    },
    {} as Record<string, typeof pantryItems>
  );

  const handleCook = () => {
    if (pantryIngredients.length === 0) return;
    const ids = pantryIngredients.join(",");
    navigate(`/recipe?ingredients=${ids}`);
  };

  const staleCategories = categories
    .filter((cat) => grouped[cat.id].length > 0 && isStale(cat.id))
    .map((cat) => CATEGORY_LABELS[cat.id] || cat.label);

  return (
    <div className="relative flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 sm:px-6 pt-5 pb-4">
        <div className="flex items-center justify-center relative">
          <div className="absolute left-0">
            <HamburgerMenu />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            <span className="material-symbols-outlined text-primary align-middle mr-1" style={{ fontSize: "24px" }}>
              kitchen
            </span>
            আমার প্যান্ট্রি
          </h1>
        </div>
      </div>

      {/* Stale warning */}
      {staleCategories.length > 0 && (
        <div
          className="mx-4 sm:mx-6 mt-4 rounded-lg px-4 py-3 border-l-[3px]"
          style={{
            backgroundColor: "hsl(var(--pantry-warning))",
            borderLeftColor: "hsl(var(--pantry-warning-border))",
          }}
        >
          <div className="flex items-start gap-2">
            <span
              className="material-symbols-outlined filled-icon flex-shrink-0 mt-0.5"
              style={{ fontSize: "18px", color: "hsl(var(--pantry-warning-border))" }}
            >
              warning
            </span>
            <p className="text-sm text-foreground">
              <span className="font-semibold">{staleCategories.join(", ")}</span> ৭ দিনের বেশি আপডেট হয়নি। আপনার প্যান্ট্রি আপডেট করুন।
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 pt-4">
        {pantryIngredients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span
              className="material-symbols-outlined text-muted-foreground mb-3"
              style={{ fontSize: "48px" }}
            >
              kitchen
            </span>
            <p className="text-muted-foreground text-sm">
              আপনার প্যান্ট্রিতে কিছু নেই
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              নিচের + বাটনে চাপ দিয়ে উপকরণ যোগ করুন
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {categories.map((cat) => {
              const items = grouped[cat.id];
              if (items.length === 0) return null;
              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: "18px" }}>
                      {cat.icon}
                    </span>
                    <h2 className="text-sm font-bold text-foreground">
                      {CATEGORY_LABELS[cat.id] || cat.label}
                    </h2>
                    <span className="text-xs text-muted-foreground">({items.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-1.5 pl-1.5 pr-1 py-1 rounded-full border"
                        style={{
                          backgroundColor: "hsl(var(--pantry-chip))",
                          borderColor: "hsl(var(--pantry-chip-border))",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.localName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                          {item.localName}
                        </span>
                        <button
                          onClick={() => removeIngredient(item.id)}
                          className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-destructive/10 transition-colors"
                        >
                          <span
                            className="material-symbols-outlined text-muted-foreground"
                            style={{ fontSize: "14px" }}
                          >
                            close
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FAB + */}
      <button
        onClick={() => setSheetOpen(true)}
        className="fixed right-4 sm:right-6 bottom-20 z-30 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>add</span>
      </button>

      {/* Cook CTA */}
      {pantryIngredients.length > 0 && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 sm:px-6 z-20">
          <button
            onClick={handleCook}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined filled-icon" style={{ fontSize: "20px" }}>skillet</span>
            রান্না শুরু করুন
            <span className="bg-primary-foreground/20 text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {pantryIngredients.length}
            </span>
          </button>
        </div>
      )}

      <PantryAddSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        pantryIngredients={pantryIngredients}
        onAdd={addIngredient}
        onRemove={removeIngredient}
      />
    </div>
  );
};

export default PantryPage;
