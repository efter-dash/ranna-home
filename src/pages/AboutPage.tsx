import { ArrowLeft, Fish } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full max-w-5xl mx-auto flex-col bg-card shadow-xl">
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-bold">আমাদের সম্পর্কে</h1>
      </div>
      <div className="flex-1 px-6 py-8 space-y-4 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-center gap-1 mb-4">
          <span className="text-2xl font-bold text-primary">রান্না</span>
          <Fish className="text-primary" size={24} />
          <span className="text-2xl font-bold">করি</span>
        </div>
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          আপনার বাসায় যা আছে তা দিয়েই সুস্বাদু বাঙালি রেসিপি তৈরি করুন। 
          উপকরণ বাছাই করুন, AI আপনাকে রেসিপি বলে দেবে!
        </p>
        <p className="text-xs text-muted-foreground text-center">
          তৈরি করেছে ❤️ দিয়ে
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
