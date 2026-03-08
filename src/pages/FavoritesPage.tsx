import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="relative flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl">
      {/* Header */}
      <div className="flex items-center bg-card p-4 sm:px-6 lg:px-8 pb-2 sticky top-0 z-10 border-b border-border">
        <button
          onClick={() => navigate("/")}
          className="flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-secondary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-base sm:text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          প্রিয় রেসিপি
        </h2>
      </div>

      {favorites.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
          <span className="material-symbols-outlined text-5xl text-muted-foreground">favorite</span>
          <p className="text-lg font-bold text-center">কোনো প্রিয় রেসিপি নেই</p>
          <p className="text-sm text-muted-foreground text-center">
            রেসিপি পেজে হার্ট বাটনে ক্লিক করে প্রিয় তালিকায় যোগ করুন
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold"
          >
            রান্না শুরু করুন
          </button>
        </div>
      ) : (
        <div className="px-4 sm:px-6 lg:px-8 py-4 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-secondary rounded-xl p-4 border border-border"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-base">{fav.titleBn}</h3>
                  <p className="text-xs text-muted-foreground">{fav.title}</p>
                  <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {fav.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {fav.serves}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">restaurant</span>
                      {fav.difficulty}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFavorite(fav.id)}
                  className="flex items-center justify-center rounded-full h-9 w-9 hover:bg-destructive/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-accent filled-icon">favorite</span>
                </button>
              </div>
              <button
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set("ingredients", fav.ingredientIds.join(","));
                  params.set("favoriteId", fav.id);
                  navigate(`/recipe?${params.toString()}`);
                }}
                className="mt-3 w-full py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors"
              >
                রেসিপি দেখুন
              </button>
            </div>
          ))}
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
        <div className="flex flex-1 flex-col items-center justify-end gap-1 text-primary">
          <span className="material-symbols-outlined filled-icon">favorite</span>
          <p className="text-[10px] font-bold leading-normal tracking-wider">প্রিয়</p>
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

export default FavoritesPage;
