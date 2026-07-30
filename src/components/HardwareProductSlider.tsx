import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAutoplayEmbla } from "@/hooks/useAutoplayEmbla";
import hardwareTypesAsset from "@/assets/hardware-types.webp.asset.json";
import kitchenHardware from "@/assets/hardware-app/kitchen-hardware.jpg";
import doorHardware from "@/assets/hardware-app/door-hardware.jpg";
import slidingHardware from "@/assets/hardware-app/sliding-hardware.jpg";
import bathroomHardware from "@/assets/hardware-app/bathroom-hardware.jpg";
import glassHardware from "@/assets/hardware-app/glass-hardware.jpg";
import furnitureHardware from "@/assets/hardware-app/furniture-hardware.jpg";

export const HARDWARE_GALLERY = [
  {
    img: kitchenHardware,
    type: "Kitchen Hardware",
    place: "Modular Kitchen Drawers & Baskets",
    note: "Soft-close drawer systems, pull-out baskets and premium handles for everyday kitchen use.",
  },
  {
    img: doorHardware,
    type: "Door Hardware",
    place: "Main Door & Bedroom Doors",
    note: "Mortise locks, lever handles, hinges and door closers for smooth, secure operation.",
  },
  {
    img: slidingHardware,
    type: "Sliding Hardware",
    place: "Bedroom Wardrobes",
    note: "Sliding rollers, tracks and flush pull handles that save space in compact rooms.",
  },
  {
    img: furnitureHardware,
    type: "Furniture Hardware",
    place: "TV Units & Study Tables",
    note: "Gas springs, brackets, connectors and leg levelers for sturdy, functional furniture.",
  },
  {
    img: bathroomHardware,
    type: "Bathroom Hardware",
    place: "Bathrooms & Washrooms",
    note: "Towel racks, rings, robe hooks and soap dishes in rust-free stainless finishes.",
  },
  {
    img: glassHardware,
    type: "Glass Hardware",
    place: "Shower Partitions & Glass Doors",
    note: "Glass hinges, patch fittings, clamps and floor springs for frameless glass work.",
  },
];

const SLIDES = [
  {
    img: hardwareTypesAsset.url,
    type: "All Hardware Types",
    place: "Types of Hardware for Every Home",
    contain: true,
  },
  ...HARDWARE_GALLERY.map((g) => ({
    img: g.img,
    type: g.type,
    place: g.place,
    contain: false,
  })),
];

export function HardwareProductSlider() {
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
                alt={`${s.type} — ${s.place} | Best hardware shop in Vijayawada`}
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
