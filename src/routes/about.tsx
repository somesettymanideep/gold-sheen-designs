import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Eye, Target, Gem, Trophy, Award, Star, Medal, Crown } from "lucide-react";
import { PageLayout, PageHero } from "@/components/PageLayout";
import aboutStore from "@/assets/durga-storefront.webp.asset.json";
import bannerAbout from "@/assets/banner-about.jpg";
import teamDurga from "@/assets/team-durga.jpg";
import teamBharat from "@/assets/team-bharat.jpg";
import awardPidilite from "@/assets/awards/award-pidilite.png.asset.json";
import awardHafeleTrophy from "@/assets/awards/award-hafele-trophy.png.asset.json";
import awardHafeleCert from "@/assets/awards/award-hafele-certificate.png.asset.json";
import awardMikasa from "@/assets/awards/award-mikasa.png.asset.json";
import awardEbco from "@/assets/awards/award-ebco.png.asset.json";


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

function useCounter(target: number, duration = 1800, inView = true) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic — smooth, premium deceleration
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, inView]);
  return val;
}



function useInView<T extends HTMLElement>(threshold = 0.2, rootMargin = "0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return { ref, inView };
}



type AwardItem = {
  image: string;
  title: string;
  year: string;
  desc: string;
  tier: "gold" | "silver" | "bronze";
};

const tierStyles: Record<AwardItem["tier"], { badge: string; ring: string }> = {
  gold: { badge: "bg-gold text-white", ring: "group-hover:shadow-gold" },
  silver: { badge: "bg-[#9aa0a6] text-white", ring: "group-hover:shadow-soft" },
  bronze: { badge: "bg-[#a9744f] text-white", ring: "group-hover:shadow-soft" },
};

function AwardCard({ award, delay }: { award: AwardItem; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tier = tierStyles[award.tier];
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative shrink-0 w-[80%] sm:w-auto snap-center rounded-2xl bg-card border border-border overflow-hidden shadow-soft transition-all duration-700 hover:-translate-y-2 ${tier.ring} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* glowing brand border on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-gold/0 group-hover:ring-gold/60 transition duration-500" />
      <div className="relative overflow-hidden">
        <img
          src={award.image}
          alt={award.title}
          loading="lazy"
          width={768}
          height={768}
          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold shadow ${tier.badge}`}
        >
          {award.year}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-charcoal leading-snug">
          {award.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{award.desc}</p>
      </div>
    </div>
  );
}

function AwardsSection() {
  const awards: AwardItem[] = [
    {
      image: awardHafeleTrophy.url,
      title: "Häfele Association Award",
      year: "2023",
      desc: "Honoured by Häfele for our valued association and partnership in 2023.",
      tier: "gold",
    },
    {
      image: awardHafeleCert.url,
      title: "Häfele Authorised Partner",
      year: "2023",
      desc: "Certified authorised partner for Häfele India's Distribution Business vertical.",
      tier: "silver",
    },
    {
      image: awardMikasa.url,
      title: "Mikasa Plywood Authorised Dealer",
      year: "2027",
      desc: "Certificate of Authorisation as an authorised dealer for Mikasa Plywood (valid up to July 2027).",
      tier: "bronze",
    },
    {
      image: awardEbco.url,
      title: "Ebco Authorised Dealer",
      year: "1963",
      desc: "Recognised as an authorised dealer for Ebco quality hardware.",
      tier: "gold",
    },
  ];

  const featured = useInView<HTMLDivElement>();

  return (
    <section className="section-pad relative overflow-hidden bg-[#f7f4ef] text-charcoal">
      {/* decorative background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, var(--gold) 0%, transparent 45%), radial-gradient(circle at 85% 80%, var(--gold) 0%, transparent 45%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center text-gold">Our Achievements</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            Awards &amp; <span className="text-gold">Recognition</span>
          </h2>
          <p className="mt-5 text-charcoal/70 leading-relaxed">
            A decade of dedication, celebrated across the industry. Our shelves hold more than
            premium products — they hold the trust and recognition we've earned.
          </p>
        </div>

        {/* Featured award */}
        <div
          ref={featured.ref}
          className={`mt-14 grid gap-8 lg:grid-cols-2 items-center rounded-2xl glass p-6 sm:p-10 transition-all duration-700 ${
            featured.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 gradient-gold opacity-20" />
            <img
              src={awardFeatured}
              alt="Hall of Fame — Lifetime Achievement Award"
              loading="lazy"
              width={1024}
              height={1024}
              className="relative w-full h-72 sm:h-80 object-cover"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <Crown className="h-4 w-4" /> Featured Award
            </span>
            <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-charcoal">
              Lifetime Achievement in Excellence
            </h3>
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              Our highest honour — awarded for a sustained legacy of quality, integrity and
              service that has shaped homes across Andhra Pradesh for over a decade.
            </p>
            <div className="mt-6 flex items-center gap-3 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="ml-2 text-sm font-semibold text-charcoal/80">Prestige Honour 2024</span>
            </div>
          </div>
        </div>

        {/* Awards grid — mobile carousel, tablet 2-col, desktop 4-col */}
        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none]">
          {awards.map((a, i) => (
            <AwardCard key={a.title} award={a} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
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
    { name: "Narayana Mohata", role: "Founder", photo: teamDurga },
    { name: "Bharat Gilda", role: "CEO", photo: teamBharat },
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
          <div className="mt-14 grid gap-6 sm:gap-7 sm:grid-cols-2 max-w-2xl mx-auto">
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

      {/* Awards & Recognition */}
      <AwardsSection />


      {/* Stats — circular highlights */}
      <StatsSection />
    </PageLayout>
  );
}

function formatStat(v: number) {
  if (v >= 1000) {
    const k = v / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return `${v}`;
}

function CircleStat({
  n,
  suffix = "+",
  title,
  subtitle,
  delay,
}: {
  n: number;
  suffix?: string;
  title: string;
  subtitle: string;
  delay: number;
}) {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>(0.3);
  const val = useCounter(n, 1800, inView);
  return (
    <div
      ref={viewRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 shrink-0 flex flex-col items-center text-center will-change-transform transition-all duration-1000 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:z-10 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}

    >
      <div className="relative grid aspect-square w-full place-items-center rounded-full bg-cream border border-border/40 shadow-soft transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:shadow-gold">
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-gold/0 group-hover:ring-gold/50 transition duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]" />
        <div className="font-sans text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-charcoal">
          {formatStat(val)}
          {suffix}
        </div>
      </div>
      <h3 className="mt-4 sm:mt-5 font-sans text-sm sm:text-base lg:text-lg font-semibold text-charcoal leading-tight">
        {title}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground max-w-[7rem] sm:max-w-[6rem] md:max-w-[7rem] lg:max-w-[8rem] xl:max-w-[10rem] leading-tight">
        {subtitle}
      </p>
    </div>

  );
}


function StatsSection() {
  const header = useInView<HTMLDivElement>();
  const stats = [
    { n: 5000, suffix: "+", title: "Customers", subtitle: "Happy & returning" },
    { n: 10, suffix: "+", title: "Years", subtitle: "Of trusted service" },
    { n: 100, suffix: "+", title: "Brands", subtitle: "Premium partners" },
    { n: 50, suffix: "+", title: "Categories", subtitle: "Hardware & plywood" },
  ];
  return (
    <section className="section-pad bg-background relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={header.ref}
          style={{ transitionDelay: "100ms" }}
          className={`max-w-2xl mx-auto text-center will-change-transform transition-all duration-1000 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
            header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="eyebrow justify-center">By The Numbers</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal">
            A decade of <span className="text-gradient-gold">measurable trust</span>
          </h2>
        </div>
        <div className="mt-12 sm:mt-16 flex overflow-x-auto pb-4 sm:pb-0 snap-x snap-mandatory sm:justify-center sm:overflow-visible gap-4 sm:gap-6 lg:gap-8 [-ms-overflow-style:none] [scrollbar-width:none]">
          {stats.map((s, i) => (
            <CircleStat key={s.title} {...s} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}


