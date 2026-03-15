import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RecipeHistoryEntry } from "@/hooks/useRecipeHistory";
import { useNavigate } from "react-router-dom";

interface RecipeHistorySheetProps {
  history: RecipeHistoryEntry[];
  onClear: () => void;
}

const RecipeHistorySheet = ({ history, onClear }: RecipeHistorySheetProps) => {
  const navigate = useNavigate();

  const handleRecipeClick = (entry: RecipeHistoryEntry) => {
    if (entry.ingredientIds.length > 0) {
      navigate(`/recipe?ingredients=${entry.ingredientIds.join(",")}`);
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button data-history-trigger className="flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-secondary transition-colors">
          <span className="material-symbols-outlined">history</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0">
        <SheetHeader className="px-4 pt-4 pb-3 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-base">
            <span className="material-symbols-outlined text-primary">history</span>
            রেসিপি ইতিহাস
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
              <span className="material-symbols-outlined text-4xl text-muted-foreground/40">menu_book</span>
              <p className="text-sm text-muted-foreground">এই সেশনে এখনো কোনো রেসিপি দেখা হয়নি</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-border">
                {history.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => handleRecipeClick(entry)}
                    className="w-full text-left px-4 py-3.5 hover:bg-secondary/60 transition-colors flex items-start gap-3"
                  >
                    <div className="flex-none mt-0.5">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-lg">restaurant_menu</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{entry.titleBn}</p>
                      <p className="text-xs text-muted-foreground truncate">{entry.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          {entry.prepTime}
                        </span>
                        <span>•</span>
                        <span>{formatTime(entry.timestamp)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-4">
                <button
                  onClick={onClear}
                  className="w-full py-2.5 text-sm font-medium text-destructive border border-destructive/30 bg-transparent rounded-xl hover:bg-destructive/10 transition-colors"
                >
                  ইতিহাস মুছুন
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RecipeHistorySheet;
