'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { wedding } from '@/lib/site';

export default function WeddingDate() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([q('[data-d28]'), q('[data-dmonth]'), q('[data-d2026]')], { autoAlpha: 0 });
        gsap.set(q('[data-combined]'), { autoAlpha: 1, scale: 1 });
        gsap.set(q('[data-daytime]'), { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(q('[data-d28]'), { autoAlpha: 0, scale: 1.4 });
        gsap.set(q('[data-dmonth]'), { autoAlpha: 0, xPercent: 60 });
        gsap.set(q('[data-d2026]'), { autoAlpha: 0, scale: 0.7 });
        gsap.set(q('[data-combined]'), { autoAlpha: 0, scale: 0.9 });
        gsap.set(q('[data-daytime]'), { autoAlpha: 0, y: 30 });

        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
          },
        });

        tl.to('[data-d28]', { autoAlpha: 1, scale: 1, duration: 1.2 })
          .to('[data-dmonth]', { autoAlpha: 1, xPercent: 0, duration: 1.4 }, 1)
          .to('[data-d2026]', { autoAlpha: 1, scale: 1, duration: 1.2 }, 2)
          // dissolve the stacked words, resolve to the compact date
          .to(['[data-d28]', '[data-dmonth]', '[data-d2026]'], {
            autoAlpha: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power2.in',
          }, 3.4)
          .to('[data-combined]', { autoAlpha: 1, scale: 1, duration: 1.2 }, 4)
          .to('[data-daytime]', { autoAlpha: 1, y: 0, duration: 1 }, 4.6);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-charcoal text-ivory"
    >
      {/* stacked words */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span data-d28 className="display-xl leading-none text-ivory">
          28
        </span>
        <span
          data-dmonth
          className="font-display text-[12vw] uppercase tracking-[0.1em] text-champagne md:text-[7vw]"
        >
          December
        </span>
        <span data-d2026 className="display-xl leading-none text-ivory">
          2026
        </span>
      </div>

      {/* resolved compact date */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <span data-combined className="display-lg text-champagne">
          {wedding.dateShort}
        </span>
        <div data-daytime className="flex items-center gap-6 text-ivory/80">
          <span className="eyebrow">{wedding.day}</span>
          <span className="h-4 w-px bg-champagne/60" />
          <span className="eyebrow">{wedding.time}</span>
        </div>
      </div>
    </section>
  );
}
