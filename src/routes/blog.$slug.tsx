import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SITE } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    const title = post
      ? `${post.title} — Durga Hardware and Plywood`
      : "Blog — Durga Hardware and Plywood";
    const desc =
      post?.excerpt ??
      "Read the latest interior and materials guides on Durga Hardware and Plywood.";
    const img = post?.image;
    const url = `https://gold-sheen-designs.lovable.app/blog/${params.slug}`;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(img
          ? [
              { property: "og:image", content: img },
              { name: "twitter:image", content: img },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://gold-sheen-designs.lovable.app/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: "https://gold-sheen-designs.lovable.app/blog",
                  },
                  { "@type": "ListItem", position: 3, name: post.title, item: url },
                ],
              }),
            },
          ]
        : [],
    };
  },
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  component: BlogDetailsPage,
});

function formatText(text: string) {
  if (!text) return "";
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-charcoal">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function BlogDetailsPage() {
  const { post } = Route.useLoaderData();

  return (
    <PageLayout>
      {/* Blog Article Hero (Centered banner styling) */}
      <section className="relative pt-32 pb-16 sm:pt-40 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold hover:text-charcoal transition mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <span className="eyebrow block text-gold mb-3">{post.category}</span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground border-y border-border py-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="pb-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Content column */}
            <article className="lg:col-span-8">
              {/* Featured Image */}
              <div className="overflow-hidden rounded-2xl border border-border shadow-soft mb-10 max-h-[500px]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>

              {/* Parsed Blog Content Sections */}
              <div className="prose max-w-none text-charcoal/90 text-base sm:text-lg leading-relaxed space-y-6">
                {post.sections.map((section, sIdx) => {
                  switch (section.type) {
                    case "paragraph":
                      return (
                        <p key={sIdx} className="text-muted-foreground">
                          {formatText(section.text || "")}
                        </p>
                      );
                    case "h2":
                      return (
                        <h2
                          key={sIdx}
                          className="font-display text-2xl sm:text-3xl font-bold text-charcoal mt-10 mb-4 pb-2 border-b border-gold/15"
                        >
                          {section.text}
                        </h2>
                      );
                    case "h3":
                      return (
                        <h3
                          key={sIdx}
                          className="font-display text-xl sm:text-2xl font-bold text-charcoal mt-8 mb-3"
                        >
                          {section.text}
                        </h3>
                      );
                    case "h4":
                      return (
                        <h4
                          key={sIdx}
                          className="font-display text-lg sm:text-xl font-bold text-charcoal mt-6 mb-2"
                        >
                          {section.text}
                        </h4>
                      );
                    case "list":
                      return (
                        <ul key={sIdx} className="my-6 pl-1 space-y-3">
                          {section.items?.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed"
                            >
                              <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                              <span>{formatText(item)}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    case "faq":
                      return (
                        <div
                          key={sIdx}
                          className="mt-10 border border-border rounded-2xl p-6 bg-cream/35"
                        >
                          <h2 className="font-display text-2xl font-bold text-charcoal mb-6 border-b border-gold/15 pb-2">
                            Frequently Asked Questions
                          </h2>
                          <Accordion type="single" collapsible className="w-full space-y-2">
                            {section.faqs?.map((faq, faqIdx) => (
                              <AccordionItem
                                key={faqIdx}
                                value={`faq-${faqIdx}`}
                                className="border border-border rounded-xl bg-white px-4 py-1"
                              >
                                <AccordionTrigger className="font-semibold text-charcoal hover:no-underline text-left text-sm sm:text-base">
                                  {faq.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pt-2">
                                  {faq.a}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </article>

            {/* Right Sticky Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-8">
              {/* Showroom CTA Widget */}
              <div className="rounded-2xl border border-border bg-charcoal p-6 text-white shadow-soft">
                <span className="eyebrow text-gold">Visit Our Showroom</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold mt-2 mb-4 leading-tight">
                  Durga Hardware and Plywood
                </h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  Need professional assistance? Visit our Governor Peta showroom to view sample
                  boards, explore laminates, and consult with our experts.
                </p>

                <div className="space-y-4 text-sm text-white/80 border-t border-white/10 pt-6 mb-6">
                  <div className="flex gap-3 items-start">
                    <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <span>
                      {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Phone className="h-5 w-5 text-gold shrink-0" />
                    <a href={SITE.phoneHref} className="hover:text-gold transition">
                      +91 {SITE.phone}
                    </a>
                  </div>
                </div>

                <div className="grid gap-2">
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white py-3 text-sm font-semibold hover:opacity-95 transition"
                  >
                    <MessageSquare className="h-4 w-4 fill-current" /> WhatsApp Inquiry
                  </a>
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full gradient-gold text-white py-3 text-sm font-semibold hover:opacity-95 transition"
                  >
                    <Phone className="h-4 w-4" /> Call Dealer
                  </a>
                </div>
              </div>

              {/* Showroom Hours Widget */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h4 className="font-display text-lg font-bold text-charcoal mb-4">
                  Showroom Hours
                </h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {SITE.hours.map((h, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border-b border-border pb-2 last:border-b-0 last:pb-0"
                    >
                      <span className="font-medium text-charcoal">{h.day}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
