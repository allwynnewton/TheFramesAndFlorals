'use client';

import { useMusic } from '@/components/audio/MusicProvider';
import { creator, whatsappEnquiryUrl } from '@/lib/site';

/**
 * CreatorCTA — a subtle floating enquiry pill (bottom-left).
 * Default: "♡ Create a story like this". Desktop hover reveals the brand +
 * "Enquire on WhatsApp →" as a small tooltip so the pill stays compact.
 * Appears only once the visitor has entered the experience.
 */
export default function CreatorCTA() {
  const { hasEntered } = useMusic();
  if (!hasEntered) return null;

  const url = whatsappEnquiryUrl();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${creator.brand} · Enquire on WhatsApp`}
      aria-label={`${creator.brand} — enquire on WhatsApp to create a wedding website like this`}
      className="creator-cta group"
    >
      <span className="creator-cta-tip" aria-hidden>
        {creator.brand}
        <span className="mt-1 block text-champagne">Enquire on WhatsApp →</span>
      </span>
      <span className="creator-cta-heart" aria-hidden>
        ♡
      </span>
      Create a story like this
    </a>
  );
}
