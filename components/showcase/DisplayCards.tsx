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
  titleClassName = "text-moss-text",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-line bg-paper/80 px-4 py-3 backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-cream after:to-transparent after:content-[''] hover:border-moss hover:bg-paper [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-olive p-1.5">{icon}</span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-olive">{description}</p>
      <p className="text-ink-mute">{date}</p>
    </div>
  );
}

export default function DisplayCards() {
  const cards: DisplayCardProps[] = [
    {
      icon: <CreditCard className="size-4 text-cream" />,
      title: "Deposit taken",
      description: "Slot held automatically",
      date: "At booking",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-line before:h-[100%] before:content-[''] before:bg-cream/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Bell className="size-4 text-cream" />,
      title: "Reminder sent",
      description: "Day-before SMS + email",
      date: "Automatic",
      className:
        "[grid-area:stack] translate-x-14 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-line before:h-[100%] before:content-[''] before:bg-cream/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Star className="size-4 text-cream" />,
      title: "Review requested",
      description: "The moment the job is done",
      date: "On completion",
      className: "[grid-area:stack] translate-x-28 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <div className="grid place-items-center [grid-template-areas:'stack']">
      {cards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
