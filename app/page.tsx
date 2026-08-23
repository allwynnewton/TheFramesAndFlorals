'use client';

import MusicProvider from '@/components/audio/MusicProvider';
import Experience from '@/components/Experience';

export default function Home() {
  return (
    <MusicProvider>
      <Experience />
    </MusicProvider>
  );
}
