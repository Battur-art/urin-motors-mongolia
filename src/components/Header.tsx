import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, Phone, Scale } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { compareList } = useCompare();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Нүүр" },
    { path: "/cars", label: "Машинууд" },
    { path: "/about", label: "Бидний тухай" },
  ];

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-xl">U</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">Urin Motors</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/compare">
              <Button variant="ghost" size="icon" className="relative">
                <Scale className="h-5 w-5" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            <a href="tel:+97699999999" className="hidden sm:flex">
              <Button variant="default" size="sm" className="gap-2">
                <Phone className="h-4 w-4" />
                <span>+976 9999 9999</span>
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+97699999999" className="block py-3">
              <Button variant="default" className="w-full gap-2">
                <Phone className="h-4 w-4" />
                <span>+976 9999 9999</span>
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
