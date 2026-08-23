'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { scriptures } from '@/lib/site';

// low-opacity translucent panes — amber, wine, rose, deep blue
const panes = [
  { c: 'rgba(199,167,106,0.30)', x: '8%', y: '12%', w: '32%', h: '46%', r: -8 },
  { c: 'rgba(90,38,52,0.22)', x: '58%', y: '6%', w: '30%', h: '40%', r: 6 },
  { c: 'rgba(190,120,120,0.20)', x: '20%', y: '52%', w: '34%', h: '42%', r: 10 },
  { c: 'rgba(60,80,120,0.20)', x: '60%', y: '50%', w: '30%', h: '44%', r: -6 },
];

export default function StainedGlassVerse() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-pane]'), { autoAlpha: 1 });
        gsap.set(q('[data-glass-verse]'), { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // panes drift slowly across as coloured light
        gsap.utils.toArray<HTMLElement>(q('[data-pane]')).forEach((pane, i) => {
          gsap.fromTo(
            pane,
            { xPercent: i % 2 ? -14 : 14, yPercent: -8, autoAlpha: 0.4 },
            {
              xPercent: i % 2 ? 10 : -10,
              yPercent: 8,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            },
          );
        });

        gsap.fromTo(
          q('[data-glass-verse]'),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.6,
            ease: 'power3.out',
            stagger: 0.4,
            scrollTrigger: { trigger: root.current, start: 'top 50%' },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ivory px-6 py-40 text-charcoal"
    >
      {/* translucent coloured panes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {panes.map((p, i) => (
          <div
            key={i}
            data-pane
            className="absolute rounded-[4px]"
            style={{
              left: p.x,
              top: p.y,
              width: p.w,
              height: p.h,
              background: p.c,
              transform: `rotate(${p.r}deg)`,
              filter: 'blur(30px)',
              mixBlendMode: 'multiply',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <p data-glass-verse className="font-display text-4xl leading-tight text-charcoal md:text-7xl">
          &ldquo;{scriptures.ruth.line}&rdquo;
        </p>
        <p data-glass-verse className="eyebrow mt-10 text-champagne">
          {scriptures.ruth.ref}
        </p>
      </div>
    </section>
  );
}
