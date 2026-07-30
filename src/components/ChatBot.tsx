import { useEffect, useRef, useState } from "react";
import { X, Send, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SITE, CATEGORIES } from "@/lib/site";
import {
  PRODUCT_DETAILS,
  PLYWOOD_BRAND_LOGOS,
  HARDWARE_BRAND_LOGOS,
  LAMINATE_BRAND_LOGOS,
} from "@/lib/product-data";

type Action = { label: string; href: string; external?: boolean };
type Msg = { from: "bot" | "user"; text: string; actions?: Action[] };

const CALL: Action = { label: `Call ${SITE.phone}`, href: SITE.phoneHref, external: true };
const WHATSAPP: Action = { label: "WhatsApp us", href: SITE.whatsappHref, external: true };
const CONTACT: Action = { label: "Contact page", href: "/contact" };
const MAP: Action = { label: "Open in Maps", href: SITE.mapsHref, external: true };

const TITLE_BY_SLUG: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.title]),
);

const BRANDS_BY_SLUG: Record<string, string[]> = {
  plywood: PLYWOOD_BRAND_LOGOS.map((b) => b.name),
  hardware: HARDWARE_BRAND_LOGOS.map((b) => b.name),
  laminates: LAMINATE_BRAND_LOGOS.map((b) => b.name),
};

function productAnswer(slug: string): Msg {
  const d = PRODUCT_DETAILS[slug];
  const title = TITLE_BY_SLUG[slug] ?? slug;
  const brands = BRANDS_BY_SLUG[slug] ?? d.brands;
  const text = [
    `${title} — ${d.description}`,
    "",
    ...d.features.map((f) => `• ${f}`),
    "",
    ...d.specs.map((s) => `${s.label}: ${s.value}`),
    "",
    `Brands: ${brands.join(", ")}`,
  ].join("\n");
  return {
    from: "bot",
    text,
    actions: [
      { label: `View ${title} page`, href: `/products/${slug}` },
      WHATSAPP,
      CALL,
    ],
  };
}

/** Quick-reply groups: top-level menu plus contextual sub-menus. */
type Chip = { label: string; go?: string; ask?: string };

const MENUS: Record<string, { title?: string; chips: Chip[] }> = {
  root: {
    chips: [
      { label: "Products", go: "products" },
      { label: "Modular kitchens", go: "modular-kitchens" },
      { label: "Profile doors", go: "profile-doors" },
      { label: "Hardware", go: "hardware" },
      { label: "Contact options", go: "contact" },
    ],
  },
  products: {
    chips: [
      ...CATEGORIES.map((c) => ({ label: c.title, ask: c.slug })),
      { label: "Brands we stock", ask: "brands" },
      { label: "← Back", go: "root" },
    ],
  },
  "modular-kitchens": {
    chips: [
      { label: "What's included", ask: "modular-kitchens" },
      { label: "Kitchen accessories", ask: "kitchen-accessories" },
      { label: "Layouts & shutters", ask: "kitchen-layouts" },
      { label: "Book a design visit", ask: "kitchen-visit" },
      { label: "← Back", go: "root" },
    ],
  },
  "profile-doors": {
    chips: [
      { label: "Door types & finishes", ask: "profile-doors" },
      { label: "Custom sizes", ask: "door-custom" },
      { label: "Door hardware", ask: "door-hardware" },
      { label: "Get door pricing", ask: "quote" },
      { label: "← Back", go: "root" },
    ],
  },
  hardware: {
    chips: [
      { label: "Hardware range", ask: "hardware" },
      { label: "Hinges & channels", ask: "hinges" },
      { label: "Locks & handles", ask: "locks" },
      { label: "Hardware brands", ask: "hardware-brands" },
      { label: "← Back", go: "root" },
    ],
  },
  contact: {
    chips: [
      { label: "Call us", ask: "call" },
      { label: "WhatsApp", ask: "whatsapp" },
      { label: "Store timings", ask: "hours" },
      { label: "Showroom location", ask: "location" },
      { label: "Get a quote", ask: "quote" },
      { label: "← Back", go: "root" },
    ],
  },
};

function keyedReply(key: string): Msg | null {
  if (PRODUCT_DETAILS[key]) return productAnswer(key);

  switch (key) {
    case "brands":
      return {
        from: "bot",
        text: [
          `Plywood: ${PLYWOOD_BRAND_LOGOS.map((b) => b.name).join(", ")}`,
          `Hardware: ${HARDWARE_BRAND_LOGOS.map((b) => b.name).join(", ")}`,
          `Laminates: ${LAMINATE_BRAND_LOGOS.map((b) => b.name).join(", ")}`,
        ].join("\n\n"),
        actions: [{ label: "All products", href: "/products" }, WHATSAPP],
      };
    case "kitchen-accessories":
      return {
        from: "bot",
        text: "Kitchen accessories in stock: pull-out baskets, cutlery trays, corner solutions (magic & carousel), tall pantry units, bottle pull-outs, waste bins, soft-close hinges and telescopic channels — from Hettich, Häfele, Blum, Kesseböhmer and Ebco.",
        actions: [
          { label: "Modular kitchens page", href: "/products/modular-kitchens" },
          WHATSAPP,
        ],
      };
    case "kitchen-layouts":
      return {
        from: "bot",
        text: "Layouts: L-shape, U-shape, Parallel and Island.\nShutters: Acrylic, Laminate, PU and Membrane.\nCarcass: BWP Ply or HDHMR — moisture resistant.\nWe include 3D design visualization before you buy.",
        actions: [{ label: "Modular kitchens page", href: "/products/modular-kitchens" }, CALL],
      };
    case "kitchen-visit":
      return {
        from: "bot",
        text: `Happy to plan your kitchen. Share your floor size and layout on WhatsApp, or visit the showroom — ${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}.`,
        actions: [WHATSAPP, CONTACT, MAP],
      };
    case "door-custom":
      return {
        from: "bot",
        text: "Yes — profile doors are made to custom sizes and designs, in solid wood or engineered warp-resistant cores, with membrane, PU, veneer or laminate finishes. Send us the opening size and we'll suggest options.",
        actions: [{ label: "Profile doors page", href: "/products/profile-doors" }, WHATSAPP],
      };
    case "door-hardware":
      return {
        from: "bot",
        text: "For doors we stock locks, mortise handles, hinges, door closers, floor springs and sliding systems from Häfele, Hettich, Ozone, Ebco and Dorset — all genuine and warranty backed.",
        actions: [{ label: "Hardware page", href: "/products/hardware" }, CALL],
      };
    case "hinges":
      return {
        from: "bot",
        text: "Soft-close hinges (straight, crank, clip-on) and telescopic/tandem drawer channels rated up to 40 kg — Hettich, Häfele, Blum and Ebco. Corrosion-resistant finishes with brand warranty.",
        actions: [{ label: "Hardware page", href: "/products/hardware" }, WHATSAPP],
      };
    case "locks":
      return {
        from: "bot",
        text: "Door locks, digital locks, mortise handles, cabinet handles and bathroom fittings in SS, Chrome, Matte and Antique finishes — Ozone, Dorset, Yale, Godrej, Europa and Häfele.",
        actions: [{ label: "Hardware page", href: "/products/hardware" }, CALL],
      };
    case "hardware-brands":
      return {
        from: "bot",
        text: `Hardware brands we deal with: ${HARDWARE_BRAND_LOGOS.map((b) => b.name).join(", ")}.`,
        actions: [{ label: "Hardware page", href: "/products/hardware" }, WHATSAPP],
      };
    case "hours":
      return {
        from: "bot",
        text: SITE.hours.map((h) => `${h.day}: ${h.time}`).join("\n"),
        actions: [CALL, MAP],
      };
    case "location":
      return {
        from: "bot",
        text: `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}.`,
        actions: [MAP, CALL],
      };
    case "call":
      return { from: "bot", text: `Call us on ${SITE.phone} during store hours — we answer quickly.`, actions: [CALL, WHATSAPP] };
    case "whatsapp":
      return { from: "bot", text: "Tap below to message us on WhatsApp with your requirement — photos and sizes help us quote faster.", actions: [WHATSAPP] };
    case "quote":
      return {
        from: "bot",
        text: `Share your requirement — product, quantity/sizes and location — and our team sends a detailed quote the same day. Fastest on WhatsApp (${SITE.phone}).`,
        actions: [WHATSAPP, CONTACT, CALL],
      };
    default:
      return null;
  }
}

function freeTextReply(q: string): Msg {
  const t = q.toLowerCase();
  const slug = CATEGORIES.find(
    (c) => t.includes(c.title.toLowerCase()) || t.includes(c.slug.replace("-", " ")),
  )?.slug;
  if (slug) return productAnswer(slug);
  if (/(kitchen|basket|pantry|cutlery)/.test(t)) return keyedReply("kitchen-accessories")!;
  if (/(door)/.test(t)) return productAnswer("profile-doors");
  if (/(hinge|channel|handle|lock|fitting|hardware)/.test(t)) return keyedReply("hinges")!;
  if (/(brand)/.test(t)) return keyedReply("brands")!;
  if (/(time|hour|open|close|timing)/.test(t)) return keyedReply("hours")!;
  if (/(where|location|address|map|reach|shop)/.test(t)) return keyedReply("location")!;
  if (/(quote|price|cost|rate|estimate|budget)/.test(t)) return keyedReply("quote")!;
  if (/(call|contact|talk|phone|whatsapp|number)/.test(t)) return keyedReply("call")!;
  if (/^(hi|hello|hey|namaste)/.test(t))
    return { from: "bot", text: "Hello! I'm Durga Assist. Pick a topic below or ask me about plywood, laminates, hardware, kitchens, doors, timings or pricing." };
  return {
    from: "bot",
    text: `I can help with our six product categories, brands, store timings, location and quotes. For anything specific, call ${SITE.phone}.`,
    actions: [WHATSAPP, CALL, CONTACT],
  };
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [menu, setMenu] = useState<string>("root");
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I'm Durga Assist 👋 What are you looking for today?",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Cursor interaction: orb leans toward the pointer and its eye follows it.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const orb = orbRef.current;
      if (!orb) return;
      const r = orb.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const pull = Math.max(0, 1 - dist / 320);
      const ang = Math.atan2(dy, dx);
      orb.style.transform = `translate(${Math.cos(ang) * 14 * pull}px, ${Math.sin(ang) * 14 * pull}px) scale(${1 + pull * 0.08})`;
      if (pupilRef.current) {
        pupilRef.current.style.transform = `translate(${Math.cos(ang) * 5}px, ${Math.sin(ang) * 5}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  const push = (userText: string, botMsg: Msg) => {
    setMsgs((m) => [...m, { from: "user", text: userText }]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, botMsg]);
    }, 550);
  };

  const onChip = (chip: Chip) => {
    if (chip.go) {
      setMenu(chip.go);
      if (chip.go !== "root") {
        push(chip.label, {
          from: "bot",
          text:
            chip.go === "products"
              ? "Here are our six categories — pick one for details, specs and brands."
              : chip.go === "contact"
                ? "Sure — how would you like to reach us?"
                : `Ask me anything about ${chip.label.toLowerCase()} — pick an option below.`,
        });
      }
      return;
    }
    if (chip.ask) push(chip.label, keyedReply(chip.ask) ?? freeTextReply(chip.ask));
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setInput("");
    push(q, freeTextReply(q));
  };

  const chips = MENUS[menu]?.chips ?? MENUS.root.chips;

  return (
    <div className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-40">
      {open && (
        <div className="mb-3 w-[min(92vw,22rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-elevated animate-scale-in">
          <div className="gradient-dark flex items-center gap-3 px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-full gradient-gold text-white">
              <MessageCircle className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold text-white">Durga Assist</p>
              <p className="text-[11px] text-white/60">Typically replies instantly</p>
            </div>
            {menu !== "root" && (
              <button
                onClick={() => setMenu("root")}
                aria-label="Back to main menu"
                className="text-white/70 hover:text-gold"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/70 hover:text-gold">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="max-h-72 space-y-3 overflow-y-auto bg-cream px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : "flex flex-col items-start gap-2"}>
                <p
                  className={
                    m.from === "user"
                      ? "max-w-[80%] whitespace-pre-line rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "max-w-[90%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-card px-3 py-2 text-sm text-foreground shadow-soft"
                  }
                >
                  {m.text}
                </p>
                {m.actions && (
                  <div className="flex flex-wrap gap-1.5">
                    {m.actions.map((a) =>
                      a.external ? (
                        <a
                          key={a.label}
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full gradient-gold px-3 py-1 text-[11px] font-medium text-white"
                        >
                          {a.label}
                        </a>
                      ) : (
                        <Link
                          key={a.label}
                          to={a.href}
                          onClick={() => setOpen(false)}
                          className="rounded-full border border-gold/60 bg-card px-3 py-1 text-[11px] font-medium text-gold"
                        >
                          {a.label}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-1 rounded-2xl bg-card px-3 py-2 w-fit shadow-soft">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold"
                    style={{ animationDelay: `${d * 120}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 pt-3">
            {chips.map((c) => (
              <button
                key={c.label}
                onClick={() => onChip(c)}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-gold hover:text-gold"
              >
                {c.label}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 bg-card p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about plywood, prices…"
              className="flex-1 rounded-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-gold"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="grid h-9 w-9 place-items-center rounded-full gradient-gold text-white transition hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <div ref={orbRef} className="transition-transform duration-300 ease-out will-change-transform">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat assistant" : "Open chat assistant"}
          className="relative grid h-14 w-14 place-items-center rounded-full gradient-dark shadow-elevated ring-1 ring-gold/40"
        >
          <span className="absolute inset-0 rounded-full bg-gold/25 animate-ping" />
          <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white">
            <span ref={pupilRef} className="h-3 w-3 rounded-full bg-charcoal transition-transform duration-150 ease-out" />
          </span>
        </button>
      </div>
    </div>
  );
}
