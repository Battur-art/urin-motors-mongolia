import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, Scale, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  const { compareList } = useCompare();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Нүүр" },
    { path: "/cars", label: "Машинууд" },
    { path: "/about", label: "Бидний тухай" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3" : "bg-gradient-to-b from-black/50 to-transparent py-6"
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <span className="font-heading font-bold text-2xl tracking-tighter">
                URIN
              </span>
              <span className="font-heading font-light text-2xl tracking-tighter ml-1">
                MOTORS
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <span
                  className={`text-sm uppercase tracking-wider font-medium transition-opacity duration-300 ${
                    isActive(link.path) ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {link.label}
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-foreground"
                  initial={{ width: 0 }}
                  animate={{ width: isActive(link.path) ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link to="/compare">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <Scale className="h-5 w-5" />
                  <AnimatePresence>
                    {compareList.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center"
                      >
                        {compareList.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            <Link to="/favorites">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  <AnimatePresence>
                    {favorites.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center"
                      >
                        {favorites.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-2 ml-4">
              <a href="tel:+97680222270">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="uppercase tracking-wider text-xs px-4 gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    8022 2270
                  </Button>
                </motion.div>
              </a>
              <a href="tel:+97699000235">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="uppercase tracking-wider text-xs px-4 gap-1.5 border-foreground/30 hover:border-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    9900 0235
                  </Button>
                </motion.div>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.div whileTap={{ scale: 0.9 }} className="lg:hidden ml-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="container-wide py-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-4 text-2xl font-heading font-light transition-opacity ${
                      isActive(link.path) ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-4 mt-4 border-t border-border flex flex-col gap-2"
              >
                <a href="tel:+97680222270">
                  <Button className="w-full uppercase tracking-wider gap-2">
                    <Phone className="h-4 w-4" />
                    8022 2270
                  </Button>
                </a>
                <a href="tel:+97699000235">
                  <Button variant="outline" className="w-full uppercase tracking-wider gap-2">
                    <Phone className="h-4 w-4" />
                    9900 0235
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
