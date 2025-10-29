import type { ImageMetadata } from "astro";
import { TINA_MEDIA_ROOT, } from "@/config";

// Glob must be harcoded because import.meta.glob requires a string literal
const localImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/img/uploads/**/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

export async function resolveTinaImage(
  tinaPath: string
): Promise<ImageMetadata | null> {
  if (!tinaPath) return null;

  // Map remote Tina Cloud asset to corresponding local file
  // Takes e.g. https://assets.tina.io/12345678-1234-1234-1234-123456789123/foo/apple.jpg
  // ...extracts foo/apple.jpg, then maps to media folder
  const clientId = process.env.PUBLIC_TINA_CLIENT_ID;
  const cloudPrefix = `https://assets.tina.io/${clientId}/`;
  if (tinaPath.startsWith(cloudPrefix)) {
    const relPath = tinaPath.slice(cloudPrefix.length);
    const key = `${TINA_MEDIA_ROOT}/${relPath}`;
    const match = localImages[key];
    if (match) return match.default;
    return null;
  }

  // Local images are already in full asset path form, e.g. /src/assets/img/foo.jpg
  const match = localImages[tinaPath];
  if (match) return match.default;

  return null;
}
