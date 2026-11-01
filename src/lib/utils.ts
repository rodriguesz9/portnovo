// These components only compose class strings; no unprovisioned merge dependency.
export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ')
}
