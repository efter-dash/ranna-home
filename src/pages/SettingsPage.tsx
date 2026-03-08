import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl">
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-bold">সেটিংস</h1>
      </div>
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-lg mx-auto w-full space-y-6">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground">অ্যাকাউন্ট</h2>
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-sm font-medium">{user?.email ?? "লগইন করা হয়নি"}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user?.user_metadata?.full_name ?? ""}
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">আরও সেটিংস শীঘ্রই আসছে...</p>
      </div>
    </div>
  );
};

export default SettingsPage;
