import { useState } from "react";
import { Ingredient } from "@/data/ingredients";

interface AIRecipe {
  title: string;
  titleBn: string;
  prepTime: string;
  serves: string;
  difficulty: string;
  ingredientsList: string[];
  missingEssentials: string[];
  steps: string[];
}

interface RecipeCardProps {
  recipe: AIRecipe;
  usedItems: Ingredient[];
}

const RecipeCard = ({ recipe, usedItems }: RecipeCardProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
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

      {/* Missing Essentials */}
      {recipe.missingEssentials && recipe.missingEssentials.length > 0 && (
        <div className="px-4 sm:px-6 pt-8">
          <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-2xl filled-icon flex-none mt-0.5">warning</span>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">প্রয়োজনীয় উপকরণ</h4>
                <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-1 leading-relaxed">
                  এগুলো আপনার তালিকায় নেই কিন্তু রান্নায় দরকার: <strong>{recipe.missingEssentials.join(", ")}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const text = recipe.missingEssentials.join("\n");
                navigator.clipboard.writeText(text).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
              }}
              className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-lg bg-amber-200/60 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors"
            >
              <span className="material-symbols-outlined text-base">{copied ? "check_circle" : "content_copy"}</span>
              {copied ? "কপি হয়েছে!" : "উপকরণ কপি করুন"}
            </button>
          </div>
        </div>
      )}

      {/* Step-by-Step Instructions */}
      <div className="px-4 sm:px-6 pt-10 pb-24">
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
    </div>
  );
};

export default RecipeCard;
