import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";

const RecipePage = lazy(() => import("./pages/RecipePage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/recipe" element={<RecipePage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
