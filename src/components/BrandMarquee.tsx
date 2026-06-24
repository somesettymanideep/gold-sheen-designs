interface BrandMarqueeProps {
  title: string;
  brands?: string[];
  logos?: { name: string; logo: string }[];
  variant?: "light" | "warm";
}

export function BrandMarquee({
  title,
  brands,
  logos,
  variant = "light",
}: BrandMarqueeProps) {
  const items = logos
    ? [...logos, ...logos]
    : [...(brands ?? []), ...(brands ?? [])].map((name) => ({ name, logo: undefined }));

  return (
    <section className={`py-10 ${variant === "warm" ? "gradient-warm" : "bg-background"}`}>
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
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0 w-56 h-28 grid place-items-center rounded-2xl bg-white border border-border shadow-soft hover:shadow-gold hover:border-gold/40 transition group p-6"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  loading="lazy"
                  className="max-h-16 max-w-[80%] w-auto object-contain transition duration-300"
                />
              ) : (
                <span className="font-display text-xl font-bold text-charcoal/60 group-hover:text-gold transition tracking-wide">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
