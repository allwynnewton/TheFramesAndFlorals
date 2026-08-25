'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Photo from './Photo';
import Reveal from './Reveal';
import { photos } from '@/lib/site';

// An intentionally irregular editorial collage (percent-based on desktop).
const items = [
  { tone: 'forest', label: 'moment', span: 'md:col-span-5 md:row-span-2', ar: 'aspect-[4/5]', rot: -2, seed: 51 },
  { tone: 'champagne', label: 'moment', span: 'md:col-span-4 md:col-start-8', ar: 'aspect-[4/3]', rot: 2, seed: 52 },
  { tone: 'wine', label: 'moment', span: 'md:col-span-3 md:col-start-8 md:row-start-2', ar: 'aspect-square', rot: -1.5, seed: 53 },
  { tone: 'cream', label: 'moment', span: 'md:col-span-4 md:row-start-3', ar: 'aspect-[3/4]', rot: 1.5, seed: 54 },
  { tone: 'charcoal', label: 'moment', span: 'md:col-span-6 md:col-start-6 md:row-start-3', ar: 'aspect-[16/10]', rot: -2, seed: 55 },
] as const;

export default function MemoryGallery() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-tile]'), { autoAlpha: 1, y: 0, rotate: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>(q('[data-tile]')).forEach((tile, i) => {
          const startRot = Number(tile.dataset.rot ?? 0);
          gsap.fromTo(
            tile,
            { autoAlpha: 0, y: 80 + (i % 3) * 30, rotate: startRot },
            {
              autoAlpha: 1,
              y: 0,
              rotate: 0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: tile,
                start: 'top 92%',
                end: 'top 45%',
                scrub: 1,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-blush px-6 py-32 text-ink md:py-48">
      <Reveal className="mb-20 text-center">
        <p className="eyebrow text-mauve">A few of our favourites</p>
        <h2 className="display-lg mt-6 text-ink">OUR MEMORIES</h2>
      </Reveal>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-12 md:auto-rows-[16vw] md:gap-8">
        {items.map((it, i) => (
          <figure
            key={i}
            data-tile
            data-rot={it.rot}
            className={`${it.span} ${it.ar} md:aspect-auto shadow-[0_30px_70px_-40px_rgba(120,100,105,0.35)]`}
          >
            <Photo
              src={photos.memory[i % photos.memory.length]}
              alt={`Memory ${i + 1}`}
              tone={it.tone}
              label={it.label}
              seed={it.seed}
              className="h-full w-full"
              sizes="(max-width: 768px) 90vw, 45vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
