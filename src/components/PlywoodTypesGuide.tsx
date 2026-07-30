import { Home } from "lucide-react";
import plywoodTypesAsset from "@/assets/plywood-types.webp.asset.json";

const TYPES = [
  { name: "Boiling Water Plywood", note: "100% BWP grade, highly water resistant.", use: "Kitchen, Bathroom, Exterior Work" },
  { name: "Marine Plywood", note: "Extra durable for long-term moist conditions.", use: "Kitchen, Bathroom, Furniture, Exterior" },
  { name: "MR Plywood", note: "Moisture resistant core, termite resistant.", use: "Interior Furniture, Wardrobes, Shelves" },
  { name: "BWP Plywood", note: "Boiling water proof, resistant to termites.", use: "Kitchen, Bathroom, Home Interiors" },
  { name: "Commercial Plywood", note: "Economical and strong for general use.", use: "Interior Work, Partition, False Ceiling" },
  { name: "Flexible Plywood", note: "Bends and curves easily without breaking.", use: "Curved Furniture, Decorative Panels" },
  { name: "Fire Retardant Plywood", note: "Fire resistant core for extra safety.", use: "Kitchens, Commercial Spaces, Wall Panelling" },
  { name: "Shuttering Plywood", note: "Built for concrete shuttering, long lasting.", use: "Construction Work, Building Use" },
  { name: "Block Board", note: "Solid core for extra strength and screw holding.", use: "Doors, Heavy Furniture, Partitions" },
  { name: "Film Faced Plywood", note: "Smooth film surface, water resistant.", use: "Shuttering, Concrete Work, Furniture" },
  { name: "Decorative Plywood", note: "Attractive veneers and finishes.", use: "Furniture, Wall Panelling, Interior Decoration" },
  { name: "Hardwood Plywood", note: "Made from hardwood veneers, strong and durable.", use: "Premium Furniture, Doors, Interiors" },
];

export function PlywoodTypesGuide() {
  return (
    <section className="py-[30px] bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="eyebrow">Buying Guide</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-charcoal">
            Types of Plywood for Home Use
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Every space in your home needs a different plywood grade. Here's where each type
            works best — from moisture-heavy kitchens and bathrooms to wardrobes, ceilings and
            decorative panelling.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl shadow-elevated bg-background">
          <img
            src={plywoodTypesAsset.url}
            alt="Types of plywood for home use — BWP, marine, MR, commercial, flexible, fire retardant, block board and hardwood plywood with best uses"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-charcoal/10 bg-background p-6 shadow-soft hover:shadow-elevated transition duration-500"
            >
              <h3 className="font-display text-lg font-bold text-charcoal">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.note}</p>
              <div className="mt-4 flex items-start gap-2 border-t border-charcoal/10 pt-4">
                <Home className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-charcoal">
                  Best for: <span className="font-normal text-muted-foreground">{t.use}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
