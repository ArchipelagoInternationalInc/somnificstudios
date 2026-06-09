export default function Hero() {
  return (
    <header id="home" className="hero">
      <div className="hero-dream">
        <div className="hero-glow" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="hero-img"
          src="/assets/hero-title-clean.png"
          alt="Somnific Studios — a bed floating beneath a glowing cloud and crescent moon"
          width={1052}
          height={819}
        />
      </div>
    </header>
  );
}
