export default function AboutMadelyn() {
  return (
    <section id="about" className="relative bg-content-bg py-28 md:py-36 px-6 overflow-hidden">
      {/* Atmospheric side glow */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 85% 50%, hsl(230 40% 22% / 0.5) 0%, transparent 70%)",
        }}
      />

      {/* Thin top divider */}
      <div
        className="absolute top-0 inset-x-0 max-w-5xl mx-auto h-px"
        style={{ background: "hsl(var(--foreground) / 0.07)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* ── Photo ── */}
        <div className="order-2 md:order-1 flex justify-center md:justify-start">
          <div
            className="relative w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden"
            style={{ background: "hsl(225 45% 16%)" }}
          >
            {/* Placeholder shimmer suggestion */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 35%, hsl(230 40% 22%) 0%, transparent 80%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-20">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                style={{ color: "hsl(var(--foreground))" }}
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <p
                className="font-body text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "hsl(var(--foreground))" }}
              >
                photo arriving
              </p>
            </div>
          </div>
        </div>

        {/* ── Text ── */}
        <div className="order-1 md:order-2">
          <p
            className="font-script text-xl mb-5"
            style={{ color: "hsl(var(--primary))", opacity: 0.9 }}
          >
            about
          </p>

          <h2
            className="font-display font-thin uppercase leading-tight mb-10"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "0.15em",
              color: "hsl(var(--foreground))",
            }}
          >
            Madelyn
            <br />
            Greco
          </h2>

          <p
            className="font-body font-light text-base leading-[1.9] mb-4"
            style={{ color: "hsl(var(--foreground))", opacity: 0.65 }}
          >
            Madelyn Greco is the voice behind Somnific Studios — a sanctuary for the restless,
            the dreamers, and anyone searching for a gentler way into the night. She creates
            guided sleep sessions, meditations, and quiet-world content for people who need
            the night to feel less alone.
          </p>

          <p
            className="font-body font-light text-base leading-[1.9]"
            style={{ color: "hsl(var(--foreground))", opacity: 0.65 }}
          >
            Her work is personal, unhurried, and offered with care — the kind of presence
            that feels like someone sitting with you in the dark until sleep finally arrives.
          </p>

          <p
            className="font-body text-[10px] tracking-[0.3em] uppercase mt-8 opacity-25"
            style={{ color: "hsl(var(--foreground))" }}
          >
            — bio confirmed by Madelyn arriving —
          </p>
        </div>
      </div>
    </section>
  );
}
