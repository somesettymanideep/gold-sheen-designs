import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingActions } from "./FloatingActions";
import { cn } from "@/lib/utils";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
  bgImage,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumb: string;
  bgImage?: string;
  className?: string;
}) {
  return (
    <section className={cn("relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden gradient-dark", className)}>
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            width={1920}
            height={640}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/75" />
        </>
      )}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(172,134,71,0.4), transparent 50%), radial-gradient(circle at 80% 60%, rgba(100,55,26,0.3), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && <span className="eyebrow text-gold">{eyebrow}</span>}
        <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl mx-auto text-white/70 text-base sm:text-lg">{subtitle}</p>
        )}
        <nav className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
          <a href="/" className="hover:text-gold">Home</a>
          <span>/</span>
          <span className="text-gold">{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
