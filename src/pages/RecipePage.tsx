import { useSearchParams, useNavigate } from "react-router-dom";
import { ingredients } from "@/data/ingredients";
import { generateMockRecipe } from "@/data/recipes";

const RecipePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedIds = searchParams.get("ingredients")?.split(",") || [];
  const recipe = generateMockRecipe(selectedIds);
  const usedItems = ingredients.filter((i) => selectedIds.includes(i.id));

  return (
    <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-card shadow-xl">
      {/* Header */}
      <div className="flex items-center bg-card p-4 pb-2 sticky top-0 z-10 border-b border-border justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-secondary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-base font-bold leading-tight tracking-tight flex-1 text-center px-2 truncate">
          {recipe.title}
        </h2>
        <button className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 hover:bg-secondary transition-colors">
          <span className="material-symbols-outlined text-accent filled-icon">favorite</span>
        </button>
      </div>

      {/* Hero Image */}
      <div className="px-4 py-3">
        <div
          className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-72 shadow-md relative"
          style={{ backgroundImage: `url("${recipe.image}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative p-4">
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
              Authentic Recipe
            </span>
            <h1 className="text-2xl font-bold leading-tight" style={{ color: "white" }}>
              {recipe.title}
            </h1>
            <p className="text-sm font-medium mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>
              {recipe.titleBn}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex justify-between px-6 py-4 bg-secondary mx-4 rounded-xl border border-border">
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-primary mb-1">schedule</span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase">Prep Time</span>
          <span className="text-sm font-bold">{recipe.prepTime}</span>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-primary mb-1">group</span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase">Serves</span>
          <span className="text-sm font-bold">{recipe.serves}</span>
        </div>
        <div className="w-px bg-border" />
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-primary mb-1">restaurant</span>
          <span className="text-[10px] font-semibold text-muted-foreground uppercase">Difficulty</span>
          <span className="text-sm font-bold">{recipe.difficulty}</span>
        </div>
      </div>

      {/* Ingredients from Pantry */}
      <div className="px-4 pt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            Ingredients from your Pantry
          </h3>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {usedItems.length} Used
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {usedItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center p-3 bg-card border border-border rounded-xl">
              <span className="material-symbols-outlined text-muted-foreground">{item.icon}</span>
              <span className="text-[10px] mt-2 font-medium text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Essentials */}
      {recipe.missingEssentials.length > 0 && (
        <div className="px-4 pt-6">
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
            <span className="material-symbols-outlined text-accent">warning</span>
            <div>
              <h4 className="text-sm font-bold text-accent">Missing Essentials</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Make sure you have <strong>{recipe.missingEssentials.join("</strong> and <strong>")}</strong>. They aren't in your pantry list but are vital for the flavor!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step Instructions */}
      <div className="px-4 pt-8 pb-24">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">receipt_long</span>
          Step-by-Step Instructions
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
                <p
                  className="text-muted-foreground leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{
                    __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>'),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border flex gap-2 px-4 pb-6 pt-3">
        <button
          onClick={() => navigate("/")}
          className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">home</span>
          <p className="text-[10px] font-medium leading-normal tracking-wider">Home</p>
        </button>
        <div className="flex flex-1 flex-col items-center justify-end gap-1 text-primary">
          <span className="material-symbols-outlined filled-icon">restaurant_menu</span>
          <p className="text-[10px] font-bold leading-normal tracking-wider">Recipe</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">kitchen</span>
          <p className="text-[10px] font-medium leading-normal tracking-wider">Pantry</p>
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
