"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
  const reduce = useReducedMotion();
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* olive line-work, low opacity on cream */}
      <svg className="h-full w-full text-olive" viewBox="0 0 696 316" fill="none" aria-hidden="true">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.018}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 1, opacity: [0.2, 0.45, 0.2], pathOffset: [0, 1, 0] }}
            transition={reduce ? { duration: 0 } : { duration: 20 + Math.random() * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

const line1 = "Fill every bay.";
const line2 = "Skip the admin.";

function AnimatedTitle() {
  const reduce = useReducedMotion();
  const renderLine = (text: string, offset: number, accentFrom?: number) =>
    text.split("").map((ch, i) => (
      <motion.span
        key={`${offset}-${i}`}
        initial={reduce ? false : { y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: reduce ? 0 : (offset + i) * 0.025, type: "spring", stiffness: 150, damping: 22 }}
        className={`inline-block ${accentFrom !== undefined && i >= accentFrom ? "text-moss-text" : ""}`}
      >
        {ch === " " ? "\u00A0" : ch}
      </motion.span>
    ));

  return (
    <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-olive sm:text-6xl md:text-7xl">
      <span className="block">{renderLine(line1, 0)}</span>
      <span className="block">{renderLine(line2, line1.length, "Skip the ".length)}</span>
    </h1>
  );
}

export default function HeroPaths() {
  return (
    <section className="relative flex min-h-[78vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1 text-xs text-ink-dim backdrop-blur"
        >
          <BadgeCheck className="h-3.5 w-3.5 text-moss" />
          Trusted by 120+ Nordic detailing shops
        </motion.span>

        <div className="mt-6">
          <AnimatedTitle />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink-dim"
        >
          Lustro takes the bookings, the deposits, and the follow-ups so you can stay on the
          paint. One calendar for the whole shop — and customers who come back.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/book/lustro-demo" className="group inline-flex items-center gap-2 rounded-full bg-olive px-5 py-3 text-sm font-semibold text-cream transition hover:bg-moss">
            See a booking flow
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-cream/60 px-5 py-3 text-sm font-medium text-olive backdrop-blur transition hover:border-olive">
            Tour the dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-ink-mute"
        >
          <span className="tnum font-mono">No-show rate down 31%</span>
          <span className="h-3 w-px bg-line-2" />
          <span className="font-mono">Setup in a day</span>
        </motion.div>
      </div>
    </section>
  );
}
