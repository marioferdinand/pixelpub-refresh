import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projets", href: "/projets" },
  { label: "Store", href: "/store" },
  { label: "Blogs", href: "/blogs" },
  { label: "Avis", href: "/avis" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }

    return location.pathname === href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <button onClick={() => handleClick("/")} className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
            CF
          </span>
          <span className="font-display font-bold text-foreground">Coach Fema</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`bg-transparent border-none cursor-pointer text-sm transition-colors ${
                isActiveLink(link.href)
                  ? "font-bold text-foreground underline underline-offset-8 decoration-2"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle />
          <a
            href="/contact"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Me contacter
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`bg-transparent border-none cursor-pointer text-left transition-colors ${
                    isActiveLink(link.href)
                      ? "font-bold text-foreground underline underline-offset-4 decoration-2"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
             
              <a
                href="/contact"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium text-center"
              >
                Me contacter
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
