import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/durga-logo.asset.json";
import { SITE } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? "shadow-soft" : "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" className="flex items-center gap-3 min-w-0">
        <img
            src={logo.url}
            alt="Durga Hardware and Plywood"
            width={72}
            height={72}
            className="h-16 w-16 sm:h-18 sm:w-18 object-contain shrink-0"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 text-sm font-medium text-charcoal hover:text-primary transition-colors relative group"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-px gradient-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden md:inline-flex items-center gap-2 rounded-full gradient-gold px-5 py-2.5 text-sm font-semibold text-white shadow-gold hover:opacity-95 transition"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-border bg-white/80 text-charcoal"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-medium text-charcoal hover:bg-beige"
                activeProps={{ className: "bg-beige text-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={SITE.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-gold px-5 py-3 text-sm font-semibold text-white"
            >
              <Phone className="h-4 w-4" /> Call {SITE.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
