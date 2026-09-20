/** Public-file URL that respects Vite `base` (Grok `/`, GitHub Pages `/mn-pi-atlas/`). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const trimmed = path.replace(/^\//, "");
  return `${base.endsWith("/") ? base : `${base}/`}${trimmed}`;
}
