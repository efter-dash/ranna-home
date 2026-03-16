import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { path: "/", icon: "home", label: "হোম" },
  { path: "/pantry", icon: "kitchen", label: "প্যান্ট্রি" },
  { path: "/favorites", icon: "favorite", label: "পছন্দ" },
  { path: "/history", icon: "history", label: "ইতিহাস" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on recipe page to avoid conflict with cook CTA
  if (location.pathname === "/recipe") return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl z-40 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}
                style={{ fontSize: "22px" }}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
