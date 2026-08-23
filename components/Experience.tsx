'use client';

import { useState, useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

import WeddingLoader from '@/components/WeddingLoader';
import ChurchDoorHero from '@/components/ChurchDoorHero';
import ScriptureIntro from '@/components/ScriptureIntro';
import OurStory from '@/components/OurStory';
import ParallaxMemories from '@/components/ParallaxMemories';
import ProposalSequence from '@/components/ProposalSequence';
import WeddingAnnouncement from '@/components/WeddingAnnouncement';
import WeddingDate from '@/components/WeddingDate';
import ChurchCinematicSection from '@/components/ChurchCinematicSection';
import StainedGlassVerse from '@/components/StainedGlassVerse';
import BrideAndGroom from '@/components/BrideAndGroom';
import MemoryGallery from '@/components/MemoryGallery';
import CovenantSection from '@/components/CovenantSection';
import ReceptionSection from '@/components/ReceptionSection';
import WeddingCountdown from '@/components/WeddingCountdown';
import WeddingDetails from '@/components/WeddingDetails';
import RSVPSection from '@/components/RSVPSection';
import FinalBlessing from '@/components/FinalBlessing';
import Footer from '@/components/Footer';

import { useMusic } from '@/components/audio/MusicProvider';
import EntryGate from '@/components/audio/EntryGate';
import MusicToggle from '@/components/audio/MusicToggle';
import VolumeAutomation from '@/components/audio/VolumeAutomation';
import CreatorSection from '@/components/creator/CreatorSection';
import CreatorCTA from '@/components/creator/CreatorCTA';

export default function Experience() {
  const [loading, setLoading] = useState(true);
  const { hasEntered } = useMusic();

  // Scroll stays locked through the loader AND the entry invitation.
  useEffect(() => {
    const locked = loading || !hasEntered;
    document.body.style.overflow = locked ? 'hidden' : '';
    if (!locked) {
      window.scrollTo(0, 0);
      // pin/scrub triggers were measured behind overlays; recompute now.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading, hasEntered]);

  return (
    <>
      {loading && <WeddingLoader onDone={() => setLoading(false)} />}
      {!loading && <EntryGate />}

      <main className="relative">
        <ChurchDoorHero />
        <ScriptureIntro />
        <OurStory />
        <ParallaxMemories />
        <ProposalSequence />
        <WeddingAnnouncement />
        <WeddingDate />
        <ChurchCinematicSection />
        <StainedGlassVerse />
        <BrideAndGroom />
        <MemoryGallery />
        <CovenantSection />
        <ReceptionSection />
        <WeddingCountdown />
        <WeddingDetails />
        <RSVPSection />
        <FinalBlessing />
        <Footer />
        <CreatorSection />
      </main>

      <MusicToggle />
      <CreatorCTA />
      <VolumeAutomation />
    </>
  );
}
