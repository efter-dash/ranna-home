import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ingredients } from "@/data/ingredients";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecipeHistory } from "@/hooks/useRecipeHistory";
import RecipeCard from "@/components/RecipeCard";
import RecipeHistorySheet from "@/components/RecipeHistorySheet";

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

const RecipePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedIds = searchParams.get("ingredients")?.split(",") || [];
  const usedItems = ingredients.filter((i) => selectedIds.includes(i.id));

  const [recipes, setRecipes] = useState<AIRecipe[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorited, getFavoriteByTitle } = useFavorites();
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
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

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

        if (fnError) throw fnError;
        if (data?.error) throw new Error(data.error);

        // New response format: { recipes: [...], multiple: bool }
        if (data?.recipes && Array.isArray(data.recipes)) {
          setRecipes(data.recipes);
        } else {
          // Fallback for old format
          setRecipes([data]);
        }
      } catch (err: any) {
        console.error("Recipe generation error:", err);
        const msg = err?.message || "রেসিপি তৈরি করতে সমস্যা হয়েছে";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    if (usedItems.length > 0) {
      fetchRecipe();
    }
  }, []);

  // Save recipes to history when loaded
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
      <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-card shadow-xl items-center justify-center gap-6">
        {/* Frying pan with steam */}
        <div className="relative flex items-center justify-center">
          {/* Steam wisps */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
            <span className="block w-1.5 rounded-full bg-primary/40 animate-steam-1 h-5" />
            <span className="block w-1.5 rounded-full bg-primary/30 animate-steam-2 h-7" />
            <span className="block w-1.5 rounded-full bg-primary/40 animate-steam-3 h-4" />
          </div>
          {/* Pan icon */}
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
      <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-card shadow-xl items-center justify-center gap-4 px-6">
        <span className="material-symbols-outlined text-4xl text-destructive">error</span>
        <p className="text-lg font-bold text-center">রেসিপি তৈরি করতে সমস্যা হয়েছে</p>
        <p className="text-sm text-muted-foreground text-center">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

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
          {recipe?.titleBn}
        </h2>
        <button
          onClick={handleToggleFavorite}
          className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 hover:bg-secondary transition-colors"
        >
          <span className={`material-symbols-outlined ${isCurrentFavorited ? "text-accent filled-icon" : "text-muted-foreground"}`}>
            favorite
          </span>
        </button>
      </div>

      {/* Recipe Tabs - show only when multiple recipes */}
      {isMultiple && (
        <div className="flex gap-2 px-4 pt-3 overflow-x-auto">
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

      {recipe && (
        <RecipeCard
          recipe={recipe}
          usedItems={usedItems}
        />
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border flex gap-2 px-4 pb-6 pt-3">
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
          onClick={() => navigate("/")}
          className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">kitchen</span>
          <p className="text-[10px] font-medium leading-normal tracking-wider">প্যান্ট্রি</p>
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
