'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Photo from './Photo';
import { parallaxMoments, photos } from '@/lib/site';

const tones = ['forest', 'wine', 'champagne'] as const;

export default function ParallaxMemories() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-par-img]'), { yPercent: 0 });
        gsap.set(q('[data-par-cap]'), { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Oversized image moves slower than the viewport -> parallax.
        q('[data-par-panel]').forEach((panel) => {
          const img = panel.querySelector('[data-par-img]');
          gsap.fromTo(
            img,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );

          const cap = panel.querySelector('[data-par-cap]');
          if (cap) {
            gsap.fromTo(
              cap,
              { autoAlpha: 0, y: 30 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1.3,
                ease: 'power3.out',
                scrollTrigger: { trigger: panel, start: 'top 55%' },
              },
            );
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-blush">
      {parallaxMoments.map((m, i) => (
        <div
          key={i}
          data-par-panel
          className="relative h-[85vh] w-full overflow-hidden md:h-screen"
        >
          {/* image is oversized so parallax never exposes edges */}
          <div data-par-img className="absolute inset-x-0 -top-[12%] h-[124%]">
            <Photo
              src={photos.parallax[i % photos.parallax.length]}
              alt={m.caption}
              tone={tones[i % tones.length]}
              label={`memory ${i + 1}`}
              seed={i + 11}
              style={{ position: 'absolute', inset: 0 }}
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/30 to-ink/25" />
          <div className="absolute inset-0 flex items-end justify-center pb-24 md:items-center md:pb-0">
            <p
              data-par-cap
              className="font-display text-4xl text-ivory drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] md:text-6xl"
            >
              {m.caption}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
