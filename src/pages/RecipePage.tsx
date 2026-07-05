import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ingredients } from "@/data/ingredients";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecipeHistory } from "@/hooks/useRecipeHistory";
import RecipeCard from "@/components/RecipeCard";
import RecipeHistorySheet from "@/components/RecipeHistorySheet";
import CookMode from "@/components/CookMode";

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
  stepTimers?: number[];
  stepTitles?: string[];
  stepTips?: string[];
}

// AI output is untrusted input — verify the fields the UI dereferences before rendering
const isValidRecipe = (r: unknown): r is AIRecipe => {
  const c = r as AIRecipe;
  return (
    !!c &&
    typeof c.titleBn === "string" &&
    typeof c.title === "string" &&
    Array.isArray(c.steps) &&
    c.steps.length > 0 &&
    Array.isArray(c.ingredientsList) &&
    Array.isArray(c.missingEssentials)
  );
};

const RecipePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ingredientsParam = searchParams.get("ingredients") ?? "";
  const favoriteId = searchParams.get("favoriteId");
  const historyId = searchParams.get("historyId");
  const selectedIds = ingredientsParam ? ingredientsParam.split(",") : [];
  const usedItems = ingredients.filter((i) => selectedIds.includes(i.id));

  const [recipes, setRecipes] = useState<AIRecipe[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCookMode, setShowCookMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { favorites, addFavorite, removeFavorite, isFavorited, getFavoriteByTitle } = useFavorites();
  const { history, addToHistory, clearHistory } = useRecipeHistory();

  const recipe = recipes[activeIndex] || null;
  const isCurrentFavorited = recipe ? isFavorited(recipe.titleBn) : false;
  const isMultiple = recipes.length > 1;

  const handleToggleFavorite = () => {
    if (!recipe) return;
    if (isCurrentFavorited) {
      const fav = getFavoriteByTitle(recipe.titleBn);
      if (fav) removeFavorite(fav.id);
      toast("প্রিয় তালিকা থেকে সরানো হয়েছে");
    } else {
      addFavorite({
        titleBn: recipe.titleBn,
        title: recipe.title,
        prepTime: recipe.prepTime,
        serves: recipe.serves,
        difficulty: recipe.difficulty,
        ingredientsList: recipe.ingredientsList,
        missingEssentials: recipe.missingEssentials,
        steps: recipe.steps,
        ingredientIds: selectedIds,
      });
      toast("প্রিয় তালিকায় যোগ করা হয়েছে!");
    }
  };

  useEffect(() => {
    // Saved favorite or history entry: render it directly, no AI call
    const saved = favoriteId
      ? favorites.find((f) => f.id === favoriteId)
      : historyId
        ? history.find((h) => h.id === historyId)
        : undefined;
    if (saved) {
      setRecipes([saved]);
      setActiveIndex(0);
      setLoading(false);
      setError(null);
      return;
    }

    // Nothing valid to cook with: don't strand the user on the loading spinner
    if (usedItems.length === 0) {
      navigate("/", { replace: true });
      return;
    }

    let cancelled = false;

    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      setActiveIndex(0);

      try {
        const ingredientData = usedItems.map((i) => ({
          name: i.name,
          localName: i.localName,
          category: i.category,
        }));

        const { data, error: fnError } = await supabase.functions.invoke(
          "generate-recipe",
          { body: { ingredients: ingredientData } }
        );

        if (cancelled) return;
        if (fnError) throw fnError;
        if (data?.error) throw new Error(data.error);

        const raw = Array.isArray(data?.recipes) ? data.recipes : [data];
        const valid = raw.filter(isValidRecipe);
        if (valid.length === 0) throw new Error("রেসিপি তৈরি করতে সমস্যা হয়েছে");
        setRecipes(valid);
      } catch (err: any) {
        if (cancelled) return;
        console.error("Recipe generation error:", err);
        const msg = err?.message || "রেসিপি তৈরি করতে সমস্যা হয়েছে";
        setError(msg);
        toast.error(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRecipe();
    return () => {
      cancelled = true;
    };
    // `favorites`/`history` intentionally omitted: changing them on-page must not refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsParam, favoriteId, historyId]);

  useEffect(() => {
    if (recipes.length > 0) {
      recipes.forEach((r) => {
        addToHistory({
          titleBn: r.titleBn,
          title: r.title,
          prepTime: r.prepTime,
          serves: r.serves,
          difficulty: r.difficulty,
          ingredientsList: r.ingredientsList,
          missingEssentials: r.missingEssentials,
          steps: r.steps,
          ingredientIds: selectedIds,
        });
      });
    }
  }, [recipes]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl items-center justify-center gap-6">
        <div className="relative flex items-center justify-center">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="block w-1.5 rounded-full bg-primary/40 animate-steam-1 h-5" />
            <span className="block w-1.5 rounded-full bg-primary/30 animate-steam-2 h-7" />
            <span className="block w-1.5 rounded-full bg-primary/40 animate-steam-3 h-4" />
          </div>
          <span className="material-symbols-outlined text-primary text-6xl animate-pan-rock">skillet</span>
        </div>
        <p className="text-lg font-bold text-primary">রেসিপি তৈরি হচ্ছে...</p>
        <p className="text-sm text-muted-foreground text-center px-8">
          আপনার নির্বাচিত উপকরণ দিয়ে সুস্বাদু রেসিপি তৈরি করা হচ্ছে
        </p>
        <div className="flex flex-wrap gap-2 justify-center px-6 mt-2">
          {usedItems.map((item) => (
            <span key={item.id} className="text-xs bg-secondary px-2 py-1 rounded-full">
              {item.localName}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (error || recipes.length === 0) {
    return (
      <div className="relative flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 min-h-[70vh]">
          <span className="material-symbols-outlined text-5xl text-muted-foreground">soup_kitchen</span>
          <p className="text-lg font-bold text-center">রেসিপি তৈরি করতে সমস্যা হয়েছে</p>
          <p className="text-sm text-muted-foreground text-center max-w-xs">{error || "আবার চেষ্টা করুন"}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl">
      {/* Header */}
      <div className="flex items-center bg-card p-4 sm:px-6 lg:px-8 pb-2 sticky top-0 z-10 border-b border-border justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-secondary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-base sm:text-lg font-bold leading-tight tracking-tight flex-1 text-center px-2 truncate">
          {recipe?.titleBn}
        </h2>
        <div className="flex items-center gap-1">
          <RecipeHistorySheet history={history} onClear={clearHistory} />
          <button
            onClick={handleToggleFavorite}
            className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 hover:bg-secondary transition-colors"
          >
            <span className={`material-symbols-outlined ${isCurrentFavorited ? "text-accent filled-icon" : "text-muted-foreground"}`}>
              favorite
            </span>
          </button>
        </div>
      </div>

      {/* Recipe Tabs */}
      {isMultiple && (
        <div className="flex gap-2 px-4 sm:px-6 lg:px-8 pt-3 overflow-x-auto">
          {recipes.map((r, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-1 min-w-0 py-2.5 px-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeIndex === idx
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              <span className="material-symbols-outlined text-base">restaurant_menu</span>
              <span className="truncate">{r.titleBn?.split(" ").slice(-2).join(" ") || `রেসিপি ${idx + 1}`}</span>
            </button>
          ))}
        </div>
      )}

      <div className="max-w-2xl mx-auto w-full">
        {recipe && (
          <RecipeCard
            recipe={recipe}
            usedItems={usedItems}
            onStartCooking={() => setShowCookMode(true)}
          />
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl bg-card border-t border-border flex gap-2 px-4 pb-6 pt-3">
        <button
          onClick={() => navigate("/")}
          className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">home</span>
          <p className="text-[10px] font-medium leading-normal tracking-wider">হোম</p>
        </button>
        <div className="flex flex-1 flex-col items-center justify-end gap-1 text-primary">
          <span className="material-symbols-outlined filled-icon">restaurant_menu</span>
          <p className="text-[10px] font-bold leading-normal tracking-wider">রেসিপি</p>
        </div>
        <button
          onClick={() => navigate("/favorites")}
          className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">favorite</span>
          <p className="text-[10px] font-medium leading-normal tracking-wider">ফেভারিট</p>
        </button>
        <button
          onClick={() => navigate("/history")}
          className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">schedule</span>
          <p className="text-[10px] font-medium leading-normal tracking-wider">ইতিহাস</p>
        </button>
      </div>

      {/* Cook Mode Overlay */}
      {showCookMode && recipe && (
        <CookMode
          steps={recipe.steps}
          stepTitles={recipe.stepTitles}
          stepTimers={recipe.stepTimers}
          stepTips={recipe.stepTips}
          onClose={() => setShowCookMode(false)}
        />
      )}
    </div>
  );
};

export default RecipePage;
