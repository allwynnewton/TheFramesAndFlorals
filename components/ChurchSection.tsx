'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Photo from './Photo';
import { wedding } from '@/lib/site';

export default function ChurchSection() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-church-img]'), { scale: 1 });
        gsap.set(q('[data-church-copy]'), { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // slow zoom-out as the visitor scrolls through
        gsap.fromTo(
          q('[data-church-img]'),
          { scale: 1.35 },
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
          q('[data-church-copy]'),
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.3,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: { trigger: root.current, start: 'top 45%' },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[110vh] overflow-hidden bg-blush">
      <div data-church-img className="absolute inset-0">
        <Photo
          src={undefined}
          alt="The church where the ceremony will take place"
          tone="forest"
          label="the church"
          seed={31}
          style={{ position: 'absolute', inset: 0 }}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory">
        <p data-church-copy className="eyebrow text-rose">
          {wedding.ceremony.title}
        </p>
        <h2 data-church-copy className="display-md mt-6 text-ivory">
          {wedding.ceremony.venue}
        </h2>
        <p data-church-copy className="mt-4 font-serif-e text-xl text-ivory/75">
          {wedding.ceremony.time} · {wedding.ceremony.place}
        </p>
        <a
          data-church-copy
          href={wedding.ceremony.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-10 text-ivory"
        >
          View Location
        </a>
      </div>
    </section>
  );
}
