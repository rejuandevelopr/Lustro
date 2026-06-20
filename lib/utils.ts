// Minimal class joiner (avoids pulling full clsx/tailwind-merge for these components).
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(" ");
}
