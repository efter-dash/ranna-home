import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Heart, History, Settings, Info, LogIn, LogOut } from "lucide-react";

const HamburgerMenu = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "ফেভারিট", icon: Heart, to: "/favorites" },
    { label: "রেসিপি ইতিহাস", icon: History, to: "/history" },
    { label: "সেটিংস", icon: Settings, to: "/settings" },
    { label: "আমাদের সম্পর্কে", icon: Info, to: "/about" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
          <Menu className="text-primary" size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="px-5 pt-6 pb-4 border-b border-border">
          <SheetTitle className="text-left">
            {user ? (
              <div>
                <p className="text-sm font-bold truncate">{user.user_metadata?.full_name || user.email}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">লগইন করুন</p>
            )}
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col py-2">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-secondary transition-colors"
            >
              <item.icon size={18} className="text-muted-foreground" />
              {item.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-border mx-5" />

          {user ? (
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={18} />
              লগ আউট
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              <LogIn size={18} />
              লগইন / সাইন আপ
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;
