import { notFound } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
import { getShop } from "@/lib/services";
import BookingFlow from "@/components/booking/BookingFlow";

export default async function BookPage({ params }: { params: Promise<{ shop: string }> }) {
  const { shop: slug } = await params;
  const shop = getShop(slug);
  if (!shop) notFound();

  return (
    <main className="min-h-screen grain">
      <header className="border-b border-line/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold tracking-tight">Lustro</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-ink-mute sm:inline">Booking · {shop.name}</span>
            <Link href="/" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-olive transition hover:border-olive hover:bg-paper">
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <BookingFlow shop={shop} />
      </div>
    </main>
  );
}
