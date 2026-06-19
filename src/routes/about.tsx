import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Eye, Target, Gem } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import aboutStore from "@/assets/durga-storefront.webp.asset.json";
import bannerAbout from "@/assets/banner-about.jpg";
import teamDurga from "@/assets/team-durga.jpg";
import teamLakshmi from "@/assets/team-lakshmi.jpg";
import teamKarthik from "@/assets/team-karthik.jpg";
import teamRamesh from "@/assets/team-ramesh.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Durga Hardware and Plywood, Vijayawada" },
      {
        name: "description",
        content:
          "10+ years of trusted service in Vijayawada. Discover our story, vision, mission and the team behind Durga Hardware and Plywood.",
      },
      { property: "og:title", content: "About Durga Hardware and Plywood" },
      {
        property: "og:description",
        content: "Our story, vision, mission and team — built on trust, quality and service.",
      },
    ],
  }),
  component: AboutPage,
});

function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function Stat({ n, label, suffix = "+" }: { n: number; label: string; suffix?: string }) {
  const { val, ref } = useCounter(n);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl sm:text-6xl font-bold text-gradient-gold">
        {val.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.22em] text-white/65">{label}</div>
    </div>
  );
}

function AboutPage() {
  const vmv = [
    {
      icon: Eye,
      t: "Vision",
      d: "To become the most trusted destination for premium hardware and plywood products across Andhra Pradesh.",
    },
    {
      icon: Target,
      t: "Mission",
      d: "Deliver quality products and exceptional customer service that empowers homeowners, builders and designers.",
    },
    {
      icon: Gem,
      t: "Values",
      d: "Integrity, Quality, Trust, Innovation and unwavering Customer Satisfaction.",
    },
  ];

  const team = [
    { name: "Mr. Durga Prasad", role: "Founder & Managing Director", photo: teamDurga },
    { name: "Mrs. Lakshmi", role: "Showroom Director", photo: teamLakshmi },
    { name: "Mr. Karthik", role: "Head of Sales", photo: teamKarthik },
    { name: "Mr. Ramesh", role: "Operations Lead", photo: teamRamesh },
  ];

  return (
    <PageLayout>
      <PageHero
        eyebrow="About"
        title="A Legacy of Trust, Craftsmanship & Quality"
        subtitle="More than a decade of serving Vijayawada's homes, builders and interior designers with premium materials."
        crumb="About"
        bgImage={bannerAbout}
      />

      {/* Our Story */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl gradient-gold opacity-20" />
            <div className="relative overflow-hidden rounded-2xl shadow-elevated">
              <img
                src={aboutStore.url}
                alt="Durga Hardware and Plywood storefront on M.G. Road, Vijayawada"
                loading="lazy"
                className="w-full h-[480px] object-cover"
              />
            </div>
          </div>
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              A decade of <span className="text-gradient-gold">premium service</span> in
              Vijayawada
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                What began as a small storefront on M.G. Road has grown into Vijayawada's
                premier destination for plywood, laminates, hardware and modular kitchen
                solutions. Through every project we've taken on, one principle has stayed
                constant: never compromise on quality.
              </p>
              <p>
                Today we partner with India's most respected brands — Greenply, CenturyPly,
                Hettich, Hafele, Godrej and many more — and our showroom welcomes thousands of
                homeowners, contractors and interior designers each year.
              </p>
              <p>
                Our story is written by our customers. Their homes, their kitchens, their
                interiors — every one of them is a chapter we're proud of.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section className="section-pad gradient-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow">What Drives Us</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              Vision, Mission &amp; <span className="text-gradient-gold">Values</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {vmv.map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="glass-card rounded-3xl p-8 shadow-soft hover:shadow-gold hover:-translate-y-1 transition duration-500"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold shadow-gold">
                  <Icon className="h-6 w-6 text-white" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-charcoal">{t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow">Meet The Team</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
              The people behind <span className="text-gradient-gold">Durga</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {team.map(({ name, role, photo }) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-[28px] shadow-elevated aspect-[3/4] hover:-translate-y-1 transition duration-500"
              >
                <img
                  src={photo}
                  alt={name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                {/* Bottom gradient overlay for legibility */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                {/* Text content */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white leading-tight drop-shadow">
                    {name}
                  </h3>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-charcoal text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 grid-cols-2 lg:grid-cols-4">
          <Stat n={5000} label="Happy Customers" />
          <Stat n={100} label="Brands" />
          <Stat n={10} label="Years Experience" />
          <Stat n={10000} label="Projects Supported" />
        </div>
      </section>
    </PageLayout>
  );
}
