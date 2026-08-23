'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { couple, wedding, music } from '@/lib/site';

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-foot]'), { autoAlpha: 1, y: 0 });
        gsap.set(q('[data-glow]'), { autoAlpha: 1, scale: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%' } })
          .fromTo(
            q('[data-glow]'),
            { autoAlpha: 0, scale: 0.4 },
            { autoAlpha: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
          )
          .fromTo(
            q('[data-foot]'),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 1.4, ease: 'power3.out', stagger: 0.25 },
            '-=1',
          );

        // a slow, living breath on the light — no page auto-scroll
        gsap.to(q('[data-glow]'), {
          scale: 1.12,
          opacity: 0.9,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    },
    { scope: root },
  );

  return (
    <footer
      ref={root}
      className="relative flex min-h-[80vh] flex-col items-center justify-center bg-charcoal px-6 py-32 text-center"
    >
      {/* a single point of warm light with a fine cross at its heart */}
      <div className="relative mb-16 flex h-24 w-24 items-center justify-center">
        <span
          data-glow
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(246,240,231,0.9) 0%, rgba(199,167,106,0.5) 35%, transparent 70%)',
            filter: 'blur(6px)',
          }}
          aria-hidden
        />
        <span className="fineline-cross relative z-10" aria-hidden />
      </div>

      <p data-foot className="font-display text-3xl tracking-wide text-ivory md:text-4xl">
        {couple.groom.toUpperCase()} &amp; {couple.bride.toUpperCase()}
      </p>
      <p data-foot className="eyebrow mt-5 text-champagne">
        {wedding.dateShort}
      </p>

      {music.track && (
        <p data-foot className="mt-10 text-[0.58rem] tracking-[0.2em] text-ivory/25">
          Music: {music.track}
          {music.artist ? ` — ${music.artist}` : ''}
        </p>
      )}

      <p data-foot className="mt-6 text-[0.6rem] uppercase tracking-[0.3em] text-ivory/30">
        Made with love &amp; prayer
      </p>
    </footer>
  );
}
