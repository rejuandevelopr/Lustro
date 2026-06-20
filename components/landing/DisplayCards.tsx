"use client";

import { cn } from "@/lib/utils";
import { CreditCard, Bell, Star } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <CreditCard className="size-4 text-cream" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  titleClassName = "text-olive",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-line bg-paper/80 px-4 py-3 backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-cream after:to-transparent after:content-[''] hover:border-moss/40 hover:bg-paper [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-olive p-1.5">{icon}</span>
        <p className={cn("font-display text-lg font-semibold", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-sm text-ink-dim">{description}</p>
      <p className="text-xs text-ink-mute">{date}</p>
    </div>
  );
}

const cards: DisplayCardProps[] = [
  {
    icon: <CreditCard className="size-4 text-cream" />,
    title: "Deposits up front",
    description: "No-shows drop, slots stay held",
    date: "via Stripe",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-line before:h-[100%] before:content-[''] before:bg-cream/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Bell className="size-4 text-cream" />,
    title: "Reminders that show up",
    description: "Day-before SMS + email, automatic",
    date: "the day before",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-line before:h-[100%] before:content-[''] before:bg-cream/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Star className="size-4 text-cream" />,
    title: "Five-star asks",
    description: "Sent the moment a job is done",
    date: "via Resend",
    className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export default function DisplayCardsShowcase() {
  return (
    <section className="border-y border-line bg-sand">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-rust">Why shops switch</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            The three things that pay for Lustro in week one.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-dim">
            Deposits stop the no-shows. Reminders fill the empty slots. The review ask builds the
            reputation that brings the next car in. Hover the cards.
          </p>
        </div>
        <div className="grid place-items-center py-10 [grid-template-areas:'stack']">
          {cards.map((c, i) => (
            <DisplayCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
