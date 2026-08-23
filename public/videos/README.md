# Church cinematic video

`church-cinematic.mp4` drives the scroll-scrubbed church sequence
(`components/ChurchCinematicSection.tsx`). Scroll position sets `video.currentTime`
via GSAP — the clip never autoplays or loops.

**This file has been re-encoded for smooth scroll scrubbing** — H.264, 24 fps,
a keyframe every 8 frames (~⅓ s), audio stripped, `+faststart`, ~5.4 MB. The
original upload had a keyframe only every ~2 s (5 total), which made `currentTime`
seeking stutter; the optimized version has 30 keyframes so seeking is responsive.

If you replace the clip with new footage, re-encode it the same way (below).

## Re-encode for responsive seeking (recommended)

Install FFmpeg, then from the project root:

```bash
# Desktop: H.264, 24fps, keyframe every 12 frames (~0.5s), audio stripped, web-optimised
ffmpeg -i sources/video1.mp4 -an \
  -vf "scale='min(1920,iw)':-2,fps=24" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -g 12 -keyint_min 12 -sc_threshold 0 \
  -crf 20 -preset slow -movflags +faststart \
  public/videos/church-cinematic.mp4
```

- `-g 12` = a keyframe twice a second. For *extra* responsive scrubbing use
  `-g 6` (bigger file). Don't crush the bitrate to save size — scrub smoothness
  matters more here than the last megabyte.
- `-an` strips audio (the scene is muted by design).
- `-movflags +faststart` moves the index to the front for fast web start.

## Optional: a lighter portrait-friendly mobile source

```bash
ffmpeg -i sources/video1.mp4 -an \
  -vf "scale='min(1080,iw)':-2,fps=24" \
  -c:v libx264 -profile:v main -pix_fmt yuv420p \
  -g 12 -keyint_min 12 -sc_threshold 0 \
  -crf 23 -preset slow -movflags +faststart \
  public/videos/church-cinematic-mobile.mp4
```

Then uncomment the mobile `<source>` in `ChurchCinematicSection.tsx`:

```jsx
<source media="(max-width: 768px)" src="/videos/church-cinematic-mobile.mp4" type="video/mp4" />
```

## Optional: a real poster frame

The component ships with a warm dark gradient poster (a data-URI, so there's
never a white flash). To use an actual frame instead:

```bash
# grab a nice frame ~2s in
ffmpeg -ss 2 -i public/videos/church-cinematic.mp4 -frames:v 1 -q:v 2 \
  public/images/church-video-poster.webp
```

Then set `poster="/images/church-video-poster.webp"` on the `<video>`.

## A note on WebM

VP9/WebM often compresses smaller but can seek *worse* frame-to-frame than a
short-GOP H.264 MP4. Prefer the MP4 above for scrubbing; only add a WebM
`<source>` first if you've confirmed its seeking feels good on your target
devices.
