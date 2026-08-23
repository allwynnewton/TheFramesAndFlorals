'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Photo from './Photo';
import { couple, scriptures } from '@/lib/site';

export default function FinalBlessing() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-fb]'), { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          q('[data-fb-img]'),
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );

        gsap.fromTo(
          q('[data-fb]'),
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: { trigger: root.current, start: 'top 45%' },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden bg-charcoal" data-music-vol="0.25">
      <div data-fb-img className="absolute inset-0">
        <Photo
          src={undefined}
          alt="The couple walking away into the evening light"
          tone="wine"
          seed={71}
          style={{ position: 'absolute', inset: 0 }}
          sizes="100vw"
        />
      </div>
      {/* darken toward the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/60 to-charcoal" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center text-ivory">
        <h2 data-fb className="display-md text-ivory">
          THANK YOU
          <br />
          FOR BEING PART OF
          <br />
          OUR STORY.
        </h2>

        <p data-fb className="mt-8 max-w-md font-serif-e text-lg text-ivory/75 md:text-xl">
          We cannot wait to celebrate this blessing with you.
        </p>

        <p data-fb className="font-script mt-10 text-4xl text-champagne md:text-5xl">
          {couple.groom} &amp; {couple.bride}
        </p>

        <div data-fb className="mt-16 max-w-lg">
          <p className="font-display text-xl italic leading-snug text-ivory/70 md:text-2xl">
            &ldquo;The Lord has done great things for us,
            <br />
            and we are filled with joy.&rdquo;
          </p>
          <p className="eyebrow mt-6 text-champagne">{scriptures.psalm.ref}</p>
        </div>
      </div>
    </section>
  );
}
