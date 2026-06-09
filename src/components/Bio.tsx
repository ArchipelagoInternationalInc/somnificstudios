export default function Bio() {
  return (
    <div id="about" className="bio-frame reveal">
      <div className="bio">
        <div className="bio-text">
          <h3>Madelyn</h3>
          <p>
            Madelyn is the dreamer behind Somnific Studios. A lifelong night owl and
            lucid-dream wanderer, she composes each scene as a doorway out of the
            noise — part lullaby, part landscape. When she isn&rsquo;t building worlds to
            fall asleep to, she&rsquo;s somewhere collecting moons.
          </p>
        </div>
        <div className="bio-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/madelyn.jpg"
            alt="Madelyn, founder of Somnific Studios"
            width={248}
            height={339}
          />
        </div>
      </div>
    </div>
  );
}
