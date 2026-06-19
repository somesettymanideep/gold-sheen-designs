import { useEffect, useState } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex flex-col gap-3">
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="grid h-12 w-12 place-items-center rounded-full bg-charcoal text-white shadow-elevated hover:gradient-gold transition"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <a
        href={SITE.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elevated hover:scale-110 transition relative"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </a>
      <a
        href={SITE.phoneHref}
        aria-label="Call"
        className="grid h-14 w-14 place-items-center rounded-full gradient-gold text-white shadow-gold hover:scale-110 transition"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
