// Analytics stub. In production each call maps to posthog.capture(event, props).
// Kept as a thin wrapper so swapping in PostHog touches one file, not every screen.
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    // posthog.capture(event, props)
    console.log(`[track] ${event}`, props ?? {});
  }
}
