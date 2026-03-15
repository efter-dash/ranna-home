import { useNavigate } from "react-router-dom";
import { useRecipeHistory } from "@/hooks/useRecipeHistory";

const HistoryPage = () => {
  const navigate = useNavigate();
  const { history, clearHistory } = useRecipeHistory();

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="relative flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl">
      {/* Header */}
      <div className="flex items-center bg-card p-4 sm:px-6 lg:px-8 pb-2 sticky top-0 z-10 border-b border-border">
        <button
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-secondary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-base sm:text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          রেসিপি ইতিহাস
        </h2>
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
          <span className="material-symbols-outlined text-5xl text-muted-foreground">schedule</span>
          <p className="text-lg font-bold text-center">কোনো ইতিহাস নেই</p>
          <p className="text-sm text-muted-foreground text-center">
            এই সেশনে এখনো কোনো রেসিপি দেখা হয়নি
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold"
          >
            রান্না শুরু করুন
          </button>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 py-4 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => {
                  if (entry.ingredientIds.length > 0) {
                    navigate(`/recipe?ingredients=${entry.ingredientIds.join(",")}`);
                  }
                }}
                className="bg-secondary rounded-xl p-4 border border-border text-left hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-none mt-0.5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">restaurant_menu</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{entry.titleBn}</h3>
                    <p className="text-xs text-muted-foreground truncate">{entry.title}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">schedule</span>
                        {entry.prepTime}
                      </span>
                      <span>•</span>
                      <span>{formatTime(entry.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Clear button - outlined style */}
          <div className="mt-6">
            <button
              onClick={clearHistory}
              className="w-full py-2.5 text-sm font-medium text-destructive border border-destructive/30 bg-transparent rounded-xl hover:bg-destructive/10 transition-colors"
            >
              ইতিহাস মুছুন
            </button>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl bg-card border-t border-border flex gap-2 px-4 pb-6 pt-3">
        <button
          onClick={() => navigate("/")}
          className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">home</span>
          <p className="text-[10px] font-medium leading-normal tracking-wider">হোম</p>
        </button>
        <button
          onClick={() => navigate("/favorites")}
          className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">favorite</span>
          <p className="text-[10px] font-medium leading-normal tracking-wider">ফেভারিট</p>
        </button>
        <div className="flex flex-1 flex-col items-center justify-end gap-1 text-primary">
          <span className="material-symbols-outlined filled-icon">schedule</span>
          <p className="text-[10px] font-bold leading-normal tracking-wider">ইতিহাস</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
