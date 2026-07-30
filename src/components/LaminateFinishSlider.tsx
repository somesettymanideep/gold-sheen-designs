import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAutoplayEmbla } from "@/hooks/useAutoplayEmbla";
import teak from "@/assets/laminates/teak-wood.jpg.asset.json";
import oak from "@/assets/laminates/european-oak.jpg.asset.json";
import walnut from "@/assets/laminates/american-walnut.jpg.asset.json";
import marble from "@/assets/laminates/calacatta-marble.jpg.asset.json";
import charcoal from "@/assets/laminates/charcoal-grey.jpg.asset.json";

const FINISHES = [
  { name: "Teak Wood", finish: "Natural Finish", img: teak.url },
  { name: "European Oak", finish: "Natural Finish", img: oak.url },
  { name: "American Walnut", finish: "Natural Finish", img: walnut.url },
  { name: "Calacatta Marble", finish: "Glossy Finish", img: marble.url },
  { name: "Charcoal Grey", finish: "Matte Finish", img: charcoal.url },
];

export function LaminateFinishSlider() {
  const { emblaRef, emblaApi, selected, scrollTo, pauseHandlers } = useAutoplayEmbla({
    interval: 4500,
    emblaOptions: { loop: true, align: "start" },
  });

  return (
    <section className="py-[30px] bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
            Laminate Finishes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Beauty that lasts. Quality that defines.
          </p>
        </div>

        <div className="relative mt-8" {...pauseHandlers}>
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {FINISHES.map((f, i) => (
                <div key={f.name} className="min-w-0 flex-[0_0_100%] px-1">
                  <figure className="overflow-hidden rounded-2xl bg-white shadow-soft">
                    <img
                      src={f.img}
                      alt={`${f.name} ${f.finish} laminate — kitchen, wardrobe and TV unit applications`}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={i === 0 ? "high" : "auto"}
                      className="w-full object-cover"
                    />
                    <figcaption className="px-5 py-3 text-center">
                      <span className="font-display text-lg font-bold text-charcoal">{f.name}</span>
                      <span className="ml-2 text-sm text-muted-foreground">{f.finish}</span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous finish"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-soft text-charcoal hover:bg-white transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next finish"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-soft text-charcoal hover:bg-white transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {FINISHES.map((f, i) => (
            <button
              key={f.name}
              type="button"
              aria-label={`Show ${f.name}`}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === selected ? "w-8 bg-gold" : "w-2 bg-charcoal/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
