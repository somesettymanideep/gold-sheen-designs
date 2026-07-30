import kitchenBwp from "@/assets/plywood-app/kitchen-bwp.jpg";
import wardrobeMr from "@/assets/plywood-app/wardrobe-mr.jpg";
import curvedFlexible from "@/assets/plywood-app/curved-flexible.jpg";
import doorBlockboard from "@/assets/plywood-app/door-blockboard.jpg";
import panellingDecorative from "@/assets/plywood-app/panelling-decorative.jpg";
import studyCommercial from "@/assets/plywood-app/study-commercial.jpg";

const GALLERY = [
  {
    img: kitchenBwp,
    type: "BWP / Marine Plywood",
    place: "Modular Kitchen",
    note: "Boiling water proof cores keep base units safe from spills, steam and daily washing.",
  },
  {
    img: wardrobeMr,
    type: "MR Plywood",
    place: "Bedroom Wardrobe",
    note: "Moisture resistant and termite treated — ideal for full-height wardrobes and lofts.",
  },
  {
    img: panellingDecorative,
    type: "Decorative Plywood",
    place: "TV Unit & Wall Panelling",
    note: "Veneered faces give a rich grain finish for feature walls and living room units.",
  },
  {
    img: doorBlockboard,
    type: "Block Board",
    place: "Flush Doors",
    note: "Solid batten core holds screws firmly and resists sagging on tall door shutters.",
  },
  {
    img: curvedFlexible,
    type: "Flexible Plywood",
    place: "Curved Furniture",
    note: "Bends smoothly for rounded consoles, curved counters and decorative profiles.",
  },
  {
    img: studyCommercial,
    type: "Commercial Plywood",
    place: "Study & Storage",
    note: "Economical MR grade for bookshelves, study tables, partitions and false ceilings.",
  },
];

export function PlywoodApplicationGallery() {
  return (
    <section className="py-[30px] bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Real Home Applications</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-charcoal">
            Plywood Application Gallery
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            See how each plywood type looks once it is installed in a real home — from kitchens
            and wardrobes to doors, panelling and curved furniture.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item) => (
            <figure
              key={item.place}
              className="group overflow-hidden rounded-2xl border border-charcoal/10 bg-background shadow-soft hover:shadow-elevated transition duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.img}
                  alt={`${item.type} used for ${item.place} in a home interior — Durga Hardware and Plywood, Vijayawada`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  {item.type}
                </span>
              </div>
              <figcaption className="p-6">
                <h3 className="font-display text-lg font-bold text-charcoal">{item.place}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
