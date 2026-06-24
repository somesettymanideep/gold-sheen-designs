import catPlywood from "@/assets/cat-plywood.jpg";
import catLaminates from "@/assets/cat-laminates.jpg";
import catHardware from "@/assets/cat-hardware.jpg";
import catVeneers from "@/assets/cat-veneers.jpg";
import catKitchen from "@/assets/beautiful-kitchen-interior-design.webp.asset.json";
import catDoors from "@/assets/cat-doors.jpg";
import decobond710 from "@/assets/decobond/decobond-710.jpg.asset.json";
import decobond710Nature from "@/assets/decobond/decobond-710-nature.jpg.asset.json";
import decobond710Gold from "@/assets/decobond/decobond-710-gold.jpg.asset.json";
import decobond710Club from "@/assets/decobond/decobond-710-club.jpg.asset.json";
import decobond710Platinum from "@/assets/decobond/decobond-710-platinum.jpg.asset.json";
import decobond710Eco from "@/assets/decobond/decobond-710-eco.jpg.asset.json";
import decobond710Pine from "@/assets/decobond/decobond-710-pine.jpg.asset.json";
import bannerPlywood from "@/assets/product-banners/banner-plywood.jpg.asset.json";
import bannerLaminates from "@/assets/product-banners/banner-laminates.jpg.asset.json";
import bannerHardware from "@/assets/product-banners/banner-hardware.jpg.asset.json";
import bannerVeneers from "@/assets/product-banners/banner-veneers.jpg.asset.json";
import bannerModularKitchens from "@/assets/product-banners/banner-modular-kitchens.jpg.asset.json";
import bannerProfileDoors from "@/assets/product-banners/banner-profile-doors.jpg.asset.json";
import brandGreenply from "@/assets/brands/greenply.png.asset.json";
import brandArchidply from "@/assets/brands/archidply.png.asset.json";
import brandAustin from "@/assets/brands/austin.png.asset.json";
import brandCenturyply from "@/assets/brands/centuryply.png.asset.json";
import brandDecobond from "@/assets/brands/decobond.png.asset.json";
import brandDuroply from "@/assets/brands/duroply.png.asset.json";
import brandMikasa from "@/assets/brands/mikasa.png.asset.json";
import brandHafele from "@/assets/brands/hafele.png.asset.json";
import brandKessebohmer from "@/assets/brands/kessebohmer.png.asset.json";
import brandBlum from "@/assets/brands/blum.png.asset.json";
import brandEbco from "@/assets/brands/ebco.png.asset.json";
import brandDecofit from "@/assets/brands/decofit.png.asset.json";
import brandHettich from "@/assets/brands/hettich.png.asset.json";
import brandOzone from "@/assets/brands/ozone.png.asset.json";
import laminateAdvance from "@/assets/brands/laminates/advance.png.asset.json";
import laminateCatch from "@/assets/brands/laminates/catch.png.asset.json";
import laminateCentury from "@/assets/brands/laminates/century.png.asset.json";
import laminateGlamox from "@/assets/brands/laminates/glamox.png.asset.json";
import laminateGreenlam from "@/assets/brands/laminates/greenlam.png.asset.json";
import laminateMerino from "@/assets/brands/laminates/merino.png.asset.json";
import laminatePebble from "@/assets/brands/laminates/pebble.png.asset.json";
import laminateSkydecor from "@/assets/brands/laminates/skydecor.png.asset.json";
import laminateVirgo from "@/assets/brands/laminates/virgo.png.asset.json";

export type BrandGrade = {
  name: string;
  warranty: string;
  img: string;
};

export type PlywoodBrand = {
  name: string;
  tagline: string;
  thicknesses: string[];
  sizes?: string[];
  grades: BrandGrade[];
};

export const PLYWOOD_BRANDS: PlywoodBrand[] = [
  {
    name: "Decobond 710",
    tagline: "100% Gurjan marine-grade BWP plywood — boiling-waterproof, borer & termite resistant, built to last.",
    thicknesses: ["19mm", "16mm", "12mm", "9mm", "6mm"],
    grades: [
      { name: "Decobond 710", warranty: "15 Years Warranty", img: decobond710.url },
      { name: "Decobond 710 Nature", warranty: "20 Years Warranty", img: decobond710Nature.url },
      { name: "Decobond 710 Gold", warranty: "25 Years Warranty", img: decobond710Gold.url },
      { name: "Decobond 710 Club", warranty: "30 Years Warranty", img: decobond710Club.url },
      { name: "Decobond Platinum", warranty: "Lifetime Warranty", img: decobond710Platinum.url },
    ],
  },
  {
    name: "Decobond Block Board",
    tagline: "BWP boiling-waterproof block board with a cured zero-gap core — light, strong and warp-resistant for shutters, tables and partitions.",
    thicknesses: ["25mm", "19mm"],
    sizes: ["8x4", "7x4", "7x3"],
    grades: [
      { name: "Decobond 710 Eco", warranty: "Semi Pine • 20 Years Warranty", img: decobond710Eco.url },
      { name: "Decobond 710 Pine", warranty: "Premium New Zealand Pine • 30 Years Warranty", img: decobond710Pine.url },
    ],
  },
];


export const CAT_IMG: Record<string, string> = {
  plywood: catPlywood,
  laminates: catLaminates,
  hardware: catHardware,
  veneers: catVeneers,
  kitchen: catKitchen.url,
  doors: catDoors,
};

export const BANNER_IMG: Record<string, string> = {
  plywood: bannerPlywood.url,
  laminates: bannerLaminates.url,
  hardware: bannerHardware.url,
  veneers: bannerVeneers.url,
  kitchen: bannerModularKitchens.url,
  doors: bannerProfileDoors.url,
};

export const PLYWOOD_BRAND_LOGOS = [
  { name: "Greenply", logo: brandGreenply.url },
  { name: "CenturyPly", logo: brandCenturyply.url },
  { name: "Austin Plywood", logo: brandAustin.url },
  { name: "Archidply", logo: brandArchidply.url },
  { name: "Duroply", logo: brandDuroply.url },
  { name: "Mikasa", logo: brandMikasa.url },
  { name: "Deco Bond", logo: brandDecobond.url },
];

export const HARDWARE_BRAND_LOGOS = [
  { name: "Häfele", logo: brandHafele.url },
  { name: "Hettich", logo: brandHettich.url },
  { name: "Blum", logo: brandBlum.url },
  { name: "Kesseböhmer", logo: brandKessebohmer.url },
  { name: "Ebco", logo: brandEbco.url },
  { name: "Ozone", logo: brandOzone.url },
  { name: "Decofit", logo: brandDecofit.url },
];

export type ProductDetail = {
  features: string[];
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  brands: string[];
};

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  plywood: {
    description:
      "Our plywood range is engineered for strength, stability and long life. From everyday commercial-grade boards to fully waterproof marine plywood, every sheet is sourced from ISI-certified mills and tested for moisture, termites and load-bearing performance — so your furniture and interiors stay true for decades.",
    features: [
      "BWP, MR & Marine grade options",
      "ISI-certified and IS:710 compliant",
      "Termite & borer resistant",
      "Available in multiple thicknesses",
    ],
    highlights: [
      "Zero-gap, void-free core construction",
      "Calibrated for uniform thickness",
      "Boiling water proof bonding on marine grades",
    ],
    specs: [
      { label: "Thickness", value: "4mm – 25mm" },
      { label: "Sizes", value: "8x4, 7x4, 6x4 ft" },
      { label: "Grades", value: "MR, BWR, BWP / Marine" },
      { label: "Warranty", value: "Up to 25 years (brand-dependent)" },
    ],
    brands: ["Greenply", "CenturyPly", "Kitply", "Action TESA", "Austin", "Archidply"],
  },
  laminates: {
    description:
      "Transform any surface with our decorative laminate collection. With over a thousand designs spanning woodgrains, solids, stones and abstracts in matte, gloss, suede and textured finishes, you'll find the perfect surface for wardrobes, shutters, panels and tabletops — all scratch, stain and heat resistant.",
    features: [
      "1mm & 0.8mm decorative laminates",
      "Matte, gloss, suede & textured finishes",
      "Scratch & stain resistant",
      "1000+ designs in stock",
    ],
    highlights: [
      "High-pressure laminates (HPL) for durability",
      "Anti-fingerprint & anti-bacterial options",
      "Color-matched edge banding available",
    ],
    specs: [
      { label: "Thickness", value: "0.8mm & 1mm" },
      { label: "Sizes", value: "8x4 ft standard" },
      { label: "Finishes", value: "Matte, Gloss, Suede, Textured" },
      { label: "Designs", value: "1000+ in stock" },
    ],
    brands: ["Greenlam", "Merino", "Century", "Sunmica", "Royale Touche"],
  },
  hardware: {
    description:
      "Quality hardware is what makes interiors function beautifully every day. We stock a complete range of architectural and furniture fittings — drawer channels, hinges, handles, locks and modular kitchen accessories — from the world's most trusted brands, built for smooth, silent and lasting performance.",
    features: [
      "Drawer channels, hinges & handles",
      "Door locks & bathroom fittings",
      "Modular kitchen accessories",
      "From Hettich, Hafele, Ebco & more",
    ],
    highlights: [
      "Soft-close hinges & telescopic channels",
      "Corrosion-resistant finishes",
      "Genuine, warranty-backed products",
    ],
    specs: [
      { label: "Categories", value: "Hinges, Channels, Handles, Locks" },
      { label: "Finish", value: "SS, Chrome, Matte, Antique" },
      { label: "Load Rating", value: "Up to 40 kg drawer channels" },
      { label: "Warranty", value: "Brand-backed warranty" },
    ],
    brands: ["Hettich", "Hafele", "Ebco", "Blum", "Ozone", "Kessebohmer"],
  },
  veneers: {
    description:
      "Bring the warmth of real wood to your interiors with our natural and engineered veneers. From classic teak and walnut to exotic burls, each leaf is hand-selected for grain consistency and can be pre-polished or custom-matched for large-scale projects.",
    features: [
      "Natural & engineered veneers",
      "Teak, walnut, oak, oak burl & exotic species",
      "Pre-polished options available",
      "Custom matching for large projects",
    ],
    highlights: [
      "Book-matched & quarter-cut options",
      "Consistent grain across large runs",
      "Ready-to-polish & pre-finished sheets",
    ],
    specs: [
      { label: "Thickness", value: "0.5mm – 4mm" },
      { label: "Sizes", value: "8x4 ft standard" },
      { label: "Species", value: "Teak, Walnut, Oak, Burl & more" },
      { label: "Finish", value: "Natural / Pre-polished" },
    ],
    brands: ["CenturyVeneers", "Greenply", "Decowood", "Archidply"],
  },
  "modular-kitchens": {
    description:
      "From concept to installation, we design modular kitchens that blend everyday function with timeless style. Our team handles layout planning, material selection, premium shutters and certified on-site installation — delivering a kitchen that works as beautifully as it looks.",
    features: [
      "End-to-end design consultation",
      "Premium shutters & finishes",
      "Soft-close hinges & channels",
      "On-site installation by certified team",
    ],
    highlights: [
      "3D design visualization before you buy",
      "Moisture-resistant carcass material",
      "Tailored storage & corner solutions",
    ],
    specs: [
      { label: "Layouts", value: "L, U, Parallel, Island" },
      { label: "Shutters", value: "Acrylic, Laminate, PU, Membrane" },
      { label: "Carcass", value: "BWP Ply / HDHMR" },
      { label: "Service", value: "Design + Supply + Install" },
    ],
    brands: ["Hettich", "Hafele", "Blum", "Kessebohmer", "Ebco"],
  },
  "profile-doors": {
    description:
      "Make a lasting first impression with our designer profile doors. Available in solid wood and engineered options with membrane, PU and veneer finishes, every door is built for strength, sound insulation and moisture resistance — and can be made to custom sizes and designs.",
    features: [
      "Solid wood & engineered options",
      "Membrane, PU & veneer finishes",
      "Custom sizes and designs",
      "Sound & moisture resistant",
    ],
    highlights: [
      "Warp-resistant engineered cores",
      "Designer membrane & PU finishes",
      "Custom sizes for any opening",
    ],
    specs: [
      { label: "Types", value: "Flush, Panel, Designer" },
      { label: "Finish", value: "Membrane, PU, Veneer, Laminate" },
      { label: "Core", value: "Solid Wood / Engineered" },
      { label: "Sizes", value: "Standard & custom" },
    ],
    brands: ["Greenply", "CenturyDoors", "Austin", "Archidply"],
  },
};
