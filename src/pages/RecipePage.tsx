import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ingredients } from "@/data/ingredients";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  const [recipe, setRecipe] = useState<AIRecipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const ingredientData = usedItems.map((i) => ({
          name: i.name,
          localName: i.localName,
        }));

        const { data, error: fnError } = await supabase.functions.invoke(
          "generate-recipe",
          { body: { ingredients: ingredientData } }
        );

        if (fnError) throw fnError;
        if (data?.error) throw new Error(data.error);

        setRecipe(data);
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

  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full max-w-md mx-auto flex-col bg-card shadow-xl items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
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

  if (error || !recipe) {
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

  const difficultyMap: Record<string, string> = {
    সহজ: "Easy",
    মাঝারি: "Medium",
    কঠিন: "Hard",
  };

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
          {recipe.titleBn}
        </h2>
        <button className="flex cursor-pointer items-center justify-center rounded-full h-10 w-10 hover:bg-secondary transition-colors">
          <span className="material-symbols-outlined text-accent filled-icon">favorite</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-3">
        <div className="w-full bg-primary/10 flex flex-col items-center justify-center overflow-hidden rounded-xl min-h-48 shadow-md p-6">
          <span className="material-symbols-outlined text-primary text-6xl mb-3 filled-icon">restaurant</span>
          <h1 className="text-2xl font-bold leading-tight text-center">{recipe.titleBn}</h1>
          <p className="text-sm text-muted-foreground mt-1">{recipe.title}</p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="flex justify-between px-6 py-4 bg-secondary mx-4 rounded-xl border border-border">
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
      <div className="px-4 pt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            আপনার উপকরণ
          </h3>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {usedItems.length} টি
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
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
        <div className="px-4 pt-6">
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
        <div className="px-4 pt-6">
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
      <div className="px-4 pt-8 pb-24">
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
