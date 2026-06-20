import type { Shop, Service } from "./services";

export type Slot = { time: string; baysFree: number };
export type Day = { iso: string; label: string; weekday: string; slots: Slot[] };

// Deterministic pseudo-availability so the demo is stable across reloads.
function seeded(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

export function buildAvailability(shop: Shop, service: Service, fromIso?: string): Day[] {
  const start = fromIso ? new Date(fromIso) : new Date();
  start.setHours(0, 0, 0, 0);
  const days: Day[] = [];
  const stepMin = Math.max(60, Math.round(service.durationMin / 2)); // slot granularity

  for (let d = 0; d < 14; d++) {
    const date = new Date(start);
    date.setDate(start.getDate() + d);
    const weekday = date.getDay();
    const slots: Slot[] = [];

    // Closed Sundays
    if (weekday !== 0) {
      const lastStart = shop.closeHour * 60 - service.durationMin;
      for (let m = shop.openHour * 60; m <= lastStart; m += stepMin) {
        const seed = d * 1000 + m + service.durationMin;
        const r = seeded(seed);
        // Long jobs need more of the day free, so fewer bays available.
        const cap = service.durationMin >= 300 ? 1 : shop.bays;
        const baysFree = r > 0.78 ? 0 : Math.max(0, Math.min(cap, Math.ceil(r * cap)));
        if (baysFree > 0) {
          const hh = String(Math.floor(m / 60)).padStart(2, "0");
          const mm = String(m % 60).padStart(2, "0");
          slots.push({ time: `${hh}:${mm}`, baysFree });
        }
      }
    }

    days.push({
      iso: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      weekday: date.toLocaleDateString("en-GB", { weekday: "short" }),
      slots,
    });
  }
  return days;
}
