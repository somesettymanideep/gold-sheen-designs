import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Droplets, Bug, Award } from "lucide-react";

import decobond710 from "@/assets/decobond/decobond-710.jpg.asset.json";
import decobond710Nature from "@/assets/decobond/decobond-710-nature.jpg.asset.json";
import decobond710Gold from "@/assets/decobond/decobond-710-gold.jpg.asset.json";
import decobond710Club from "@/assets/decobond/decobond-710-club.jpg.asset.json";
import decobond710Platinum from "@/assets/decobond/decobond-710-platinum.jpg.asset.json";
import decobond710Eco from "@/assets/decobond/decobond-710-eco.jpg.asset.json";
import decobond710Pine from "@/assets/decobond/decobond-710-pine.jpg.asset.json";

const SLIDES = [
  { img: decobond710.url, name: "Decobond 710", warranty: "15 Years Warranty" },
  { img: decobond710Nature.url, name: "Decobond 710 Nature", warranty: "20 Years Warranty" },
  { img: decobond710Gold.url, name: "Decobond 710 Gold", warranty: "25 Years Warranty" },
  { img: decobond710Club.url, name: "Decobond 710 Club", warranty: "30 Years Warranty" },
  { img: decobond710Platinum.url, name: "Decobond Platinum", warranty: "Lifetime Warranty" },
  { img: decobond710Eco.url, name: "Decobond 710 Eco", warranty: "20 Years Warranty" },
  { img: decobond710Pine.url, name: "Decobond 710 Pine", warranty: "30 Years Warranty" },
];

const HIGHLIGHTS = [
  { icon: Droplets, label: "100% Boiling Waterproof" },
  { icon: Bug, label: "Borer & Termite Resistant" },
  { icon: ShieldCheck, label: "100% Gurjan Core" },
  { icon: Award, label: "Up to Lifetime Warranty" },
];

export function DecobondShowcase() {
  const [i, setI] = useState(0);

  const next = useCallback(() => setI((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(() => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="section-pad bg-charcoal text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 25%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 85% 75%, var(--brown) 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left content */}
        <div>
          <span className="eyebrow text-gold">Highlighted Brand</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Decobond <span className="text-gradient-gold">Plywood</span>
          </h2>
          <p className="mt-6 text-base text-white/75 leading-relaxed max-w-xl">
            100% Gurjan marine-grade BWP plywood — boiling-waterproof, borer &amp; termite resistant
            and built to last. From the trusted Decobond 710 to the lifetime-warranty Platinum range,
            every sheet is engineered for strength, stability and decades of reliable performance.
          </p>

          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm font-medium text-white/90">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 border border-white/15 shrink-0">
                  <Icon className="h-5 w-5 text-gold" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <Link
            to="/products/$slug"
            params={{ slug: "plywood" }}
            className="mt-10 inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-4 text-sm font-semibold text-white shadow-gold hover:scale-105 transition"
          >
            Explore Decobond Plywood <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right slider */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl shadow-elevated aspect-[3/4] bg-black/30">
            {SLIDES.map((s, idx) => (
              <div
                key={s.name}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white">{s.name}</h3>
                  <span className="mt-1 inline-block rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-charcoal">
                    {s.warranty}
                  </span>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full glass-dark text-white hover:bg-white/20 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full glass-dark text-white hover:bg-white/20 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* dots */}
          <div className="mt-5 flex justify-center gap-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-10 gradient-gold" : "w-4 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
