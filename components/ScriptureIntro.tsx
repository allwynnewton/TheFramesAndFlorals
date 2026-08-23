'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { scriptures } from '@/lib/site';

export default function ScriptureIntro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const lines = gsap.utils.selector(root)('[data-line]');

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(lines, { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(lines, { autoAlpha: 0, y: 22 });
        gsap.to(lines, {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.9,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 60%',
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="flex min-h-[90vh] flex-col items-center justify-center bg-ivory px-6 py-40 text-charcoal"
    >
      <span className="fineline-cross mb-16" data-line aria-hidden />
      <div className="max-w-3xl text-center">
        {scriptures.love.lines.map((line, i) => (
          <p
            key={i}
            data-line
            className="font-display text-3xl leading-tight text-charcoal/90 md:text-5xl"
          >
            {line}
          </p>
        ))}
        <p data-line className="eyebrow mt-14 text-champagne">
          {scriptures.love.ref}
        </p>
      </div>
    </section>
  );
}
