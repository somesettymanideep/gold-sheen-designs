import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/durga-logo.asset.json";
import footerBanner from "@/assets/footer-banner-kitchen.webp.asset.json";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const navLinks = [
    { to: "/", l: "HOME" },
    { to: "/about", l: "ABOUT US" },
    { to: "/products", l: "PRODUCTS" },
    { to: "/contact", l: "CONTACT US" },
  ] as const;

  return (
    <footer className="relative bg-charcoal text-white/80 overflow-hidden">
      {/* Background banner image across the entire footer */}
      <div className="absolute inset-0">
        <img
          src={footerBanner.url}
          alt="Footer background"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      {/* Top content area */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 pb-8 text-center">
          {/* Logo pill */}
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center rounded-full bg-white px-6 py-5 shadow-elevated">
              <img src={logo.url} alt="Durga Hardware and Plywood" className="h-20 w-20 object-contain" />
            </div>
          </div>

          {/* Description */}
          <p className="mx-auto mt-10 max-w-3xl text-base sm:text-lg leading-relaxed text-white/70">
            Premium destination for plywood, laminates, veneers, modular kitchens, hardware
            accessories, and profile doors in Vijayawada — trusted by architects, interior designers
            and homeowners for quality that lasts.
          </p>

          {/* Nav row with top/bottom borders */}
          <nav className="mt-14 border-y border-white/15 py-6">
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-16">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm sm:text-base font-semibold tracking-widest text-white hover:text-gold-soft transition"
                  >
                    {l.l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact row */}
          <div className="mt-8">
            <div className="mx-auto mb-6 h-px w-24 bg-gold/50" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-start gap-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full gradient-gold shadow-gold transition group-hover:scale-105">
                  <Mail className="h-5 w-5 text-white" />
                </span>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Email</div>
                  <div className="mt-0.5 text-sm text-white break-all group-hover:text-gold-soft transition">{SITE.email}</div>
                </div>
              </a>

              <a
                href={SITE.phoneHref}
                className="group flex items-start gap-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full gradient-gold shadow-gold transition group-hover:scale-105">
                  <Phone className="h-5 w-5 text-white" />
                </span>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Phone</div>
                  <div className="mt-0.5 text-sm text-white group-hover:text-gold-soft transition">+91 {SITE.phone}</div>
                </div>
              </a>

              <a
                href={SITE.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full gradient-gold shadow-gold transition group-hover:scale-105">
                  <MapPin className="h-5 w-5 text-white" />
                </span>
                <div className="min-w-0 text-left">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Address</div>
                  <div className="mt-0.5 text-sm text-white leading-snug group-hover:text-gold-soft transition">
                    {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

      {/* Bottom bar */}
      <div className="relative z-10 bg-black/40 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            Copyright ©{new Date().getFullYear()}{" "}
            <span className="text-gold font-semibold">Durga Hardware and Plywood</span>{" "}
            All Rights Reserved.
          </p>
          <p className="text-sm text-white/70">
            Designed &amp; developed by{" "}
            <a
              href="https://ayrondigitalsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-semibold hover:underline"
            >
              Ayron Digital Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
