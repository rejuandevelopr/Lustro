// Dashboard demo data. In production these are Convex queries (aggregations +
// per-customer rollups). Shapes are what the UI binds to; only the source changes.

export type Kpi = { label: string; value: string; delta: number; hint: string };

export const kpis: Kpi[] = [
  { label: "Booked today", value: "7 850 kr", delta: 12, hint: "vs. yesterday" },
  { label: "No-show rate", value: "4.2%", delta: -31, hint: "vs. last quarter" },
  { label: "Rebook rate", value: "68%", delta: 6, hint: "within 90 days" },
  { label: "Bay utilization", value: "83%", delta: 9, hint: "3 bays today" },
];

// Trend over time → line/area (skill: chart trend)
export const weeklyRevenue = [
  { day: "Mon", revenue: 6200 },
  { day: "Tue", revenue: 7100 },
  { day: "Wed", revenue: 5400 },
  { day: "Thu", revenue: 7850 },
  { day: "Fri", revenue: 9300 },
  { day: "Sat", revenue: 11200 },
  { day: "Sun", revenue: 0 },
];

// Part-to-whole, ≤5 categories → donut (skill: chart proportion)
export const serviceMix = [
  { name: "Ceramic Coating", value: 38, color: "#606c38" },
  { name: "Paint Correction", value: 24, color: "#bc6c25" },
  { name: "Full Interior", value: 21, color: "#dda15e" },
  { name: "Wash & Wax", value: 17, color: "#98a85b" },
];

export type Job = { time: string; svc: string; car: string; bay: string; tone: "moss" | "rust"; status: "paid" | "pending" | "done" };
export const schedule: Job[] = [
  { time: "08:30", svc: "Ceramic Coating", car: "Tesla Model 3", bay: "Bay 1", tone: "moss", status: "done" },
  { time: "10:00", svc: "Paint Correction", car: "BMW M4", bay: "Bay 2", tone: "rust", status: "paid" },
  { time: "13:15", svc: "Full Interior", car: "VW Transporter", bay: "Bay 1", tone: "moss", status: "pending" },
  { time: "15:00", svc: "Wash & Wax", car: "Volvo XC60", bay: "Bay 3", tone: "moss", status: "paid" },
];

export type Customer = { name: string; last: string; visits: number; ltvSek: number; status: "VIP" | "Active" | "At risk" };
export const customers: Customer[] = [
  { name: "Anna Lindqvist", last: "Ceramic · 11 mo ago", visits: 4, ltvSek: 18400, status: "At risk" },
  { name: "Erik Holm", last: "Full detail · 4 mo ago", visits: 6, ltvSek: 12950, status: "Active" },
  { name: "Sofia Berg", last: "Wash & wax · 6 wk ago", visits: 14, ltvSek: 9870, status: "VIP" },
  { name: "Johan Ek", last: "Paint correction · 2 mo ago", visits: 3, ltvSek: 11200, status: "Active" },
  { name: "Marta Sø", last: "Ceramic · 8 mo ago", visits: 2, ltvSek: 16100, status: "At risk" },
];

export const winBack = [
  { name: "Anna Lindqvist", reason: "Ceramic top-up due", tone: "rust" as const },
  { name: "Marta Sø", reason: "Interval reached", tone: "moss" as const },
];
