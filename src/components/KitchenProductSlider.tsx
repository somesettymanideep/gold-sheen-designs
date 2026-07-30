import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAutoplayEmbla } from "@/hooks/useAutoplayEmbla";
import kitchenTypesAsset from "@/assets/kitchen-accessories-types.webp.asset.json";
import tallPantry from "@/assets/kitchen-app/tall-pantry.jpg";
import cutleryDrawer from "@/assets/kitchen-app/cutlery-drawer.jpg";
import cornerSolution from "@/assets/kitchen-app/corner-solution.jpg";
import dishRack from "@/assets/kitchen-app/dish-rack.jpg";
import bottlePullout from "@/assets/kitchen-app/bottle-pullout.jpg";
import drawerSystem from "@/assets/kitchen-app/drawer-system.jpg";

export const KITCHEN_GALLERY = [
  {
    img: tallPantry,
    type: "Tall Unit / Pantry",
    place: "Floor-to-Ceiling Kitchen Storage",
    note: "Full-extension pull-out shelves that use vertical space for spices, oils, cans and snacks.",
  },
  {
    img: cutleryDrawer,
    type: "Cutlery Tray",
    place: "Organised Kitchen Drawers",
    note: "Compartmented SS trays that keep spoons, forks and knives tidy and hygienic.",
  },
  {
    img: cornerSolution,
    type: "Corner Solutions",
    place: "Magic Corner & Carousel Units",
    note: "Smooth-gliding fittings that unlock dead corner space for pots, pans and bulk items.",
  },
  {
    img: dishRack,
    type: "Dish Rack",
    place: "Wall Cabinet Plate & Cup Rack",
    note: "SS 304 grade racks with a drip tray so plates dry without wetting the cabinet.",
  },
  {
    img: bottlePullout,
    type: "Bottle Pull Out",
    place: "Slim Unit Beside the Hob",
    note: "Narrow pull-out basket that keeps cooking oils, sauces and jars within easy reach.",
  },
  {
    img: drawerSystem,
    type: "Drawer System",
    place: "Soft-Close Base Drawers",
    note: "Full-extension, high load capacity drawers with soft-close for everyday smooth use.",
  },
];

const SLIDES = [
  {
    img: kitchenTypesAsset.url,
    type: "All Accessories",
    place: "Types of Modular Kitchen Accessories",
    contain: true,
  },
  ...KITCHEN_GALLERY.map((g) => ({
    img: g.img,
    type: g.type,
    place: g.place,
    contain: false,
  })),
];

export function KitchenProductSlider() {
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
                alt={`${s.type} — ${s.place} | Best modular kitchen accessories shop in Vijayawada`}
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
