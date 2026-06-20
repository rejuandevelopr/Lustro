import { ShieldCheck, Bell } from "lucide-react";

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper ${className}`}>
      {children}
    </div>
  );
}

export default function BentoFeatures() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-moss-text">The platform</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Everything a detailing shop runs on.
        </h2>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {/* Stat — swoosh underline */}
        <Card className="col-span-full flex lg:col-span-2">
          <div className="m-auto size-fit pt-6 pb-6">
            <div className="relative flex h-24 w-56 items-center">
              <svg className="absolute inset-0 size-full text-moss/25" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor" />
              </svg>
              <span className="tnum mx-auto block w-fit font-display text-5xl font-semibold text-olive">31%</span>
            </div>
            <h3 className="mt-4 text-center font-display text-xl font-semibold">Fewer no-shows</h3>
          </div>
        </Card>

        {/* Utilization ring */}
        <Card className="col-span-full sm:col-span-3 lg:col-span-2">
          <div className="flex flex-col items-center px-6 pt-6 pb-6">
            <div className="grid h-28 w-28 place-items-center rounded-full" style={{ background: "conic-gradient(var(--color-moss) 0% 83%, var(--color-line) 83% 100%)" }}>
              <div className="grid h-20 w-20 place-items-center rounded-full bg-paper">
                <span className="tnum font-display text-2xl font-semibold text-olive">83%</span>
              </div>
            </div>
            <div className="mt-5 space-y-1 text-center">
              <h3 className="font-display text-lg font-semibold">Bays kept busy</h3>
              <p className="text-sm text-ink-dim">The calendar packs jobs by duration so no bay sits idle.</p>
            </div>
          </div>
        </Card>

        {/* Reminders trend */}
        <Card className="col-span-full sm:col-span-3 lg:col-span-2">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center gap-2 text-moss"><Bell className="h-5 w-5" strokeWidth={1.75} /></div>
            <svg className="mt-3 w-full" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="bento-trend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-moss)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--color-moss)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 60 L40 52 L80 56 L120 38 L160 44 L200 24 L240 30 L300 12 L300 80 L0 80 Z" fill="url(#bento-trend)" />
              <path d="M0 60 L40 52 L80 56 L120 38 L160 44 L200 24 L240 30 L300 12" stroke="var(--color-olive)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="mt-3 space-y-1">
              <h3 className="font-display text-lg font-semibold">Reminders that land</h3>
              <p className="text-sm text-ink-dim">SMS and email the day before — open rates climbing every week.</p>
            </div>
          </div>
        </Card>

        {/* Calendar mock */}
        <Card className="col-span-full lg:col-span-3">
          <div className="grid pt-6 sm:grid-cols-2">
            <div className="flex flex-col justify-between space-y-8 px-6 pb-6 lg:space-y-6">
              <div className="flex aspect-square size-12 items-center justify-center rounded-full border border-line">
                <ShieldCheck className="size-5 text-moss" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold">Bay-aware calendar</h3>
                <p className="text-sm text-ink-dim">Bookings know how long each service takes and which bay is free. No double-bookings, ever.</p>
              </div>
            </div>
            <div className="relative mt-6 rounded-tl-xl border-l border-t border-line p-4 sm:ml-6">
              <div className="absolute left-3 top-2 flex gap-1">
                <span className="block size-2 rounded-full bg-line-2" />
                <span className="block size-2 rounded-full bg-line-2" />
                <span className="block size-2 rounded-full bg-line-2" />
              </div>
              <div className="mt-4 space-y-2">
                {[["08:30", "Ceramic · Bay 1", "moss"], ["10:00", "Correction · Bay 2", "rust"], ["13:15", "Interior · Bay 1", "moss"]].map(([t, l, tone]) => (
                  <div key={t} className="flex items-center gap-2 rounded-lg bg-sand/70 px-2.5 py-1.5 text-xs">
                    <span className="tnum font-mono text-ink-mute">{t}</span>
                    <span className="h-4 w-0.5 rounded-full" style={{ background: tone === "rust" ? "var(--color-rust)" : "var(--color-moss)" }} />
                    <span className="text-ink-dim">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Win-back chips */}
        <Card className="col-span-full lg:col-span-3">
          <div className="grid h-full pt-6 sm:grid-cols-2">
            <div className="flex flex-col justify-between space-y-8 px-6 pb-6 lg:space-y-6">
              <div className="flex aspect-square size-12 items-center justify-center rounded-full border border-line">
                <span className="font-display text-sm font-semibold text-moss">↻</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold">Win-back on autopilot</h3>
                <p className="text-sm text-ink-dim">When a coating is due or a regular drifts, Lustro nudges them back at the right moment.</p>
              </div>
            </div>
            <div className="relative flex flex-col justify-center space-y-5 px-6 py-6">
              {[["Anna L.", "right"], ["Erik H.", "left"], ["Sofia B.", "right"]].map(([name, side], i) => (
                <div key={name} className={`flex items-center gap-2 ${side === "right" ? "justify-end" : "ml-4"}`}>
                  {side === "left" && <span className="grid size-7 place-items-center rounded-full bg-moss/15 text-[10px] font-semibold text-moss-text">{(name as string).split(" ").map((w) => w[0]).join("")}</span>}
                  <span className="rounded border border-line bg-paper px-2 py-1 text-xs text-ink-dim shadow-sm">{name}</span>
                  {side === "right" && <span className="grid size-7 place-items-center rounded-full bg-tan/20 text-[10px] font-semibold text-rust">{(name as string).split(" ").map((w) => w[0]).join("")}</span>}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
