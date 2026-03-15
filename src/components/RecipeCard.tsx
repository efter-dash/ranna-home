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
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-accent">warning</span>
            <div>
              <h4 className="text-sm font-bold text-accent">প্রয়োজনীয় উপকরণ</h4>
              <p className="text-xs text-muted-foreground mt-1">
                এগুলো আপনার তালিকায় নেই কিন্তু রান্নায় দরকার: <strong>{recipe.missingEssentials.join(", ")}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Instructions */}
      <div className="px-4 sm:px-6 pt-10 pb-24">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">receipt_long</span>
          রান্নার প্রণালী
        </h3>
        <div className="space-y-6">
          {recipe.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-none">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
