import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { CATEGORIES, SITE } from "@/lib/site";
import { CAT_IMG } from "@/lib/product-data";
import bannerProducts from "@/assets/banner-products.jpg";

const FEATURES: Record<string, string[]> = {
  plywood: [
    "BWP, MR & Marine grade options",
    "ISI-certified and IS:710 compliant",
    "Termite & borer resistant",
    "Available in multiple thicknesses",
  ],
  laminates: [
    "1mm & 0.8mm decorative laminates",
    "Matte, gloss, suede & textured finishes",
    "Scratch & stain resistant",
    "1000+ designs in stock",
  ],
  hardware: [
    "Drawer channels, hinges & handles",
    "Door locks & bathroom fittings",
    "Modular kitchen accessories",
    "From Hettich, Hafele, Ebco & more",
  ],
  veneers: [
    "Natural & engineered veneers",
    "Teak, walnut, oak, oak burl & exotic species",
    "Pre-polished options available",
    "Custom matching for large projects",
  ],
  "modular-kitchens": [
    "End-to-end design consultation",
    "Premium shutters & finishes",
    "Soft-close hinges & channels",
    "On-site installation by certified team",
  ],
  "profile-doors": [
    "Solid wood & engineered options",
    "Membrane, PU & veneer finishes",
    "Custom sizes and designs",
    "Sound & moisture resistant",
  ],
};

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Plywood, Laminates, Hardware, Veneers, Kitchens, Doors" },
      {
        name: "description",
        content:
          "Explore our premium range: plywood, laminates, hardware accessories, veneers, modular kitchens and profile doors — from India's most trusted brands.",
      },
      { property: "og:title", content: "Our Products — Durga Hardware and Plywood" },
      {
        property: "og:description",
        content: "Six premium product categories, hundreds of SKUs, only the most trusted brands.",
      },
      { property: "og:url", content: "https://gold-sheen-designs.lovable.app/products" },
    ],
    links: [{ rel: "canonical", href: "https://gold-sheen-designs.lovable.app/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Products"
        title="Premium Materials for Premium Interiors"
        subtitle="Six categories, hundreds of SKUs, only the brands we trust enough to use ourselves."
        crumb="Products"
        bgImage={bannerProducts}
      />

      {/* Category Grid */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/products/$slug"
                params={{ slug: c.slug }}
                className="group relative overflow-hidden rounded-2xl bg-charcoal shadow-soft hover:shadow-elevated transition duration-500"
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
                  <p className="mt-2 text-sm text-white/75">{c.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    View Details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Per-category sections */}
      {CATEGORIES.map((c, idx) => (
        <section
          key={c.slug}
          id={c.slug}
          className={`section-pad scroll-mt-24 ${
            idx % 2 === 0 ? "gradient-warm" : "bg-background"
          }`}
        >
          <div
            className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center ${
              idx % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-28 h-28 rounded-2xl gradient-gold opacity-20" />
              <div className="relative overflow-hidden rounded-2xl shadow-elevated">
                <img
                  src={CAT_IMG[c.img]}
                  alt={c.title}
                  loading="lazy"
                  className="w-full h-[460px] object-cover"
                />
              </div>
            </div>
            <div>
              <span className="eyebrow">Category 0{idx + 1}</span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
                {c.title}
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">{c.blurb} Sourced from
                trusted Indian and international brands, finished to last.</p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {FEATURES[c.slug].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-charcoal">
                    <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-gold"
                >
                  <Phone className="h-4 w-4" /> Inquire Now
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-charcoal px-6 py-3 text-sm font-semibold text-charcoal hover:bg-charcoal hover:text-white transition"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}
    </PageLayout>
  );
}
