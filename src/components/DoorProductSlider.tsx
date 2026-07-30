import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import doorTypesAsset from "@/assets/profile-doors-showcase.webp.asset.json";
import mainEntrance from "@/assets/door-app/main-entrance.jpg";
import bedroomDoor from "@/assets/door-app/bedroom-door.jpg";
import bathroomDoor from "@/assets/door-app/bathroom-door.jpg";
import slidingDoor from "@/assets/door-app/sliding-door-balcony.jpg";
import wardrobeShutter from "@/assets/door-app/wardrobe-shutter.jpg";
import poojaDoor from "@/assets/door-app/pooja-door.jpg";

export const DOOR_GALLERY = [
  {
    img: mainEntrance,
    type: "Designer Main Door",
    place: "Home Entrance",
    note: "Dark walnut membrane finish with slim gold grooves for a rich, welcoming first impression.",
  },
  {
    img: bedroomDoor,
    type: "Flush Profile Door",
    place: "Bedroom Entry",
    note: "Light oak laminate shutters with clean lines — warp-free and easy to maintain.",
  },
  {
    img: bathroomDoor,
    type: "Waterproof WPC Door",
    place: "Bathroom & Utility",
    note: "100% waterproof cores that never swell, rot or attract termites in wet areas.",
  },
  {
    img: slidingDoor,
    type: "Sliding Profile Door",
    place: "Living Room & Balcony",
    note: "Slim-frame sliding panels that save space and open up the room to natural light.",
  },
  {
    img: wardrobeShutter,
    type: "Profile Shutters",
    place: "Wardrobe Fronts",
    note: "Handle-less grooved shutters in PU and high-gloss finishes for a seamless wardrobe look.",
  },
  {
    img: poojaDoor,
    type: "Carved CNC Door",
    place: "Pooja Room & Study",
    note: "Teak veneer double doors with intricate CNC carving for traditional Indian interiors.",
  },
];

const SLIDES = [
  {
    img: doorTypesAsset.url,
    type: "All Door Types",
    place: "Types of Profile Doors for Homes",
    contain: true,
  },
  ...DOOR_GALLERY.map((g) => ({
    img: g.img,
    type: g.type,
    place: g.place,
    contain: false,
  })),
];

export function DoorProductSlider() {
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
                alt={`${s.type} — ${s.place} | Best profile doors shop in Vijayawada`}
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
