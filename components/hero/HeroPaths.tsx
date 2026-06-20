"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full text-olive" viewBox="0 0 696 316" fill="none" aria-hidden="true">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.018}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: [0.25, 0.5, 0.25], pathOffset: [0, 1, 0] }}
            transition={{ duration: 20 + Math.random() * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

export function HeroPaths() {
  const title = "Fill every bay.";
  const words = title.split(" ");

  return (
    <section className="relative flex min-h-[88vh] w-full items-center justify-center overflow-hidden bg-cream grain">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1 text-xs text-ink-dim backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-moss" />
          Booking & retention for auto detailers
        </motion.span>

        <h1 className="mb-3 font-display text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl">
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="mr-4 inline-block last:mr-0">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: wordIndex * 0.1 + letterIndex * 0.03, type: "spring", stiffness: 150, damping: 25 }}
                  className="inline-block bg-gradient-to-b from-olive to-moss bg-clip-text text-transparent"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink-dim"
        >
          Lustro takes the bookings, the deposits, and the follow-ups — so you can stay on the paint.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="/book/lustro-demo" className="group inline-flex items-center gap-2 rounded-full bg-olive px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-moss">
            See a booking flow
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-paper/70 px-6 py-3.5 text-sm font-medium text-olive backdrop-blur transition hover:border-olive">
            Tour the dashboard
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
