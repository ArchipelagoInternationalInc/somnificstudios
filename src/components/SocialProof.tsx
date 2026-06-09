/* Static — manually updated when Madelyn gets real viewer numbers/quotes. */
const QUOTE = "I've struggled with sleep for years. Madelyn's voice is the only thing that reliably quiets my mind. I listen every single night.";
const ATTRIBUTION = "a viewer";
const SUBSCRIBER_COUNT = ""; // e.g. "47,000" — leave empty until confirmed

export default function SocialProof() {
  return (
    <div id="social-proof" className="social-proof reveal">
      <blockquote className="sp-quote">&ldquo;{QUOTE}&rdquo;</blockquote>
      <p className="sp-attribution">— {ATTRIBUTION}</p>
      {SUBSCRIBER_COUNT && (
        <p className="sp-count">{SUBSCRIBER_COUNT} subscribers on YouTube</p>
      )}
    </div>
  );
}
