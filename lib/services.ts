// Demo data layer. In production these reads come from Convex queries —
// the call sites (getShop, listServices) stay identical, only the body changes.

export type Service = {
  id: string;
  name: string;
  blurb: string;
  durationMin: number; // drives how slots are blocked on the calendar
  priceSek: number;
  depositSek: number; // taken at booking via Stripe to hold the bay
  tone: "ceramic" | "wax";
};

export type Shop = {
  slug: string;
  name: string;
  city: string;
  bays: number;
  openHour: number; // 24h
  closeHour: number;
  services: Service[];
};

const lustroDemo: Shop = {
  slug: "lustro-demo",
  name: "Norra Bilvård",
  city: "Stockholm",
  bays: 3,
  openHour: 8,
  closeHour: 18,
  services: [
    { id: "wash", name: "Wash & Wax", blurb: "Hand wash, dry, and a protective wax layer.", durationMin: 90, priceSek: 695, depositSek: 150, tone: "ceramic" },
    { id: "interior", name: "Full Interior", blurb: "Deep vacuum, steam clean, leather conditioning.", durationMin: 180, priceSek: 1850, depositSek: 400, tone: "ceramic" },
    { id: "correction", name: "Paint Correction", blurb: "Machine polish to remove swirls and restore gloss.", durationMin: 300, priceSek: 4200, depositSek: 800, tone: "wax" },
    { id: "ceramic", name: "Ceramic Coating", blurb: "Multi-year ceramic protection, prep included.", durationMin: 480, priceSek: 8900, depositSek: 1500, tone: "ceramic" },
  ],
};

const shops: Record<string, Shop> = { [lustroDemo.slug]: lustroDemo };

export function getShop(slug: string): Shop | null {
  return shops[slug] ?? null;
}
