const PILLARS = [
  {
    title: "Sleep",
    body: "Cinematic soundscapes and slow-dissolving visuals built to carry you across the threshold — from the noise of the day into the quiet of the night.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    title: "Meditation",
    body: "Breath-paced sessions for stillness, not performance. No mantras, no goals — just the gentle invitation to arrive exactly where you are.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2"  x2="12" y2="5.5"  />
        <line x1="12" y1="18.5" x2="12" y2="22" />
        <line x1="2"  y1="12" x2="5.5"  y2="12" />
        <line x1="18.5" y1="12" x2="22" y2="12" />
        <line x1="5.64" y1="5.64" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="18.36" y2="18.36" />
        <line x1="5.64" y1="18.36" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="18.36" y2="5.64" />
      </svg>
    ),
  },
  {
    title: "Dream",
    body: "Explorations of the liminal — the half-world between waking and sleep where imagination loosens and something softer takes over.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.09 6.42L20.18 10l-4.97 4.84L16.18 21 12 18.18 7.82 21l1.97-6.16L4.82 10l6.09-1.58L12 2z" />
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="what-we-do reveal">
      <div className="wrap">
        <div className="wwd-grid">
          {PILLARS.map((p) => (
            <div key={p.title} className="wwd-card">
              <div className="wwd-icon" aria-hidden="true">{p.icon}</div>
              <h3 className="wwd-title">{p.title}</h3>
              <p  className="wwd-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
