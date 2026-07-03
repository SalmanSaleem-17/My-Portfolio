// src/utils/imageLoader.ts
// Per-image next/image loader for Cloudinary sources.
//
// Applied via the `loader` prop on <Image> components that render Cloudinary
// URLs. It delivers the image straight from Cloudinary's CDN with on-the-fly
// optimization (f_auto = best format, q_auto = smart quality, w_ = exact width),
// so the browser never routes through Next's /_next/image endpoint. That removes
// the server-side upstream fetch that was timing out and leaving images blank.

interface LoaderArgs {
  src: string
  width: number
  quality?: number
}

export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  if (src.includes('res.cloudinary.com') && src.includes('/upload/')) {
    const q = quality ? `q_${quality}` : 'q_auto'
    return src.replace('/upload/', `/upload/f_auto,${q},w_${width}/`)
  }
  // Fallback (non-Cloudinary src) — return unchanged.
  return src
}
