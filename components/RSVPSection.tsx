'use client';

import { FormEvent, useState } from 'react';
import Reveal from './Reveal';
import { couple } from '@/lib/site';

type Status = 'idle' | 'accept' | 'decline';

const fieldClass =
  'w-full border-0 border-b border-ink/25 bg-transparent py-3 font-serif-e text-lg text-ink placeholder-ink/40 outline-none transition-colors focus:border-mauve';

export default function RSVPSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [decision, setDecision] = useState<'accept' | 'decline' | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>, choice: 'accept' | 'decline') {
    e.preventDefault();
    // Wire this up to your backend / form service (e.g. an API route or Formspree).
    // For now it resolves to a graceful on-page confirmation.
    setDecision(choice);
    setStatus(choice);
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-mist px-6 py-32 text-ink" data-music-vol="0.3">
      <div className="w-full max-w-2xl">
        <Reveal className="text-center">
          <p className="eyebrow text-mauve">Kindly respond by 1 December 2026</p>
          <h2 className="display-lg mt-6 text-ink">
            WILL YOU
            <br />
            JOIN US?
          </h2>
        </Reveal>

        {status !== 'idle' ? (
          <Reveal className="mt-16 text-center">
            <span className="fineline-cross mx-auto mb-8" aria-hidden />
            <p className="font-display text-3xl text-mauve md:text-4xl">
              {decision === 'accept'
                ? 'With all our hearts, thank you.'
                : 'You will be dearly missed.'}
            </p>
            <p className="mt-4 font-serif-e text-lg text-ink/70">
              {decision === 'accept'
                ? `${couple.groom} & ${couple.bride} can’t wait to celebrate with you.`
                : 'Thank you for letting us know — you’ll be in our prayers.'}
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <form className="mt-16 space-y-10" onSubmit={(e) => handleSubmit(e, 'accept')}>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <label className="block">
                  <span className="eyebrow text-ink/60">Name</span>
                  <input required name="name" className={fieldClass} placeholder="Your full name" />
                </label>
                <label className="block">
                  <span className="eyebrow text-ink/60">Number of guests</span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    defaultValue={1}
                    name="guests"
                    className={fieldClass}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <label className="block">
                  <span className="eyebrow text-ink/60">Attending Ceremony?</span>
                  <select name="ceremony" className={`${fieldClass} appearance-none`}>
                    <option className="bg-mist">Yes, joyfully</option>
                    <option className="bg-mist">Unable to</option>
                  </select>
                </label>
                <label className="block">
                  <span className="eyebrow text-ink/60">Attending Reception?</span>
                  <select name="reception" className={`${fieldClass} appearance-none`}>
                    <option className="bg-mist">Yes, joyfully</option>
                    <option className="bg-mist">Unable to</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="eyebrow text-ink/60">Dietary notes</span>
                <input name="dietary" className={fieldClass} placeholder="Anything we should know" />
              </label>

              <div className="flex flex-col items-center gap-6 pt-6 sm:flex-row sm:justify-center">
                <button type="submit" className="btn-ghost text-ink">
                  Joyfully Accept
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    const form = (e.currentTarget.closest('form') as HTMLFormElement);
                    handleSubmit(
                      { preventDefault: () => {}, currentTarget: form } as unknown as FormEvent<HTMLFormElement>,
                      'decline',
                    );
                  }}
                  className="text-xs uppercase tracking-[0.28em] text-ink/50 underline-offset-8 transition-colors hover:text-ink/80 hover:underline"
                >
                  Regretfully Decline
                </button>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
