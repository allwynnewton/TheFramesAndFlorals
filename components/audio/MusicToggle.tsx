'use client';

import { useMusic } from './MusicProvider';

/**
 * MusicToggle — a tiny, persistent, elegant control (bottom-right).
 * Playing: three gently animated bars. Paused: a dimmed ♪.
 * Not a media player: no play/pause glyphs, progress, duration or artwork.
 */
export default function MusicToggle() {
  const { hasEntered, isPlaying, toggle } = useMusic();

  if (!hasEntered) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      aria-pressed={isPlaying}
      className="music-control"
    >
      {isPlaying ? (
        <span className="wave" aria-hidden>
          <span className="wave-bar" style={{ animationDuration: '0.8s' }} />
          <span className="wave-bar" style={{ animationDuration: '1s' }} />
          <span className="wave-bar" style={{ animationDuration: '0.7s' }} />
        </span>
      ) : (
        <span className="music-note" aria-hidden>
          ♪
        </span>
      )}
    </button>
  );
}
