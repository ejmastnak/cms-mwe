import type { ImageMetadata } from "astro";
import { TINA_MEDIA_ROOT, } from "@/config";

// TODO: has to be hardcoded!
const localImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/img/uploads/**/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

export async function resolveTinaImage(
  tinaPath: string
): Promise<ImageMetadata | null> {
  if (!tinaPath) return null;

  // Map remote Tina Cloud asset to corresponding local file
  // Takes e.g. https://assets.tina.io/b2c21e1d-b922-462e-99fa-06c8a69a84fb/foo/apple.jpg
  // ...extracts foo/apple.jpg, then maps to media folder
  const TINA_ASSETS_PREFIX = /^https:\/\/assets\.tina\.io\/[^/]+\/(.+)$/;
  const cloudMatch = tinaPath.match(TINA_ASSETS_PREFIX);
  if (cloudMatch) {
    const relPath = cloudMatch[1];
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
