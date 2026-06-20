"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, CalendarCheck, Loader2 } from "lucide-react";
import type { Shop, Service } from "@/lib/services";
import { buildAvailability, type Day } from "@/lib/availability";
import { track } from "@/lib/track";
import { sendBookingConfirmation } from "@/lib/email";

type Step = "service" | "time" | "details" | "pay" | "done";
const ORDER: Step[] = ["service", "time", "details", "pay", "done"];
const STEP_LABEL: Record<Step, string> = {
  service: "Service",
  time: "Time",
  details: "Details",
  pay: "Deposit",
  done: "Done",
};

const kr = (n: number) => `${n.toLocaleString("sv-SE")} kr`;

type FormKey = "name" | "email" | "phone" | "car" | "reg";
const emptyForm: Record<FormKey, string> = { name: "", email: "", phone: "", car: "", reg: "" };

// skill: inline-validation — validate on blur, error states cause + fix
function validate(key: FormKey, v: string): string | null {
  const val = v.trim();
  if (key === "name" && !val) return "Enter the name the booking is under.";
  if (key === "car" && !val) return "Tell us the make and model so we know what's coming in.";
  if (key === "email") {
    if (!val) return "We need an email to send your confirmation.";
    if (!/\S+@\S+\.\S+/.test(val)) return "That email doesn't look right — check for a typo.";
  }
  if (key === "phone" && val && val.replace(/[\s+()-]/g, "").length < 6)
    return "That phone number looks too short.";
  return null;
}

export default function BookingFlow({ shop }: { shop: Shop }) {
  const [step, setStep] = useState<Step>("service");
  const [service, setService] = useState<Service | null>(null);
  const [dayIso, setDayIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState<Record<FormKey, boolean>>({ name: false, email: false, phone: false, car: false, reg: false });
  const [paying, setPaying] = useState(false);

  const days: Day[] = useMemo(() => (service ? buildAvailability(shop, service) : []), [shop, service]);
  const selectedDay = days.find((d) => d.iso === dayIso) ?? null;

  const idx = ORDER.indexOf(step);
  const go = (s: Step) => setStep(s);

  const errors: Record<FormKey, string | null> = {
    name: validate("name", form.name),
    email: validate("email", form.email),
    phone: validate("phone", form.phone),
    car: validate("car", form.car),
    reg: null,
  };
  const detailsValid = !errors.name && !errors.email && !errors.car && !errors.phone;

  // skill: focus-on-route-change — move focus to the step heading on navigation
  useEffect(() => {
    document.getElementById("step-heading")?.focus();
  }, [step]);

  function set(key: FormKey, v: string) {
    setForm((f) => ({ ...f, [key]: v }));
  }
  function blur(key: FormKey) {
    setTouched((t) => ({ ...t, [key]: true }));
  }
  function continueFromDetails() {
    setTouched({ name: true, email: true, phone: true, car: true, reg: false });
    if (detailsValid) go("pay");
  }

  function chooseService(s: Service) {
    setService(s);
    setDayIso(null);
    setTime(null);
    track("booking_service_selected", { service: s.id, price: s.priceSek });
    go("time");
  }

  async function pay() {
    if (!service || !selectedDay || !time) return;
    setPaying(true);
    track("deposit_checkout_started", { service: service.id, deposit: service.depositSek });
    await new Promise((r) => setTimeout(r, 1400));
    await sendBookingConfirmation({
      to: form.email,
      customer: form.name,
      service: service.name,
      when: `${selectedDay.weekday} ${selectedDay.label} · ${time}`,
      shop: shop.name,
    });
    track("booking_confirmed", { service: service.id, value: service.priceSek });
    setPaying(false);
    go("done");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        {/* Stepper (skill: progress-indicators) */}
        {step !== "done" && (
          <>
            <div className="mb-6 flex items-center gap-3 sm:hidden">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-olive font-mono text-xs font-semibold text-cream">{idx + 1}</span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-mute">Step {idx + 1} of 4</p>
                <p className="text-sm font-medium text-olive">{STEP_LABEL[step]}</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {ORDER.slice(0, 4).map((s) => (
                  <span key={s} className={`h-1.5 w-1.5 rounded-full ${ORDER.indexOf(s) <= idx ? "bg-moss" : "bg-line"}`} />
                ))}
              </div>
            </div>

            <ol className="mb-8 hidden items-center gap-2 text-xs sm:flex" aria-label={`Step ${idx + 1} of 4`}>
              {ORDER.slice(0, 4).map((s, i) => {
                const active = s === step;
                const past = ORDER.indexOf(s) < idx;
                return (
                  <li key={s} className="flex items-center gap-2" aria-current={active ? "step" : undefined}>
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] transition ${active ? "bg-olive text-cream" : past ? "bg-moss/20 text-moss-text" : "border border-line text-ink-mute"}`}>
                      {past ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    <span className={active ? "text-olive" : "text-ink-mute"}>{STEP_LABEL[s]}</span>
                    {i < 3 && <span className="mx-1 hidden h-px w-6 bg-line md:inline-block" />}
                  </li>
                );
              })}
            </ol>
          </>
        )}

        {step === "service" && (
          <Section title="Choose a service" sub="Pick what your car needs. Prices include VAT.">
            <div className="grid gap-3 sm:grid-cols-2">
              {shop.services.map((s) => (
                <button key={s.id} onClick={() => chooseService(s)} className="group cursor-pointer rounded-[var(--radius-card)] border border-line bg-paper p-5 text-left transition hover:border-moss hover:shadow-sm">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display font-semibold text-lg">{s.name}</h3>
                    <span className="h-7 w-1 rounded-full" style={{ background: s.tone === "wax" ? "var(--color-rust)" : "var(--color-moss)" }} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.blurb}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="tnum font-mono text-ink-mute">{s.durationMin >= 60 ? `${Math.round(s.durationMin / 60)}h` : `${s.durationMin}m`}</span>
                    <span className="tnum font-display font-semibold text-olive">{kr(s.priceSek)}</span>
                  </div>
                  <p className="tnum mt-1 text-xs text-ink-mute">{kr(s.depositSek)} deposit to book</p>
                </button>
              ))}
            </div>
          </Section>
        )}

        {step === "time" && service && (
          <Section title="Pick a time" sub={`Live availability across ${shop.bays} bays.`}>
            <div className="-mx-1 flex gap-2 overflow-x-auto pb-2">
              {days.map((d) => {
                const open = d.slots.length > 0;
                const active = d.iso === dayIso;
                return (
                  <button key={d.iso} disabled={!open} onClick={() => { setDayIso(d.iso); setTime(null); }} className={`flex min-w-[64px] cursor-pointer flex-col items-center rounded-xl border px-3 py-3 text-sm transition disabled:cursor-not-allowed ${active ? "border-moss bg-moss/10 text-olive" : open ? "border-line text-ink-dim hover:border-olive" : "border-line/40 text-ink-mute/40"}`}>
                    <span className="text-xs">{d.weekday}</span>
                    <span className="tnum font-display font-semibold text-base">{d.label.split(" ")[0]}</span>
                    <span className="text-[10px] text-ink-mute">{open ? `${d.slots.length} slots` : "—"}</span>
                  </button>
                );
              })}
            </div>

            {selectedDay && (
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {selectedDay.slots.map((sl) => {
                  const active = sl.time === time;
                  return (
                    <button key={sl.time} onClick={() => { setTime(sl.time); track("slot_selected", { time: sl.time }); }} aria-pressed={active} className={`tnum cursor-pointer rounded-lg border px-2 py-2.5 font-mono text-sm transition ${active ? "border-olive bg-olive text-cream" : "border-line text-ink-dim hover:border-moss hover:text-olive"}`}>
                      {sl.time}
                    </button>
                  );
                })}
              </div>
            )}

            <Nav onBack={() => go("service")} onNext={() => go("details")} nextOk={!!time} />
          </Section>
        )}

        {step === "details" && (
          <Section title="Your car & contact" sub="So we know what's coming in and can send your confirmation.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Your name" required value={form.name} onChange={(v) => set("name", v)} onBlur={() => blur("name")} error={touched.name ? errors.name : null} placeholder="Anna Lindqvist" autoComplete="name" />
              <Field id="phone" label="Phone" type="tel" inputMode="tel" value={form.phone} onChange={(v) => set("phone", v)} onBlur={() => blur("phone")} error={touched.phone ? errors.phone : null} placeholder="+46 70 123 45 67" autoComplete="tel" />
              <Field id="email" label="Email" required type="email" inputMode="email" full value={form.email} onChange={(v) => set("email", v)} onBlur={() => blur("email")} error={touched.email ? errors.email : null} placeholder="anna@email.se" autoComplete="email" />
              <Field id="car" label="Car (make & model)" required value={form.car} onChange={(v) => set("car", v)} onBlur={() => blur("car")} error={touched.car ? errors.car : null} placeholder="Volvo XC60" />
              <Field id="reg" label="Reg. plate (optional)" value={form.reg} onChange={(v) => set("reg", v)} placeholder="ABC 123" />
            </div>
            <Nav onBack={() => go("time")} onNext={continueFromDetails} nextOk={detailsValid} nextLabel="Continue to deposit" />
          </Section>
        )}

        {step === "pay" && service && (
          <Section title="Hold your slot" sub="A deposit secures the bay and comes off your final bill.">
            <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
              <div className="flex items-center gap-2 text-sm text-ink-dim">
                <Lock className="h-4 w-4 text-moss" /> Test mode — no real card is charged
              </div>
              <div className="mt-4 space-y-3">
                <FakeInput label="Card number" value="4242 4242 4242 4242" icon />
                <div className="grid grid-cols-2 gap-3">
                  <FakeInput label="Expiry" value="12 / 28" />
                  <FakeInput label="CVC" value="123" />
                </div>
              </div>
            </div>
            <button onClick={pay} disabled={paying} aria-busy={paying} className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-olive px-5 py-3.5 text-sm font-semibold text-cream transition hover:bg-moss disabled:cursor-wait disabled:opacity-70">
              {paying ? (<><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>) : (<>Pay {kr(service.depositSek)} deposit</>)}
            </button>
            <button onClick={() => go("details")} className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1 text-sm text-ink-mute transition hover:text-ink-dim">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          </Section>
        )}

        {step === "done" && service && selectedDay && (
          <div className="rounded-[var(--radius-card)] border border-line bg-paper p-8 text-center">
            <h1 id="step-heading" tabIndex={-1} className="sr-only outline-none">Booking confirmed</h1>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-moss/15">
              <Check className="h-7 w-7 text-moss" />
            </span>
            <h2 className="mt-5 font-display font-semibold text-2xl">You&apos;re booked in</h2>
            <p className="mt-2 text-ink-dim">{service.name} · {selectedDay.weekday} {selectedDay.label} at {time}</p>
            <div className="mx-auto mt-6 max-w-xs rounded-xl border border-line bg-sand p-4 text-left text-sm">
              <Row k="Where" v={`${shop.name}, ${shop.city}`} />
              <Row k="Deposit paid" v={kr(service.depositSek)} />
              <Row k="Due on the day" v={kr(service.priceSek - service.depositSek)} />
              <Row k="Confirmation" v={form.email} />
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-xs text-ink-mute">
              <CalendarCheck className="h-4 w-4" /> A reminder goes out the day before.
            </p>
          </div>
        )}
      </div>

      {/* Sticky summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[var(--radius-card)] border border-line bg-paper p-5">
          <p className="text-xs uppercase tracking-widest text-ink-mute">{shop.name}</p>
          <p className="font-display font-semibold text-lg">{shop.city}</p>
          <div className="my-4 h-px bg-line" />
          {service ? (
            <>
              <Row k="Service" v={service.name} />
              {selectedDay && <Row k="When" v={`${selectedDay.weekday} ${selectedDay.label}${time ? ` · ${time}` : ""}`} />}
              <div className="my-4 h-px bg-line" />
              <Row k="Total" v={kr(service.priceSek)} num />
              <Row k="Deposit now" v={kr(service.depositSek)} accent num />
            </>
          ) : (
            <p className="text-sm text-ink-mute">Pick a service to start.</p>
          )}
        </div>
      </aside>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 id="step-heading" tabIndex={-1} className="font-display font-semibold text-2xl tracking-tight outline-none">{title}</h1>
      <p className="mt-1 text-sm text-ink-dim">{sub}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Nav({ onBack, onNext, nextOk, nextLabel = "Continue" }: { onBack: () => void; onNext: () => void; nextOk: boolean; nextLabel?: string }) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <button onClick={onBack} className="flex cursor-pointer items-center gap-1 text-sm text-ink-mute transition hover:text-ink-dim">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <button onClick={onNext} disabled={!nextOk} className="flex cursor-pointer items-center gap-2 rounded-full bg-olive px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-40">
        {nextLabel} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Field({
  id, label, value, onChange, onBlur, error, placeholder, full, required, type = "text", inputMode, autoComplete,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; onBlur?: () => void;
  error?: string | null; placeholder?: string; full?: boolean; required?: boolean;
  type?: string; inputMode?: "text" | "email" | "tel"; autoComplete?: string;
}) {
  const errId = `${id}-error`;
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="text-xs text-ink-mute">
        {label} {required && <span className="text-rust" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        className={`mt-1.5 w-full rounded-xl border bg-paper px-4 py-2.5 text-base text-olive outline-none transition placeholder:text-ink-mute/60 sm:text-sm ${error ? "border-danger focus:border-danger" : "border-line focus:border-moss"}`}
      />
      {error && (
        <p id={errId} role="alert" className="mt-1.5 text-xs text-danger">{error}</p>
      )}
    </div>
  );
}

function FakeInput({ label, value, icon }: { label: string; value: string; icon?: boolean }) {
  return (
    <div>
      <span className="text-xs text-ink-mute">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink-dim">
        {icon && <CreditCard className="h-4 w-4 text-ink-mute" />}
        <span className="tnum font-mono">{value}</span>
      </div>
    </div>
  );
}

function Row({ k, v, accent, num }: { k: string; v: string; accent?: boolean; num?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-ink-mute">{k}</span>
      <span className={`${num ? "tnum " : ""}${accent ? "font-display font-semibold text-moss-text" : "text-olive"}`}>{v}</span>
    </div>
  );
}
