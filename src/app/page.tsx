import Nav          from "@/components/Nav";
import Hero         from "@/components/Hero";
import Tagline      from "@/components/Tagline";
import WhatWeDo     from "@/components/WhatWeDo";
import Videos       from "@/components/Videos";
import SleepQuiz    from "@/components/SleepQuiz";
import DreamWidget  from "@/components/DreamWidget";
import SoundPlayer  from "@/components/SoundPlayer";
import Bio          from "@/components/Bio";
import SocialProof  from "@/components/SocialProof";
import Newsletter   from "@/components/Newsletter";
import Footer       from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Scroll reveal — client component, mounts invisibly */}
      <ScrollReveal />

      {/* ── STICKY NAV ── */}
      <Nav />

      {/* ── HERO ── periwinkle zone */}
      <Hero />

      {/* ── TAGLINE ── */}
      <Tagline />

      {/* ── WHAT WE DO ── still on periwinkle */}
      <WhatWeDo />

      {/* ── DARK PANEL ── navy zone: everything below fades to deep navy */}
      <section className="panel">
        <div className="wrap">

          {/* §5  YouTube grid */}
          <Videos />

          {/* §6  Sleep Personality Quiz */}
          <SleepQuiz />

          {/* §7  Tonight's Dream Widget */}
          <DreamWidget />

          {/* §8  Sound Preview Player */}
          <SoundPlayer />

          {/* §9  About Madelyn */}
          <Bio />

          {/* §10 Social Proof Strip */}
          <SocialProof />

          {/* §11 Newsletter */}
          <Newsletter />

        </div>
      </section>

      {/* ── FOOTER ── back on periwinkle */}
      <Footer />
    </>
  );
}
