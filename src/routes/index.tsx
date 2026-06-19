import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  CheckCircle2,
  Star,
  Award,
  ShieldCheck,
  Users,
  Sparkles,
  Truck,
  Wrench,
  Quote,
  MapPin,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { SITE, CATEGORIES, PLYWOOD_BRANDS, HARDWARE_BRANDS } from "@/lib/site";
import heroShowroom from "@/assets/hero-showroom.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import heroVeneer from "@/assets/hero-veneer.jpg";
import aboutStore from "@/assets/about-store.jpg";
import catPlywood from "@/assets/cat-plywood.jpg";
import catLaminates from "@/assets/cat-laminates.jpg";
import catHardware from "@/assets/cat-hardware.jpg";
import catVeneers from "@/assets/cat-veneers.jpg";
import catKitchen from "@/assets/cat-kitchen.jpg";
import catDoors from "@/assets/cat-doors.jpg";
import ctaBg from "@/assets/cta-bg.jpg";
import consultBg from "@/assets/consultation-bg.jpg";

const CAT_IMG: Record<string, string> = {
  plywood: catPlywood,
  laminates: catLaminates,
  hardware: catHardware,
  veneers: catVeneers,
  kitchen: catKitchen,
  doors: catDoors,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Durga Hardware and Plywood — Premium Plywood, Laminates & Kitchens, Vijayawada" },
      {
        name: "description",
        content:
          "Premium plywood, laminates, veneers, hardware accessories, modular kitchens and profile doors. Trusted brands under one roof in Vijayawada.",
      },
      { property: "og:title", content: "Durga Hardware and Plywood — Vijayawada" },
      {
        property: "og:description",
        content:
          "Trusted brands. Superior quality. Visit our premium showroom in Governor Peta, Vijayawada.",
      },
    ],
  }),
  component: HomePage,
});

const slides = [
  {
    img: heroShowroom,
    eyebrow: "Welcome to Durga",
    title: "Premium Hardware & Plywood Solutions",
    sub: "Transform your interiors with high-quality plywood, laminates, veneers, modular kitchens, and hardware accessories.",
  },
  {
    img: heroKitchen,
    eyebrow: "Modular Living",
    title: "Complete Modular Kitchen Solutions",
    sub: "Stylish, durable, and customized kitchen solutions for modern homes.",
  },
  {
    img: heroVeneer,
    eyebrow: "Trusted Quality",
    title: "Trusted Brands. Superior Quality.",
    sub: "Bringing the finest brands and premium materials under one roof.",
  },
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative mt-20 h-[calc(100svh-5rem)] min-h-[560px] w-full overflow-hidden">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={s.img}
            alt=""
            className={`h-full w-full object-cover ${idx === i ? "animate-slow-zoom" : ""}`}
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        </div>
      ))}

      {/* Floating decorative shapes */}
      <div className="absolute top-1/4 right-[6%] w-32 h-32 rounded-full border border-gold/30 animate-float pointer-events-none hidden lg:block" />
      <div
        className="absolute bottom-1/4 left-[5%] w-20 h-20 rounded-full gradient-gold opacity-20 animate-float pointer-events-none hidden lg:block"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div key={i} className="max-w-3xl animate-fade-up">
          <span className="eyebrow text-gold">{slides[i].eyebrow}</span>
          <h1 className="mt-5 font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
            {slides[i].title}
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl">{slides[i].sub}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-4 text-sm font-semibold text-white shadow-gold hover:scale-105 transition"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 text-white/90 text-sm hover:text-gold"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/20">
                <Phone className="h-4 w-4" />
              </span>
              {SITE.phone}
            </a>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/90 text-sm hover:text-gold"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366]/20 border border-[#25D366]/40">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
              </span>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-10 gradient-gold" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function About() {
  const features = [
    "Premium Quality Products",
    "Trusted Brands",
    "Competitive Pricing",
    "Expert Guidance",
  ];
  return (
    <section className="section-pad gradient-warm relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl gradient-gold opacity-20 hidden md:block" />
          <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full border-2 border-gold/30 hidden md:block" />
          <div className="relative overflow-hidden rounded-2xl shadow-elevated">
            <img
              src={aboutStore}
              alt="Durga Hardware showroom"
              loading="lazy"
              className="w-full h-[460px] object-cover hover:scale-105 transition duration-700"
            />
          </div>
          <div className="absolute -bottom-8 left-8 glass-card rounded-2xl px-6 py-4 shadow-soft hidden sm:flex items-center gap-3">
            <Award className="h-8 w-8 text-gold" />
            <div>
              <div className="text-2xl font-bold text-charcoal">10+</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Years of Trust
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="eyebrow">About Us</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            Crafting Premium Interiors with{" "}
            <span className="text-gradient-gold">Quality You Can Trust</span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Durga Hardware and Plywood is Vijayawada's premium destination for plywood,
            laminates, veneers, modular kitchens, hardware accessories and profile doors. We
            partner with India's most trusted brands to bring world-class materials under one
            roof — backed by expert guidance and honest pricing.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm font-medium text-charcoal">
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-4 text-sm font-semibold text-white hover:gradient-gold transition"
          >
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="eyebrow">Our Range</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            Product <span className="text-gradient-gold">Categories</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Everything you need for premium interiors — sourced from India's most trusted brands.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, idx) => (
            <Link
              key={c.slug}
              to="/products"
              hash={c.slug}
              className="group relative overflow-hidden rounded-2xl bg-charcoal shadow-soft hover:shadow-elevated transition-all duration-500"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={CAT_IMG[c.img]}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-white/75 line-clamp-2">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition">
                  Learn More <ArrowRight className="h-3 w-3" />
                </span>
              </div>
              <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full glass-dark text-gold opacity-0 group-hover:opacity-100 transition">
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Award, t: "Premium Quality", n: "100%" },
    { icon: ShieldCheck, t: "Genuine Products", n: "Verified" },
    { icon: Sparkles, t: "Wide Range", n: "500+ SKUs" },
    { icon: Star, t: "Trusted Brands", n: "100+" },
    { icon: Truck, t: "Affordable Pricing", n: "Best Rates" },
    { icon: Wrench, t: "Expert Support", n: "10+ Yrs" },
  ];
  return (
    <section className="section-pad bg-charcoal text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, var(--gold) 0%, transparent 35%), radial-gradient(circle at 90% 80%, var(--brown) 0%, transparent 35%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Six reasons customers <span className="text-gradient-gold">choose Durga</span>.
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, n }) => (
            <div
              key={t}
              className="group glass-dark rounded-2xl p-7 hover:border-gold/60 transition-all duration-500"
            >
              <div className="flex items-start gap-5">
                <span className="grid h-14 w-14 place-items-center rounded-xl gradient-gold shrink-0 shadow-gold">
                  <Icon className="h-6 w-6 text-white" />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-2xl font-bold text-gold">{n}</div>
                  <div className="mt-1 text-white/80 font-medium">{t}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandMarquee({
  title,
  brands,
  variant = "light",
}: {
  title: string;
  brands: string[];
  variant?: "light" | "warm";
}) {
  const doubled = [...brands, ...brands];
  return (
    <section className={`py-16 ${variant === "warm" ? "gradient-warm" : "bg-background"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="eyebrow">Brands We Deal With</span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-charcoal">{title}</h2>
        </div>
      </div>
      <div className="mt-10 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />
        <div className="flex gap-6 animate-marquee w-max">
          {doubled.map((b, i) => (
            <div
              key={i}
              className="shrink-0 w-56 h-28 grid place-items-center rounded-2xl bg-white border border-border shadow-soft hover:shadow-gold hover:border-gold/40 transition group"
            >
              <span className="font-display text-xl font-bold text-charcoal/60 group-hover:text-gold transition tracking-wide">
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Ravi Kiran",
    role: "Homeowner, Vijayawada",
    text: "Outstanding selection and the team genuinely guides you to the right product. My modular kitchen looks stunning.",
    rating: 5,
  },
  {
    name: "Lakshmi Devi",
    role: "Interior Designer",
    text: "My go-to for premium plywood and veneers. Stock is always fresh, brands are genuine, pricing is transparent.",
    rating: 5,
  },
  {
    name: "Suresh Babu",
    role: "Contractor",
    text: "Reliable supply, on-time delivery and the best hardware brands under one roof. Highly recommended.",
    rating: 5,
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="section-pad gradient-warm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <span className="eyebrow">Testimonials</span>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
          What our <span className="text-gradient-gold">customers say</span>
        </h2>
        <div className="mt-14 relative">
          <div className="glass-card rounded-3xl p-8 sm:p-14 shadow-soft relative">
            <Quote className="h-12 w-12 text-gold/40 mx-auto" />
            <p className="mt-6 text-lg sm:text-xl text-charcoal/85 leading-relaxed font-display italic min-h-[7rem]">
              "{testimonials[i].text}"
            </p>
            <div className="mt-6 flex items-center justify-center gap-1">
              {Array.from({ length: testimonials[i].rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="grid h-14 w-14 place-items-center rounded-full gradient-gold text-white font-display text-lg font-bold shadow-gold">
                {testimonials[i].name.charAt(0)}
              </div>
              <div className="font-semibold text-charcoal">{testimonials[i].name}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {testimonials[i].role}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-10 gradient-gold" : "w-4 bg-charcoal/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Consultation() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="absolute inset-0">
        <img src={consultBg} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-charcoal/85" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
        <div className="text-white">
          <span className="eyebrow text-gold">Free Consultation</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Let our experts help you choose the{" "}
            <span className="text-gradient-gold">perfect materials</span>
          </h2>
          <p className="mt-5 text-white/75 leading-relaxed">
            Share your project requirements and our team will get back to you with curated
            recommendations, samples, and the best pricing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-gold"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! We'll reach out shortly.");
          }}
          className="glass-card rounded-3xl p-6 sm:p-8 shadow-elevated"
        >
          <h3 className="font-display text-2xl font-bold text-charcoal">Get Free Consultation</h3>
          <div className="mt-6 grid gap-4">
            {[
              { n: "name", p: "Your Name", t: "text" },
              { n: "mobile", p: "Mobile Number", t: "tel" },
              { n: "requirement", p: "Product Requirement", t: "text" },
            ].map((f) => (
              <input
                key={f.n}
                name={f.n}
                type={f.t}
                required
                placeholder={f.p}
                className="w-full rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-charcoal placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none"
              />
            ))}
            <textarea
              name="message"
              rows={4}
              placeholder="Message"
              className="w-full rounded-xl border border-border bg-white/80 px-4 py-3 text-sm text-charcoal placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none resize-none"
            />
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl gradient-gold px-6 py-4 text-sm font-semibold text-white shadow-gold hover:scale-[1.02] transition"
            >
              Get Free Consultation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={ctaBg} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-charcoal/90" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <span className="eyebrow text-gold">Visit Our Showroom</span>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
          Looking for Premium Hardware &amp;{" "}
          <span className="text-gradient-gold">Plywood Products?</span>
        </h2>
        <p className="mt-5 text-white/75 max-w-2xl mx-auto">
          Visit our showroom today and get expert assistance for your project requirements.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-full gradient-gold px-8 py-4 text-sm font-semibold text-white shadow-gold hover:scale-105 transition"
          >
            <Phone className="h-4 w-4" /> Call Now
          </a>
          <a
            href={SITE.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass-dark px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            <MapPin className="h-4 w-4" /> Get Directions
          </a>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-widest text-white/60">
          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> 5000+ Customers</span>
          <span className="flex items-center gap-2"><Award className="h-4 w-4 text-gold" /> 100+ Brands</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> 10+ Years</span>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <About />
      <Categories />
      <WhyUs />
      <BrandMarquee title="Plywood Brands" brands={PLYWOOD_BRANDS} />
      <BrandMarquee title="Hardware Brands" brands={HARDWARE_BRANDS} variant="warm" />
      <Testimonials />
      <Consultation />
      <CallToAction />
    </PageLayout>
  );
}
