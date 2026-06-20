import { Star, Check, ShieldCheck, Lock, BadgeCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroPaths } from "@/components/hero/HeroPaths";
import DisplayCards from "@/components/showcase/DisplayCards";
import { FeatureBento } from "@/components/features/FeatureBento";
import { Reveal } from "@/components/ui/Reveal";
import { Casestudy5 } from "@/components/features/Casestudy5";

const featuredCaseStudy = {
  logo: "/images/ai-gallery-svgrepo-com.svg",
  company: "Lustro",
  tags: "BOOKING AUTOMATION / DETAILING BUSINESS",
  title: "Fill your calendar without answering calls.",
  subtitle: "Customers book online, pay deposits, and receive reminders automatically.",
  image:
    "/images/icon.png",
  link: "#",
};

const caseStudies = [
  {
    logo: "/images/bank-svgrepo-com.svg",
    company: "Deposits",
    tags: "NO-SHOW PROTECTION",
    title: "Secure every booking.",
    subtitle: "Collect deposits automatically and reduce cancellations.",
    image: "",
    link: "#",
  },
  {
    logo: "/images/employees-svgrepo-com.svg",
    company: "Retention",
    tags: "CUSTOMER REBOOKING",
    title: "Bring customers back.",
    subtitle: "Automated reminders increase repeat business.",
    image: "",
    link: "#",
  },
];

const testimonials = [
  { quote: "No-shows used to cost me a bay a day. Deposits fixed that in a week.", name: "Johan Ek", role: "Owner", shop: "Ek Bilvård, Göteborg", initials: "JE" },
  { quote: "Customers rebook before they leave the lot now. My calendar fills itself.", name: "Marta Sø", role: "Founder", shop: "Glans Detailing, Oslo", initials: "MS" },
  { quote: "Setup took an afternoon. The reminders alone paid for the month.", name: "Petri Laine", role: "Lead detailer", shop: "Kiilto Auto, Helsinki", initials: "PL" },
];

const lustroFeatures = [
  {
    id: 1,
    title: "Online Booking Page",
    image: "/placeholder.png",
    description: "Accept bookings 24/7...",
  },
  {
    id: 2,
    title: "Secure Deposits",
    image: "/placeholder.png",
    description: "Reduce no-shows...",
  },
  {
    id: 3,
    title: "Automated Reminders",
    image: "/placeholder.png",
    description: "Send reminders automatically...",
  },
  {
    id: 4,
    title: "Simple Dashboard",
    image: "/placeholder.png",
    description: "Manage bookings from one dashboard.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-line bg-cream/85 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold tracking-tight">Lustro</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-ink-dim md:flex">
            <a href="#proof" className="transition hover:text-olive">Proof</a>
            <a href="#features" className="transition hover:text-olive">Platform</a>
            <a href="#retention" className="transition hover:text-olive">Retention</a>
            <a href="#pricing" className="transition hover:text-olive">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden text-sm text-ink-dim transition hover:text-olive sm:block">Sign in</Link>
            <Link href="/dashboard" className="rounded-full bg-olive px-4 py-2 text-sm font-medium text-cream transition hover:bg-moss">Open dashboard</Link>
          </div>
        </nav>
      </header>

      {/* Hero — animated paths */}
      <HeroPaths />

      <Reveal>
        {/* Proof — stats + security badges */}
        <section id="proof" className="border-y border-line bg-sand">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
            {[
              ["31%", "fewer no-shows with deposits"],
              ["4.9 stars", "average review after a detail"],
              ["12 min", "saved per booking, no phone tag"],
              ["68%", "rebook within 90 days"],
            ].map(([n, l]) => (
              <div key={l} className="bg-sand px-6 py-7">
                <p className="tnum font-display text-3xl font-semibold text-olive">{n}</p>
                <p className="mt-1 text-sm leading-snug text-ink-mute">{l}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line px-6 py-5 text-sm text-ink-dim">
            <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-moss" /> PCI-compliant deposits via Stripe</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-moss" /> GDPR-ready customer data</span>
            <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-moss" /> 99.9% uptime</span>
          </div>
        </section>

      </Reveal>
      <Reveal>
        {/* Showcase — stacked display cards */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-moss-text">The flow, on autopilot</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">Every booking runs itself, end to end.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink-dim">
              A customer picks a slot and pays a deposit. The reminder goes out the day before.
              The review ask fires the moment the job&apos;s done. You never touch the admin.
            </p>
            <Link href="/book/lustro-demo" className="mt-7 inline-flex items-center gap-2 rounded-full bg-olive px-5 py-3 text-sm font-semibold text-cream transition hover:bg-moss">
              See the booking flow <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden">
            <DisplayCards />
          </div>
        </section>

      </Reveal>
      <Reveal>
        {/* Features — bento grid */}
        <div id="features">
          <FeatureBento />
        </div>

      </Reveal>
      <Reveal>
        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-moss-text">From the bay</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">Detailers who stopped doing admin.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-6">
                <div className="flex gap-0.5 text-tan">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-olive">“{t.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-moss/15 text-xs font-semibold text-moss-text">{t.initials}</span>
                  <span className="text-sm">
                    <span className="block font-medium text-olive">{t.name}</span>
                    <span className="block text-xs text-ink-mute">{t.role} · {t.shop}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

      </Reveal>



      <Reveal>
        <Casestudy5
          featuredCasestudy={featuredCaseStudy}
          casestudies={caseStudies}
        />
      </Reveal>


      <Reveal>
        {/* Retention */}
        <section id="retention" className="border-y border-line bg-sand">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-rust">Retention</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">A booking is a customer. The second booking is a business.</h2>
              <p className="mt-5 leading-relaxed text-ink-dim">
                Most detailers win the first job and lose the relationship. Lustro tracks what each car had
                done, when the coating was applied, and how dirty Stockholm winters get — then brings the right
                customer back at the right time.
              </p>
              <ul className="mt-6 space-y-3">
                {["Service intervals tuned per coating and per car", "Win-back nudges for customers who drifted", "A lifetime value figure on every customer card"].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-olive"><Check className="mt-0.5 h-4 w-4 shrink-0 text-moss" />{p}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-6">
              <p className="text-xs uppercase tracking-widest text-ink-mute">Win-back queue</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Anna Lindqvist", "Ceramic · 11 months ago", "Due for top-up", "rust"],
                  ["Erik Holm", "Full detail · 4 months ago", "Interval reached", "moss"],
                  ["Sofia Berg", "Wash & wax · 6 weeks ago", "Frequent — VIP", "moss"],
                ].map(([name, hist, tag, tone]) => (
                  <div key={name} className="flex items-center justify-between rounded-xl border border-line px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-ink-mute">{hist}</p>
                    </div>
                    <span className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: tone === "rust" ? "rgba(188,108,37,0.14)" : "rgba(96,108,56,0.16)", color: tone === "rust" ? "var(--color-rust)" : "var(--color-moss-text)" }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </Reveal>

      

      <Reveal>
        {/* CTA */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl">Your bays don&apos;t fill themselves.</h2>
          <p className="mx-auto mt-4 max-w-md text-ink-dim">Flat SEK 490/month, no per-booking fees. Spin up your page and take your first deposit today.</p>
          <Link href="/book/lustro-demo" className="mt-8 inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-moss">
            Try the booking flow <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-ink-mute">No card to start · Cancel anytime</p>
        </section>

      </Reveal>

      <footer className="border-t border-line bg-sand">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <span className="font-display text-xl font-semibold text-olive">Lustro</span>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-dim">
                Booking & retention built for auto detailers. Fill every bay, take deposits, and
                bring customers back — without the admin.
              </p>
              <div className="mt-5 flex gap-2">
                {[
                  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" },
                  { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" },
                  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full border border-line bg-cream text-ink-dim transition hover:border-olive hover:text-olive">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: [["Booking flow", "/book/lustro-demo"], ["Dashboard", "/dashboard"], ["Retention", "#retention"], ["Pricing", "#pricing"]] },
              { title: "Company", links: [["About", "#"], ["Customers", "#proof"], ["Careers", "#"], ["Contact", "#"]] },
              { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["GDPR", "#"], ["Security", "#"]] },
            ].map((col) => (
              <div key={col.title}>
                <p className="font-display text-sm font-semibold text-olive">{col.title}</p>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-ink-dim transition hover:text-olive">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-ink-mute md:flex-row">
            <span>© 2026 Lustro · Stockholm, Sweden</span>
            <span className="flex items-center gap-5">
              <a href="#" className="transition hover:text-olive">Status</a>
              <a href="#" className="transition hover:text-olive">Changelog</a>
              <span className="font-mono text-xs">Demo build</span>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
