import { useState } from "react";
import { Ingredient } from "@/data/ingredients";

interface Substitute {
  original: string;
  substitute: string;
  compatibility: number;
  explanation: string;
}

interface AIRecipe {
  title: string;
  titleBn: string;
  prepTime: string;
  serves: string;
  difficulty: string;
  ingredientsList: string[];
  missingEssentials: string[];
  substitutes?: Substitute[];
  steps: string[];
}

interface RecipeCardProps {
  recipe: AIRecipe;
  usedItems: Ingredient[];
  onStartCooking?: () => void;
}

const RecipeCard = ({ recipe, usedItems, onStartCooking }: RecipeCardProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  const [expandedSub, setExpandedSub] = useState<number | null>(null);
  const [appliedSubs, setAppliedSubs] = useState<Set<string>>(new Set());
  const [showSubs, setShowSubs] = useState(false);

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const subsByOriginal = new Map<string, Substitute>();
  (recipe.substitutes || []).forEach((s) => subsByOriginal.set(s.original, s));

  const displayedMissing = recipe.missingEssentials.filter((m) => !appliedSubs.has(m));
  const availableSubs = (recipe.substitutes || []).filter((s) => !appliedSubs.has(s.original));

  const cookWithSubstitutes = () => {
    const allOriginals = availableSubs.map((s) => s.original);
    setAppliedSubs((prev) => new Set([...prev, ...allOriginals]));
  };


  return (
    <div>
      {/* Hero Section */}
      <div className="px-4 sm:px-6 py-3">
        <div className="w-full bg-primary/10 flex flex-col items-center justify-center overflow-hidden rounded-xl min-h-48 shadow-md p-6">
          <span className="material-symbols-outlined text-primary text-6xl mb-3 filled-icon">restaurant</span>
          <h1 className="text-2xl font-bold leading-tight text-center">{recipe.titleBn}</h1>
          <p className="text-sm text-muted-foreground mt-1">{recipe.title}</p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex justify-between px-6 py-4 bg-secondary mx-4 sm:mx-6 rounded-xl border border-border">
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-primary mb-1">schedule</span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase">সময়</span>
          <span className="text-sm font-bold">{recipe.prepTime}</span>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-primary mb-1">group</span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase">পরিবেশন</span>
          <span className="text-sm font-bold">{recipe.serves}</span>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-primary mb-1">restaurant</span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase">কঠিনতা</span>
          <span className="text-sm font-bold">{recipe.difficulty}</span>
        </div>
      </div>

      {/* Ingredients from Pantry */}
      <div className="px-4 sm:px-6 pt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            আপনার উপকরণ
          </h3>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {usedItems.length} টি
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          {usedItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center p-3 bg-card border border-border rounded-xl">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] mt-2 font-bold text-center">{item.localName}</span>
              <span className="text-[9px] text-muted-foreground text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full Ingredients List */}
      {recipe.ingredientsList && recipe.ingredientsList.length > 0 && (
          <div className="px-4 sm:px-6 pt-8">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">checklist</span>
            উপকরণ তালিকা
          </h3>
          <div className="bg-secondary rounded-xl p-4 space-y-2">
            {recipe.ingredientsList.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Essentials + Substitutes */}
      {displayedMissing.length > 0 && (
        <div className="px-4 sm:px-6 pt-8 space-y-4">
          {/* Amber attention header with copy icon */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl filled-icon flex-none mt-0.5">warning</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">
                    {displayedMissing.length}টি উপকরণ নেই
                  </h4>
                  <button
                    onClick={() => {
                      const text = displayedMissing.join("\n");
                      navigator.clipboard.writeText(text).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      });
                    }}
                    aria-label="অভাবী উপকরণ কপি করুন"
                    className="flex-none p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors text-amber-700 dark:text-amber-300"
                  >
                    <span className="material-symbols-outlined text-base">
                      {copied ? "check_circle" : "content_copy"}
                    </span>
                  </button>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-1 leading-relaxed">
                  {displayedMissing.join(" • ")}
                </p>
              </div>
            </div>
          </div>

          {/* Substitute suggestions - collapsible */}
          {availableSubs.length > 0 && (
            <div>
              <button
                onClick={() => setShowSubs((v) => !v)}
                className="w-full flex items-center justify-between gap-2 bg-card border border-border rounded-xl px-4 py-3 shadow-sm hover:border-primary/40 transition-colors"
              >
                <span className="text-base font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">swap_horiz</span>
                  বিকল্প উপকরণ
                </span>
                <span className="material-symbols-outlined text-muted-foreground">
                  {showSubs ? "expand_less" : "expand_more"}
                </span>
              </button>

              {showSubs && (
                <div className="space-y-3 mt-3">
                  {availableSubs.map((sub, idx) => {
                    const isExpanded = expandedSub === idx;
                    const compColor =
                      sub.compatibility >= 75
                        ? "bg-primary/10 text-primary"
                        : sub.compatibility >= 50
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                        : "bg-muted text-muted-foreground";
                    return (
                      <button
                        key={idx}
                        onClick={() => setExpandedSub(isExpanded ? null : idx)}
                        className="w-full text-left bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-sm font-bold flex-1 min-w-0 truncate">{sub.original}</span>
                          <span className="material-symbols-outlined text-muted-foreground text-base">arrow_forward</span>
                          <span className="text-sm font-bold flex-1 min-w-0 truncate">{sub.substitute}</span>
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${compColor}`}>
                            {sub.compatibility}% কাছাকাছি
                          </span>
                        </div>
                        {isExpanded && (
                          <p className="mt-3 text-xs text-muted-foreground leading-relaxed bg-secondary/50 rounded-lg p-3">
                            {sub.explanation}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {showSubs && (
                <button
                  onClick={cookWithSubstitutes}
                  className="mt-4 w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">restaurant</span>
                  বিকল্প উপকরণ দিয়ে রান্না করুন
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Applied substitutes confirmation */}
      {appliedSubs.size > 0 && (
        <div className="px-4 sm:px-6 pt-6">
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">check_circle</span>
            <p className="text-xs font-semibold text-primary">
              {appliedSubs.size}টি বিকল্প উপকরণ ব্যবহার করা হচ্ছে
            </p>
          </div>
        </div>
      )}

      {/* Step-by-Step Instructions */}
      <div className="px-4 sm:px-6 pt-10">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">receipt_long</span>
          রান্নার প্রণালী
        </h3>
        <div className="space-y-4">
          {recipe.steps.map((step, index) => {
            const isDone = completedSteps.has(index);
            return (
              <button
                key={index}
                onClick={() => toggleStep(index)}
                className="flex gap-4 w-full text-left group"
              >
                <div className="flex-none">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    isDone
                      ? "bg-muted text-muted-foreground line-through"
                      : "bg-primary text-primary-foreground"
                  }`}>
                    {isDone ? "✓" : index + 1}
                  </div>
                </div>
                <div className="pt-0.5">
                  <p className={`leading-relaxed text-sm transition-colors ${
                    isDone ? "line-through text-muted-foreground" : "text-muted-foreground"
                  }`}>
                    {step}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Start Cooking Button */}
      <div className="px-4 sm:px-6 pt-8 pb-28">
        <button
          onClick={() => onStartCooking?.()}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined filled-icon">skillet</span>
          শুরু করা যাক
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
