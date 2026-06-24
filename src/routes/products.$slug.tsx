import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { CATEGORIES, SITE, PLYWOOD_BRANDS as SITE_PLYWOOD_BRANDS, HARDWARE_BRANDS as SITE_HARDWARE_BRANDS, LAMINATE_BRANDS as SITE_LAMINATE_BRANDS } from "@/lib/site";
import { CAT_IMG, PRODUCT_DETAILS, PLYWOOD_BRANDS } from "@/lib/product-data";

import greenplyLogo from "@/assets/brands/greenply.png.asset.json";
import centuryplyLogo from "@/assets/brands/centuryply.png.asset.json";
import austinLogo from "@/assets/brands/austin.png.asset.json";
import archidplyLogo from "@/assets/brands/archidply.png.asset.json";
import hettichLogo from "@/assets/brands/hettich.png.asset.json";
import ebcoLogo from "@/assets/brands/ebco.png.asset.json";
import hafeleLogo from "@/assets/brands/hafele.png.asset.json";
import ozoneLogo from "@/assets/brands/ozone.png.asset.json";
import advanceLogo from "@/assets/brands/laminates/advance.png.asset.json";
import catchLogo from "@/assets/brands/laminates/catch.png.asset.json";
import centuryLamLogo from "@/assets/brands/laminates/century.png.asset.json";
import glamoxLogo from "@/assets/brands/laminates/glamox.png.asset.json";
import greenlamLogo from "@/assets/brands/laminates/greenlam.png.asset.json";
import merinoLogo from "@/assets/brands/laminates/merino.png.asset.json";
import pebbleLogo from "@/assets/brands/laminates/pebble.png.asset.json";
import skydecorLogo from "@/assets/brands/laminates/skydecor.png.asset.json";
import virgoLogo from "@/assets/brands/laminates/virgo.png.asset.json";

const BRAND_LOGOS: Record<string, string> = {
  "Greenply": greenplyLogo.url,
  "CenturyPly": centuryplyLogo.url,
  "Austin Plywood": austinLogo.url,
  "Archidply": archidplyLogo.url,
  "Hettich": hettichLogo.url,
  "Ebco": ebcoLogo.url,
  "Hafele": hafeleLogo.url,
  "Ozone": ozoneLogo.url,
  "Advance": advanceLogo.url,
  "Catch": catchLogo.url,
  "Century Laminates": centuryLamLogo.url,
  "Glamox": glamoxLogo.url,
  "Greenlam": greenlamLogo.url,
  "Merino": merinoLogo.url,
  "Pebble": pebbleLogo.url,
  "Skydecor": skydecorLogo.url,
  "Virgo": virgoLogo.url,
};

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug);
    const title = cat ? `${cat.title} — Durga Hardware and Plywood` : "Product — Durga Hardware and Plywood";
    const desc = cat?.blurb ?? "Explore our premium products at Durga Hardware and Plywood.";
    const img = cat ? CAT_IMG[cat.img] : undefined;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
      ],
    };
  },
  component: ProductDetailPage,
  notFoundComponent: () => (
    <PageLayout>
      <div className="section-pad mx-auto max-w-3xl px-4 text-center">
        <h1 className="font-display text-3xl font-bold text-charcoal">Product not found</h1>
        <p className="mt-4 text-muted-foreground">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-gold">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>
      </div>
    </PageLayout>
  ),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <PageLayout>
        <div className="section-pad mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-3xl font-bold text-charcoal">Something went wrong</h1>
          <button
            onClick={() => {
              reset();
              router.invalidate();
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-gold"
          >
            Try again
          </button>
        </div>
      </PageLayout>
    );
  },
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug)!;
  const detail = PRODUCT_DETAILS[slug];
  const img = CAT_IMG[cat.img];
  const related = CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <PageLayout>
      <div className="bg-cream">
      {/* Hero / overview */}
      <section className="section-pad pt-32 sm:pt-40 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gold">Products</Link>
            <span>/</span>
            <span className="text-gold">{cat.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-28 h-28 rounded-2xl gradient-gold opacity-20" />
              <div className="relative overflow-hidden rounded-2xl shadow-elevated">
                <img src={img} alt={cat.title} className="w-full h-[460px] object-cover" />
              </div>
            </div>
            <div>
              <span className="eyebrow">Product</span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-charcoal">
                {cat.title}
              </h1>
              <p className="mt-5 text-muted-foreground leading-relaxed">{detail.description}</p>
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
        </div>
      </section>

      {/* Features + Specs */}
      <section className="pt-16 pb-12 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-charcoal">Key Features</h2>
            <ul className="mt-8 grid gap-3">
              {detail.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-charcoal">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-xl font-bold text-charcoal">Why It Stands Out</h3>
            <ul className="mt-5 grid gap-3">
              {detail.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <ArrowRight className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold text-charcoal">Specifications</h2>
            <dl className="mt-8 divide-y divide-charcoal/10 rounded-2xl border border-charcoal/10 overflow-hidden">
              {detail.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 px-6 py-4">
                  <dt className="text-sm font-semibold text-charcoal">{s.label}</dt>
                  <dd className="text-sm text-muted-foreground text-right">{s.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-10 font-display text-xl font-bold text-charcoal">Available Brands</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {detail.brands.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-charcoal/15 bg-secondary px-4 py-2 text-xs font-semibold text-charcoal"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plywood brands & grades */}
      {slug === "plywood" &&
        PLYWOOD_BRANDS.map((brand, bIdx) => (
          <section
            key={brand.name}
            className={`section-pad ${bIdx % 2 === 0 ? "bg-cream" : "bg-cream"}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <span className="eyebrow">Featured Brand</span>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-charcoal">
                  {brand.name}
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">{brand.tagline}</p>
                {brand.sizes && (
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-charcoal/60 self-center mr-1">
                      Sizes
                    </span>
                    {brand.sizes.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-charcoal/15 bg-background px-4 py-2 text-xs font-semibold text-charcoal"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-charcoal/60 self-center mr-1">
                    Thickness
                  </span>
                  {brand.thicknesses.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-charcoal/15 bg-background px-4 py-2 text-xs font-semibold text-charcoal"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>


              <h3 className="mt-14 text-center font-display text-2xl font-bold text-charcoal">
                Available Grades
              </h3>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {brand.grades.map((g) => (
                  <div
                    key={g.name}
                    className="group overflow-hidden rounded-2xl bg-background shadow-soft hover:shadow-elevated transition duration-500"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-secondary">
                      <img
                        src={g.img}
                        alt={`${g.name} plywood — ${g.warranty}`}
                        loading="lazy"
                        className="h-full w-full object-contain group-hover:scale-105 transition duration-700"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <h4 className="font-display text-lg font-bold text-charcoal">{g.name}</h4>
                      <span className="mt-2 inline-flex items-center gap-2 rounded-full gradient-gold px-4 py-1.5 text-xs font-semibold text-white shadow-gold">
                        {g.warranty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
      ))}

      {/* Brands We Deal With */}
      {(slug === "plywood" || slug === "hardware" || slug === "laminates") && (
        <section className="section-pad bg-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="eyebrow">Trusted Partners</span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-charcoal">
                Brands We Deal With
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(slug === "plywood" ? SITE_PLYWOOD_BRANDS : slug === "hardware" ? SITE_HARDWARE_BRANDS : SITE_LAMINATE_BRANDS).map((brand) => (
                <div
                  key={brand}
                  className="flex flex-col items-center justify-center rounded-2xl border border-charcoal/10 bg-secondary p-6 shadow-soft hover:shadow-elevated transition duration-300"
                >
                  {BRAND_LOGOS[brand] ? (
                    <img
                      src={BRAND_LOGOS[brand]}
                      alt={brand}
                      className="h-12 w-auto max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-display text-lg font-bold text-charcoal text-center">{brand}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      <section className="section-pad bg-cream">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center">
            Explore More Products
          </h2>
          <div className="mt-10 grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {related.map((c) => (
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
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                    View Details <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </div>
    </PageLayout>
  );
}
