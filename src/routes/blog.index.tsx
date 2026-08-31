import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BookOpen, Calendar, Clock, User } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import { BLOG_POSTS } from "@/lib/blog-data";
import bannerProducts from "@/assets/banner-products.jpg";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Home Interior Blogs & Material Selection Guides — Vijayawada" },
      {
        name: "description",
        content:
          "Read expert tips and interior design guides on choosing the right plywood, decorative laminates, hardware accessories, and modular kitchens for your home in Vijayawada.",
      },
      {
        name: "keywords",
        content:
          "interior design blog, plywood selection tips, laminates guide, modular kitchen ideas vijayawada, home hardware guides",
      },
      {
        property: "og:title",
        content: "Blogs & Material Selection Guides — Durga Hardware and Plywood",
      },
      {
        property: "og:description",
        content:
          "Expert advice, material comparisons, and step-by-step guides for choosing the best interior materials for your project.",
      },
      { property: "og:url", content: "https://gold-sheen-designs.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://gold-sheen-designs.lovable.app/blog" }],
  }),
  component: BlogPage,
});

const CATEGORIES = ["All", "Plywood", "Laminates", "Hardware"];

function BlogPage() {
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredPosts = BLOG_POSTS.filter(
    (post) => selectedCat === "All" || post.category.toLowerCase() === selectedCat.toLowerCase(),
  );

  return (
    <PageLayout>
      <PageHero
        eyebrow="Blog & Insights"
        title="Expert Guides for Beautiful Interiors"
        subtitle="Professional advice, comparisons, and design tips to help you select materials and construct long-lasting spaces."
        crumb="Blog"
        bgImage={bannerProducts}
      />

      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium tracking-wide transition ${
                  selectedCat === cat
                    ? "gradient-gold text-white shadow-soft"
                    : "bg-cream text-charcoal hover:bg-beige"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout (Row of Three) */}
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-charcoal/85 backdrop-blur-xs px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                      {post.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-charcoal group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold group-hover:text-primary transition-colors pt-4 border-t border-border">
                      Read Article <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-55 mb-4" />
              <h3 className="text-lg font-semibold text-charcoal">No articles found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We're currently writing articles for this category. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
