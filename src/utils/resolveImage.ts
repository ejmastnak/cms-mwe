import type { ImageMetadata } from "astro";
import { TINA_MEDIA_ROOT } from "@/config";

const localImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/img/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);

export async function resolveTinaImage(
  tinaPath: string
): Promise<ImageMetadata | null> {
  if (!tinaPath) return null;

  // Map remote Tina Cloud asset to corresponding local file
  // Takes e.g. https://assets.tina.io/b2c21e1d-b922-462e-99fa-06c8a69a84fb/img/apple.jpg
  // ...extracts img/apple.jpg, and maps to src/assets
  if (tinaPath.startsWith("https://assets.tina.io")) {
    const match = tinaPath.match(/\/(img\/.+)$/);
    if (match) {
      const rel = match[1];
      const key = `${TINA_MEDIA_ROOT}/${rel}`;
      const found = localImages[key];
      if (found) return found.default;
    }
    return null;
  }

  // Map local images to `/src/assets`, e.g. /img/foo.jpg -> /src/assets/img/foo.jpg
  const cleanPath = tinaPath.replace(/^\/+/, "");  // remove leading slash if present
  const key = `${TINA_MEDIA_ROOT}/${tinaPath}`;
  const match = localImages[key];
  if (match) return match.default;

  return null;
}
