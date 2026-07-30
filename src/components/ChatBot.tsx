import { useEffect, useRef, useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { SITE, CATEGORIES } from "@/lib/site";

type Msg = { from: "bot" | "user"; text: string };

const QUICK = [
  "Products & brands",
  "Store timings",
  "Location",
  "Get a quote",
  "Talk to us",
];

function reply(q: string): string {
  const t = q.toLowerCase();
  if (/(product|brand|plywood|laminate|veneer|kitchen|door|hardware)/.test(t)) {
    return `We stock ${CATEGORIES.map((c) => c.title).join(", ")} — from trusted brands like Greenply, CenturyPly, Hettich, Hafele, Merino and Greenlam. Tell me which one you need and I'll guide you.`;
  }
  if (/(time|hour|open|close|timing)/.test(t)) {
    return SITE.hours.map((h) => `${h.day}: ${h.time}`).join("\n");
  }
  if (/(where|location|address|map|shop|reach)/.test(t)) {
    return `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}.`;
  }
  if (/(quote|price|cost|rate|estimate|budget)/.test(t)) {
    return `Happy to help with pricing. Share your requirement on WhatsApp (${SITE.phone}) or call us and our team will send a detailed quote the same day.`;
  }
  if (/(call|contact|talk|phone|whatsapp|number)/.test(t)) {
    return `Call us at ${SITE.phone} or message on WhatsApp — we reply quickly during store hours.`;
  }
  if (/(hi|hello|hey|namaste)/.test(t)) {
    return "Hello! I'm Durga Assist. Ask me about plywood, laminates, hardware, timings or pricing.";
  }
  return `I can help with products, brands, store timings, location and quotes. For anything specific, call ${SITE.phone} — our team is glad to help.`;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm Durga Assist 👋 What are you looking for today?" },
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

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: reply(q) }]);
    }, 650);
  };

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
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/70 hover:text-gold">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="max-h-72 space-y-3 overflow-y-auto bg-cream px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                <p
                  className={
                    m.from === "user"
                      ? "max-w-[80%] whitespace-pre-line rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-card px-3 py-2 text-sm text-foreground shadow-soft"
                  }
                >
                  {m.text}
                </p>
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
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-gold hover:text-gold"
              >
                {q}
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
