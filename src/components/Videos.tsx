const VIDEOS = [
  { src: "/assets/vid05.jpg", title: "Above the Clouds",  href: "#" },
  { src: "/assets/vid01.jpg", title: "Still Water",       href: "#" },
  { src: "/assets/vid03.jpg", title: "Crimson Moon",      href: "#" },
  { src: "/assets/vid04.jpg", title: "Salt & Silence",    href: "#" },
  { src: "/assets/vid06.jpg", title: "Evening Tide",      href: "#" },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default function Videos() {
  return (
    <div id="videos" className="reveal">
      <h2 className="section-label">Start your journey here</h2>
      <p className="section-sub">Drift through our latest somnific experiences.</p>

      <div className="videos">
        {VIDEOS.map((v) => (
          <a
            key={v.title}
            className="vid"
            href={v.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch ${v.title} on YouTube`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={v.src} alt={v.title} loading="lazy" />
            <span className="play">
              <PlayIcon />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
