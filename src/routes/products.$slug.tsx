import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { CATEGORIES, SITE } from "@/lib/site";
import { BANNER_IMG, CAT_IMG, PRODUCT_DETAILS, PLYWOOD_BRANDS, PLYWOOD_BRAND_LOGOS, HARDWARE_BRAND_LOGOS, LAMINATE_BRAND_LOGOS } from "@/lib/product-data";
import { BrandMarquee } from "@/components/BrandMarquee";


// Per-category keyword-targeted SEO config
export const CATEGORY_SEO: Record<
  string,
  { keyword: string; h1: string; title: string; description: string }
> = {
  plywood: {
    keyword: "Best plywood shop in Vijayawada",
    h1: "Best Plywood Shop in Vijayawada",
    title: "Best Plywood Shop in Vijayawada | Durga Hardware and Plywood",
    description:
      "Looking for the best plywood shop in Vijayawada? Durga Hardware and Plywood offers premium BWP, marine & commercial plywood from trusted brands like Decobond, Greenply & CenturyPly.",
  },
  hardware: {
    keyword: "Best hardware shop in Vijayawada",
    h1: "Best Hardware Shop in Vijayawada",
    title: "Best Hardware Shop in Vijayawada | Durga Hardware and Plywood",
    description:
      "The best hardware shop in Vijayawada for furniture & architectural hardware. Genuine Hettich, Hafele, Ebco & Blum hinges, channels, handles & kitchen fittings.",
  },
  laminates: {
    keyword: "Best laminates shop in Vijayawada",
    h1: "Best Laminates Shop in Vijayawada",
    title: "Best Laminates Shop in Vijayawada | Durga Hardware and Plywood",
    description:
      "Discover the best laminates shop in Vijayawada. Huge range of decorative & high-pressure laminates from Greenlam, Merino, Century & more for kitchens and interiors.",
  },
  veneers: {
    keyword: "Best veneer shops in Vijayawada",
    h1: "Best Veneer Shop in Vijayawada",
    title: "Best Veneer Shops in Vijayawada | Durga Hardware and Plywood",
    description:
      "One of the best veneer shops in Vijayawada. Natural & engineered teak, walnut and designer veneers for premium furniture, doors and wall panelling.",
  },
  "profile-doors": {
    keyword: "Best profile doors shop in Vijayawada",
    h1: "Best Profile Doors Shop in Vijayawada",
    title: "Best Profile Doors Shop in Vijayawada | Durga Hardware and Plywood",
    description:
      "The best profile doors shop in Vijayawada offering elegant, durable and waterproof designer profile doors for homes, kitchens and wardrobes.",
  },
  "modular-kitchens": {
    keyword: "Best modular kitchen accessories shop in Vijayawada",
    h1: "Best Modular Kitchen Accessories Shop in Vijayawada",
    title: "Best Modular Kitchen Accessories Shop in Vijayawada | Durga Hardware",
    description:
      "The best modular kitchen accessories shop in Vijayawada. Premium baskets, tall units, pull-outs & fittings from Hettich, Hafele & Kessebohmer for modern kitchens.",
  },
};

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug);
    const seo = CATEGORY_SEO[params.slug];
    const title = seo
      ? seo.title
      : cat
        ? `${cat.title} in Vijayawada — Durga Hardware and Plywood`
        : "Product — Durga Hardware and Plywood";
    const desc = seo?.description ?? cat?.blurb ?? "Explore our premium products at Durga Hardware and Plywood.";
    const img = cat ? CAT_IMG[cat.img] : undefined;
    const url = `https://gold-sheen-designs.lovable.app/products/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        ...(seo ? [{ name: "keywords", content: seo.keyword }] : []),
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: cat
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://gold-sheen-designs.lovable.app/" },
                  { "@type": "ListItem", position: 2, name: "Products", item: "https://gold-sheen-designs.lovable.app/products" },
                  { "@type": "ListItem", position: 3, name: cat.title, item: url },
                ],
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: seo?.h1 ?? cat.title,
                description: desc,
                ...(img ? { image: img } : {}),
                category: cat.title,
                brand: { "@type": "Brand", name: "Durga Hardware and Plywood" },
                offers: {
                  "@type": "AggregateOffer",
                  priceCurrency: "INR",
                  availability: "https://schema.org/InStock",
                  seller: {
                    "@type": "HardwareStore",
                    name: "Durga Hardware and Plywood",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: "Vijayawada",
                      addressRegion: "Andhra Pradesh",
                      postalCode: "520002",
                      addressCountry: "IN",
                    },
                  },
                },
                areaServed: "Vijayawada",
              }),
            },
          ]
        : [],
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
        <PageHero
          title={cat.title}
          crumb={cat.title}
          bgImage={BANNER_IMG[cat.img]}
          className="py-[30px]"
        />

      {/* Hero / overview */}
      <section className="py-[30px] bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-28 h-28 rounded-2xl gradient-gold opacity-20" />
              <div className="relative overflow-hidden rounded-2xl shadow-elevated">
                <img src={img} alt={cat.title} className="w-full h-[460px] object-cover" />
              </div>
            </div>
            <div>
              <span className="eyebrow">Product</span>
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
      <section className="py-[30px] bg-cream">
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
                  className="rounded-full border border-charcoal/15 bg-secondary px-4 py-2 text-xs font-semibold text-white"
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
            className="py-[30px] bg-cream"
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


      {/* Home-page brand marquees */}
      {slug === "plywood" && (
        <BrandMarquee title="Plywood Brands" logos={PLYWOOD_BRAND_LOGOS} className="py-[30px]" />
      )}
      {slug === "hardware" && (
        <BrandMarquee title="Hardware Brands" logos={HARDWARE_BRAND_LOGOS} variant="warm" className="py-[30px]" />
      )}
      {slug === "laminates" && (
        <BrandMarquee title="Laminate Brands" logos={LAMINATE_BRAND_LOGOS} className="py-[30px]" />
      )}

      {/* Related products */}
      <section className="py-[30px] bg-cream">

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
