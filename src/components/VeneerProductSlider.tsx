import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAutoplayEmbla } from "@/hooks/useAutoplayEmbla";
import veneerTypesAsset from "@/assets/veneer-types.webp.asset.json";
import teakWall from "@/assets/veneer-app/teak-wall.jpg";
import oakWardrobe from "@/assets/veneer-app/oak-wardrobe.jpg";
import walnutTvUnit from "@/assets/veneer-app/walnut-tv-unit.jpg";
import veneerDoor from "@/assets/veneer-app/veneer-door.jpg";
import mapleStudy from "@/assets/veneer-app/maple-study.jpg";
import burlDining from "@/assets/veneer-app/burl-dining.jpg";

export const VENEER_GALLERY = [
  {
    img: teakWall,
    type: "Teak Veneer",
    place: "Living Room Feature Wall",
    note: "Rich golden grain with natural moisture resistance — ideal for statement wall panelling.",
  },
  {
    img: oakWardrobe,
    type: "Oak Veneer",
    place: "Bedroom Wardrobe Shutters",
    note: "Light tone with prominent grain that keeps compact bedrooms bright and airy.",
  },
  {
    img: walnutTvUnit,
    type: "Walnut Veneer",
    place: "TV Unit & Media Console",
    note: "Dark, luxurious finish with high stability — pairs beautifully with cove lighting.",
  },
  {
    img: veneerDoor,
    type: "Premium Veneer",
    place: "Main Entrance & Room Doors",
    note: "Durable veneered door faces that can be polished to a rich, long-lasting sheen.",
  },
  {
    img: mapleStudy,
    type: "Maple Veneer",
    place: "Home Office & Study Units",
    note: "Subtle grain and stain-resistant surface for a clean, modern workspace.",
  },
  {
    img: burlDining,
    type: "Burl Veneer",
    place: "Dining Ceiling & Partitions",
    note: "Rare swirling patterns used as a decorative accent in premium interiors.",
  },
];

const SLIDES = [
  {
    img: veneerTypesAsset.url,
    type: "All Veneer Types",
    place: "Types of Veneers for Home Interiors",
    contain: true,
  },
  ...VENEER_GALLERY.map((g) => ({
    img: g.img,
    type: g.type,
    place: g.place,
    contain: false,
  })),
];

export function VeneerProductSlider() {
  const { emblaRef, emblaApi, selected, scrollTo, pauseHandlers } = useAutoplayEmbla({ interval: 4000 });

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-elevated bg-background"
      {...pauseHandlers}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((s, i) => (
            <div key={s.place} className="relative min-w-0 flex-[0_0_100%]">
              <img
                src={s.img}
                alt={`${s.type} — ${s.place} | Best veneer shops in Vijayawada`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "auto"}
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
