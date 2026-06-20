"use client";

import { useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, CalendarDays, Users, RotateCcw, Settings,
  ArrowUpRight, ArrowDownRight, Plus, ArrowUp, ArrowDown, Send, Home,
} from "lucide-react";
import Link from "next/link";
import { kpis, weeklyRevenue, serviceMix, schedule, customers, winBack, type Customer } from "@/lib/dashboard";

const kr = (n: number) => `${n.toLocaleString("sv-SE")} kr`;
const navItems = [
  { icon: LayoutDashboard, label: "Today", active: true },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Users, label: "Customers" },
  { icon: RotateCcw, label: "Retention" },
  { icon: Settings, label: "Settings" },
];

const statusStyle: Record<string, string> = {
  done: "bg-moss/15 text-moss-text",
  paid: "bg-moss/15 text-moss-text",
  pending: "bg-tan/20 text-rust",
  VIP: "bg-moss/15 text-moss-text",
  Active: "bg-line text-ink-dim",
  "At risk": "bg-tan/20 text-rust",
};

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-paper px-3 py-2 text-xs shadow-sm">
      <p className="text-ink-mute">{label}</p>
      <p className="tnum font-medium text-olive">{kr(payload[0].value)}</p>
    </div>
  );
}

export default function Dashboard() {
  const [sortKey, setSortKey] = useState<"ltvSek" | "visits">("ltvSek");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const sorted = [...customers].sort((a, b) => {
    const d = a[sortKey] - b[sortKey];
    return dir === "asc" ? d : -d;
  });
  function toggleSort(key: "ltvSek" | "visits") {
    if (key === sortKey) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setDir("desc"); }
  }
  const SortIcon = dir === "asc" ? ArrowUp : ArrowDown;

  return (
    <div className="min-h-screen grain lg:grid lg:grid-cols-[224px_1fr]">
      {/* Sidebar — desktop (skill: adaptive-navigation, sidebar ≥1024px) */}
      <aside className="hidden border-r border-line bg-sand/60 lg:flex lg:flex-col">
        <Link href="/" className="flex items-center gap-2 px-5 py-4">
          <span className="font-display text-lg font-semibold tracking-tight">Lustro</span>
        </Link>
        <nav className="mt-2 flex-1 px-3" aria-label="Main">
          {navItems.map((n) => (
            <button key={n.label} aria-current={n.active ? "page" : undefined} className={`mb-1 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${n.active ? "bg-olive text-cream" : "text-ink-dim hover:bg-line/60 hover:text-olive"}`}>
              <n.icon className="h-4 w-4" strokeWidth={1.75} /> {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3 border-t border-line px-5 py-4">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-moss/15 text-xs font-semibold text-moss-text">NB</span>
          <div className="text-sm leading-tight">
            <p className="font-medium text-olive">Norra Bilvård</p>
            <p className="text-xs text-ink-mute">Stockholm</p>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-cream/85 px-5 py-3 backdrop-blur-xl md:px-8">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <span className="font-display text-base font-semibold">Lustro</span>
          </Link>
          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-widest text-ink-mute">Thursday · 19 Jun</p>
            <h1 className="font-display text-xl font-semibold tracking-tight">Today</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-2 text-sm text-olive transition hover:border-olive hover:bg-paper">
              <Home className="h-4 w-4" /> <span className="hidden sm:inline">Home</span>
            </Link>
            <Link href="/book/lustro-demo" className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-olive px-4 py-2 text-sm font-semibold text-cream transition hover:bg-moss">
              <Plus className="h-4 w-4" /> New booking
            </Link>
          </div>
        </header>

        {/* Mobile nav (skill: small screens use top/bottom nav) */}
        <nav className="flex gap-1 overflow-x-auto border-b border-line px-4 py-2 lg:hidden" aria-label="Sections">
          {navItems.map((n) => (
            <button key={n.label} aria-current={n.active ? "page" : undefined} className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${n.active ? "bg-olive text-cream" : "text-ink-dim"}`}>
              <n.icon className="h-3.5 w-3.5" /> {n.label}
            </button>
          ))}
        </nav>

        <main className="space-y-5 p-5 md:p-8">
          {/* KPI cards — values always visible as text (skill: AAA bullet/stat) */}
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {kpis.map((k) => {
              const up = k.delta >= 0;
              const good = k.label === "No-show rate" ? !up : up;
              const Trend = up ? ArrowUpRight : ArrowDownRight;
              return (
                <div key={k.label} className="rounded-[var(--radius-card)] border border-line bg-paper p-4">
                  <p className="text-xs text-ink-mute">{k.label}</p>
                  <p className="tnum mt-1.5 font-display text-2xl font-semibold text-olive">{k.value}</p>
                  <p className={`mt-1 inline-flex items-center gap-1 text-xs ${good ? "text-moss-text" : "text-rust"}`}>
                    <Trend className="h-3 w-3" /> {Math.abs(k.delta)}% <span className="text-ink-mute">{k.hint}</span>
                  </p>
                </div>
              );
            })}
          </section>

          {/* Charts: revenue trend (area) + service mix (donut) */}
          <section className="grid gap-3 lg:grid-cols-3">
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-semibold">Revenue this week</h2>
                <span className="tnum text-sm text-ink-mute">{kr(weeklyRevenue.reduce((s, d) => s + d.revenue, 0))} total</span>
              </div>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyRevenue} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#606c38" stopOpacity={0.28} />
                        <stop offset="100%" stopColor="#606c38" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e7dec0" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#8a875b" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#8a875b" }} axisLine={false} tickLine={false} width={48} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="revenue" stroke="#283618" strokeWidth={2} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
              <h2 className="font-display text-base font-semibold">Service mix</h2>
              <div className="mt-2 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={serviceMix} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={2} stroke="none">
                      {serviceMix.map((s) => <Cell key={s.name} fill={s.color} />)}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-1.5">
                {serviceMix.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 text-xs">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                    <span className="flex-1 text-ink-dim">{s.name}</span>
                    <span className="tnum font-medium text-olive">{s.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Schedule + win-back */}
          <section className="grid gap-3 lg:grid-cols-3">
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5 lg:col-span-2">
              <h2 className="font-display text-base font-semibold">Today&apos;s bays</h2>
              <div className="mt-3 space-y-2">
                {schedule.map((j) => (
                  <div key={j.time} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 transition hover:bg-sand/60 sm:gap-4">
                    <span className="tnum font-mono text-sm text-ink-dim">{j.time}</span>
                    <span className="h-7 w-1 rounded-full" style={{ background: j.tone === "rust" ? "var(--color-rust)" : "var(--color-moss)" }} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-olive">{j.svc}</p>
                      <p className="truncate text-xs text-ink-mute">{j.car} · {j.bay}</p>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-[11px] font-medium capitalize ${statusStyle[j.status]}`}>{j.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
              <h2 className="font-display text-base font-semibold">Win-back queue</h2>
              <div className="mt-3 space-y-2">
                {winBack.map((w) => (
                  <div key={w.name} className="rounded-xl border border-line px-3 py-2.5">
                    <p className="text-sm font-medium text-olive">{w.name}</p>
                    <p className="text-xs text-ink-mute">{w.reason}</p>
                    <button className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-moss/15 px-3 py-1 text-xs font-medium text-moss-text transition hover:bg-moss/25">
                      <Send className="h-3 w-3" /> Send nudge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Customers — sortable table (skill: sortable-table, aria-sort; row hover) */}
          <section className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
            <h2 className="font-display text-base font-semibold">Customers</h2>
            <div className="mt-3 -mx-1 overflow-x-auto">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs text-ink-mute">
                    <th className="px-3 py-2 font-medium">Customer</th>
                    <th className="px-3 py-2 font-medium">Last service</th>
                    <th aria-sort={sortKey === "visits" ? (dir === "asc" ? "ascending" : "descending") : "none"} className="px-3 py-2 font-medium">
                      <button onClick={() => toggleSort("visits")} className="inline-flex cursor-pointer items-center gap-1 hover:text-olive">
                        Visits {sortKey === "visits" && <SortIcon className="h-3 w-3" />}
                      </button>
                    </th>
                    <th aria-sort={sortKey === "ltvSek" ? (dir === "asc" ? "ascending" : "descending") : "none"} className="px-3 py-2 font-medium">
                      <button onClick={() => toggleSort("ltvSek")} className="inline-flex cursor-pointer items-center gap-1 hover:text-olive">
                        Lifetime value {sortKey === "ltvSek" && <SortIcon className="h-3 w-3" />}
                      </button>
                    </th>
                    <th className="px-3 py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((c: Customer) => (
                    <tr key={c.name} className="border-b border-line/60 transition hover:bg-sand/60">
                      <td className="px-3 py-2.5 font-medium text-olive">{c.name}</td>
                      <td className="px-3 py-2.5 text-ink-dim">{c.last}</td>
                      <td className="tnum px-3 py-2.5 text-ink-dim">{c.visits}</td>
                      <td className="tnum px-3 py-2.5 font-medium text-olive">{kr(c.ltvSek)}</td>
                      <td className="px-3 py-2.5">
                        <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${statusStyle[c.status]}`}>{c.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
