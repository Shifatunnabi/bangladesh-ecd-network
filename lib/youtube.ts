// Shared helpers for turning admin-supplied YouTube links into embeds/thumbnails.
// Supports watch links, youtu.be short links, Shorts, live, /v/, and already-embedded URLs.

const YOUTUBE_URL_PATTERN =
  /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/))([\w-]{11})/;

/**
 * Extract the 11-character video ID from any common YouTube URL format.
 * Returns null when the URL is empty or not recognisable as a YouTube link.
 */
export function getYouTubeVideoId(url?: string | null): string | null {
  if (!url) return null;

  const trimmed = url.trim();

  // Already just the video ID
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(YOUTUBE_URL_PATTERN);
  return match ? match[1] : null;
}

/**
 * Build a frame-able embed URL. YouTube blocks watch/shorts pages inside an
 * iframe, so anything rendered in one has to go through /embed/.
 */
export function getYouTubeEmbedUrl(url?: string | null): string | null {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

/**
 * Poster image for a video, falling back to a local placeholder.
 */
export function getYouTubeThumbnail(
  url?: string | null,
  fallback = "/placeholder.svg"
): string {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : fallback;
}
