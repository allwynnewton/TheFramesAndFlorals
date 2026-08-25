'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import Photo from './Photo';
import { couple, photos } from '@/lib/site';

export default function BrideAndGroom() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-half="left"]'), { xPercent: 0, autoAlpha: 1 });
        gsap.set(q('[data-half="right"]'), { xPercent: 0, autoAlpha: 1 });
        gsap.set(q('[data-bg-name]'), { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: 'top 65%' },
          })
          .fromTo(
            q('[data-half="left"]'),
            { xPercent: -18, autoAlpha: 0 },
            { xPercent: 0, autoAlpha: 1, duration: 1.5, ease: 'power3.out' },
          )
          .fromTo(
            q('[data-half="right"]'),
            { xPercent: 18, autoAlpha: 0 },
            { xPercent: 0, autoAlpha: 1, duration: 1.5, ease: 'power3.out' },
            '<',
          )
          .fromTo(
            q('[data-bg-name]'),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.2 },
            '-=0.6',
          );
      });

      // desktop-only subtle mouse parallax (max ~10px)
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const imgs = gsap.utils.toArray<HTMLElement>(q('[data-parallax-img]'));
        const xTo = imgs.map((el) =>
          gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
        );
        const yTo = imgs.map((el) =>
          gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
        );

        const onMove = (e: MouseEvent) => {
          const rx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
          const ry = (e.clientY / window.innerHeight - 0.5) * 2;
          imgs.forEach((_, i) => {
            const dir = i === 0 ? 1 : -1;
            xTo[i](rx * 10 * dir);
            yTo[i](ry * 8);
          });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
      });
    },
    { scope: root },
  );

  const people = [
    { name: couple.bride, role: 'The Bride', tone: 'wine' as const, side: 'left' as const, seed: 41, img: photos.bride },
    { name: couple.groom, role: 'The Groom', tone: 'forest' as const, side: 'right' as const, seed: 42, img: photos.groom },
  ];

  return (
    <section ref={root} className="grid grid-cols-1 overflow-hidden bg-blush md:grid-cols-2">
      {people.map((p) => (
        <div
          key={p.name}
          data-half={p.side}
          className="relative flex h-[70vh] flex-col justify-end md:h-screen"
        >
          <div data-parallax-img className="absolute inset-0 scale-[1.06]">
            <Photo
              src={p.img}
              alt={`${p.name} — ${p.role}`}
              tone={p.tone}
              label={p.role}
              seed={p.seed}
              style={{ position: 'absolute', inset: 0 }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          <div className="relative z-10 p-10 text-center md:p-16">
            <p data-bg-name className="font-script text-5xl text-rose md:text-6xl">
              {p.name}
            </p>
            <p data-bg-name className="eyebrow mt-3 text-ivory/70">
              {p.role}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
