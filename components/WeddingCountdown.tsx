'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import Reveal from './Reveal';
import { wedding } from '@/lib/site';

function diff(target: number) {
  const now = Date.now();
  let d = Math.max(0, target - now);
  const days = Math.floor(d / 86400000);
  d -= days * 86400000;
  const hours = Math.floor(d / 3600000);
  d -= hours * 3600000;
  const minutes = Math.floor(d / 60000);
  d -= minutes * 60000;
  const seconds = Math.floor(d / 1000);
  return { days, hours, minutes, seconds };
}

function Unit({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value && ref.current) {
      // graceful rise, not a digital flip
      gsap.fromTo(
        ref.current,
        { y: '-0.35em', autoAlpha: 0 },
        { y: '0em', autoAlpha: 1, duration: 0.7, ease: 'power3.out' },
      );
      prev.current = value;
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <span className="overflow-hidden leading-none">
        <span
          ref={ref}
          className="block font-display text-[18vw] leading-none text-ivory md:text-[9vw]"
        >
          {String(value).padStart(2, '0')}
        </span>
      </span>
      <span className="eyebrow mt-4 text-champagne">{label}</span>
    </div>
  );
}

export default function WeddingCountdown() {
  const target = useRef(new Date(wedding.dateISO).getTime());
  // Start at zeros so server and first client render match; fill in on mount.
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setT(diff(target.current));
    const id = setInterval(() => setT(diff(target.current)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center bg-charcoal px-6 py-32 text-center">
      <Reveal>
        <p className="eyebrow text-champagne">Until Forever</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-14 w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-x-10 gap-y-14 md:grid-cols-4 md:gap-x-6">
          <Unit value={t.days} label="Days" />
          <Unit value={t.hours} label="Hours" />
          <Unit value={t.minutes} label="Minutes" />
          <Unit value={t.seconds} label="Seconds" />
        </div>
      </Reveal>
    </section>
  );
}
