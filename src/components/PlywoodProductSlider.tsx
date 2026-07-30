import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import plywoodTypesAsset from "@/assets/plywood-types.webp.asset.json";
import { GALLERY } from "@/components/PlywoodApplicationGallery";

const SLIDES = [
  {
    img: plywoodTypesAsset.url,
    type: "All Plywood Types",
    place: "Types of Plywood for Home Use",
    contain: true,
  },
  ...GALLERY.map((g) => ({ img: g.img, type: g.type, place: g.place, contain: false })),
];

export function PlywoodProductSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    const id = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => {
      clearInterval(id);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-elevated bg-background">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((s) => (
            <div key={s.place} className="relative min-w-0 flex-[0_0_100%]">
              <img
                src={s.img}
                alt={`${s.type} — ${s.place} | Best plywood shop in Vijayawada`}
                loading="lazy"
                width={800}
                height={460}
                className={
                  s.contain
                    ? "w-full h-[460px] object-contain p-3"
                    : "w-full h-[460px] object-cover"
                }
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 to-transparent px-5 pb-5 pt-12">
                <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {s.type}
                </span>
                <p className="mt-2 font-display text-lg font-bold text-white">{s.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous image"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 text-charcoal shadow-soft hover:bg-background transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 text-charcoal shadow-soft hover:bg-background transition"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.place}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === selected ? "w-6 bg-gold" : "w-1.5 bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
