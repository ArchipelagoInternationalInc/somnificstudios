/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor */
const { useState, useEffect, useRef } = React;

/* ---------- data ---------- */
const VIDEOS = [
  { src: "assets/vid05.jpg", title: "Above the Clouds", href: "#" },
  { src: "assets/vid01.jpg", title: "Still Water", href: "#" },
  { src: "assets/vid03.jpg", title: "Crimson Moon", href: "#" },
  { src: "assets/vid04.jpg", title: "Salt & Silence", href: "#" },
  { src: "assets/vid06.jpg", title: "Evening Tide", href: "#" },
];

const SOCIALS = [
  { name: "Facebook",  href: "#", path: "M22 12.06C22 6.5 17.52 2 11.94 2 6.36 2 1.88 6.5 1.88 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.78v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.45-4.94 8.45-9.94Z" },
  { name: "Instagram", href: "#", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.52.01-4.76.07-.93.04-1.43.2-1.77.33-.44.17-.76.38-1.1.71-.33.34-.54.66-.71 1.1-.13.34-.29.84-.33 1.77-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04.93.2 1.43.33 1.77.17.44.38.76.71 1.1.34.33.66.54 1.1.71.34.13.84.29 1.77.33 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c.93-.04 1.43-.2 1.77-.33.44-.17.76-.38 1.1-.71.33-.34.54-.66.71-1.1.13-.34.29-.84.33-1.77.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-.93-.2-1.43-.33-1.77a2.98 2.98 0 0 0-.71-1.1 2.98 2.98 0 0 0-1.1-.71c-.34-.13-.84-.29-1.77-.33-1.24-.06-1.61-.07-4.76-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.5-.16a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0Z" },
  { name: "Pinterest", href: "#", path: "M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2 .03-2.86.18-.78 1.18-4.97 1.18-4.97s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.57 0-2.39-1.72-4.06-4.17-4.06-2.84 0-4.51 2.13-4.51 4.33 0 .86.33 1.78.74 2.28.08.1.09.19.07.29-.08.32-.25 1-.28 1.14-.04.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.47 0 6.16 2.47 6.16 5.77 0 3.45-2.17 6.22-5.19 6.22-1.01 0-1.97-.53-2.29-1.15l-.62 2.37c-.23.86-.83 1.95-1.24 2.61.94.29 1.92.44 2.95.44 5.52 0 10-4.48 10-10S17.52 2 12 2Z" },
  { name: "Patreon",   href: "#", path: "M14.82 2.41c-4.1 0-7.43 3.33-7.43 7.43 0 4.09 3.33 7.41 7.43 7.41 4.08 0 7.4-3.32 7.4-7.41 0-4.1-3.32-7.43-7.4-7.43ZM2 21.6h3.63V2.41H2V21.6Z" },
];

/* ---------- icons ---------- */
const PlayIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);

/* ---------- hero ---------- */
function Hero({ variant }) {
  if (variant === "horizon") {
    return (
      <header className="hero">
        <div className="wrap">
          <div className="hero-horizon">
            <div className="hero-horizon-media">
              <img src="assets/sleeper.png" alt="A dreamer adrift on a still sea beneath a rose-gold sky" />
              <div className="hero-horizon-overlay">
                <div className="wordmark">
                  <span className="w1">somnific</span>
                  <span className="w2">studios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="hero">
      <div className="hero-dream">
        <div className="hero-glow" aria-hidden="true"></div>
        <img className="hero-img" src="assets/hero-title-clean.png"
             alt="Somnific Studios — a bed beneath a glowing cloud and crescent moon" />
      </div>
    </header>
  );
}

/* ---------- tagline ---------- */
function Tagline() {
  return (
    <section className="tagline reveal">
      <div className="wrap">
        <h1>Serenity Through Sleep</h1>
        <p>
          Somnific Studios crafts immersive dreamscapes — ambient films and sleep
          stories made to quiet the mind, soften the night, and carry you gently
          into rest. Press play, dim the lights, and let the day dissolve.
        </p>
      </div>
    </section>
  );
}

/* ---------- videos ---------- */
function Videos({ layout }) {
  return (
    <div className="reveal">
      <h2 className="section-label">YouTube</h2>
      <p className="section-sub">Drift through our latest visual journeys.</p>
      <div className={"videos" + (layout === "featured" ? " featured" : "")}>
        {VIDEOS.map((v, i) => (
          <a className="vid" key={i} href={v.href} target="_blank" rel="noreferrer"
             aria-label={"Watch " + v.title + " on YouTube"}>
            <img src={v.src} alt={v.title} loading="lazy" />
            <span className="play"><PlayIcon /></span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------- bio ---------- */
function Bio() {
  return (
    <div className="bio-frame reveal">
      <div className="bio">
        <div className="bio-text">
          <h3>Madelyn</h3>
          <p>
            Madelyn is the dreamer behind Somnific Studios. A lifelong night owl and
            lucid-dream wanderer, she composes each scene as a doorway out of the
            noise — part lullaby, part landscape. When she isn't building worlds to
            fall asleep to, she's somewhere collecting moons.
          </p>
        </div>
        <div className="bio-photo">
          <img src="assets/madelyn.jpg" alt="Madelyn, founder of Somnific Studios" />
        </div>
      </div>
    </div>
  );
}

/* ---------- newsletter ---------- */
function Newsletter() {
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); setDone(true); };
  return (
    <div className="closer">
      <div className="news reveal">
        <h3>Newsletter</h3>
        <p>Join the dream. New releases, sleep rituals, and quiet moments —
           delivered softly, never often.</p>
        <form onSubmit={submit}>
          <input type="text" placeholder="Your name" aria-label="Your name" />
          <input type="email" placeholder="Your email" aria-label="Your email" required />
          <button type="submit">Subscribe</button>
          <span className="ok">{done ? "Sweet dreams — you're on the list ✦" : ""}</span>
        </form>
      </div>
      <div className="dreamer" aria-hidden="true">
        <img src="assets/dreamer.png" alt="" />
      </div>
    </div>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="foot reveal">
      <div className="wrap">
        <div className="fmark">somnific studios</div>
        <nav className="socials" aria-label="Social media">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24"><path d={s.path} /></svg>
            </a>
          ))}
        </nav>
        <div className="fine">© {new Date().getFullYear()} Somnific Studios · Serenity through sleep</div>
      </div>
    </footer>
  );
}

/* ---------- app ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "dream",
  "videoLayout": "grid",
  "labels": "handwritten",
  "background": "periwinkle",
  "accent": "gold",
  "motion": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  /* push tweak state onto <body> data-attrs for CSS */
  useEffect(() => {
    const b = document.body;
    b.dataset.bg = t.background;
    b.dataset.accent = t.accent;
    b.dataset.labels = t.labels;
    b.dataset.motion = t.motion ? "on" : "off";
  }, [t.background, t.accent, t.labels, t.motion]);

  /* scroll reveal — fail-safe: gate the hidden state behind .anim-ready, mark
     anything already in view immediately, and guarantee a fallback reveal. */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (prefersReduced) { els.forEach((el) => el.classList.add("in")); return; }

    document.body.classList.add("anim-ready");

    const showIfNear = (el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add("in");
    };
    els.forEach(showIfNear);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => { if (!el.classList.contains("in")) io.observe(el); });

    const onScroll = () => els.forEach(showIfNear);
    window.addEventListener("scroll", onScroll, { passive: true });
    const fallback = setTimeout(() => els.forEach((el) => el.classList.add("in")), 2000);

    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); clearTimeout(fallback); };
  }, [t.videoLayout, t.hero]);

  return (
    <React.Fragment>
      <Hero variant={t.hero} />
      <Tagline />
      <section className="panel">
        <div className="wrap">
          <Videos layout={t.videoLayout} />
          <Bio />
          <Newsletter />
        </div>
      </section>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Layout" />
        <TweakRadio label="Hero" value={t.hero}
          options={["dream", "horizon"]}
          onChange={(v) => setTweak("hero", v)} />
        <TweakRadio label="Videos" value={t.videoLayout}
          options={["grid", "featured"]}
          onChange={(v) => setTweak("videoLayout", v)} />
        <TweakRadio label="Labels" value={t.labels}
          options={["handwritten", "geometric"]}
          onChange={(v) => setTweak("labels", v)} />
        <TweakSection label="Atmosphere" />
        <TweakRadio label="Background" value={t.background}
          options={["periwinkle", "twilight"]}
          onChange={(v) => setTweak("background", v)} />
        <TweakColor label="Glow" value={t.accent === "gold" ? "#ffe9b0" : t.accent === "lavender" ? "#d7c8ff" : "#ffc6da"}
          options={["#ffe9b0", "#d7c8ff", "#ffc6da"]}
          onChange={(hex) => setTweak("accent", hex === "#ffe9b0" ? "gold" : hex === "#d7c8ff" ? "lavender" : "rose")} />
        <TweakToggle label="Ambient motion" value={t.motion}
          onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
