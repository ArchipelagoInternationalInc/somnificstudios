"use client";

import { useState } from "react";

/* ── Questions ─────────────────────────────────────────────────────────── */
const QUESTIONS = [
  {
    id: "arrival",
    text: "What brings you here tonight?",
    options: [
      { value: "anxious",   label: "My mind won't quiet down" },
      { value: "restless",  label: "I wake in the night and can't return" },
      { value: "carrying",  label: "I'm carrying something heavy" },
      { value: "curious",   label: "I'm simply seeking stillness" },
    ],
  },
  {
    id: "sound",
    text: "Your ideal sleep landscape?",
    options: [
      { value: "silence",   label: "Deep silence — nothing at all" },
      { value: "ambient",   label: "Soft, ambient sound to float on" },
      { value: "water",     label: "Rain, tide, gentle textures" },
      { value: "presence",  label: "A calm, human presence nearby" },
    ],
  },
  {
    id: "dreams",
    text: "What is your dream life like?",
    options: [
      { value: "vivid",     label: "Vivid and often strange — busy nights" },
      { value: "peaceful",  label: "Peaceful and hazy — I barely remember" },
      { value: "blank",     label: "Rarely — I surface empty" },
      { value: "troubled",  label: "Troubled — they linger into morning" },
    ],
  },
  {
    id: "hardest",
    text: "Where does sleep resist you most?",
    options: [
      { value: "falling",   label: "Falling asleep — the threshold feels far" },
      { value: "staying",   label: "Staying asleep — I surface at 2 or 3am" },
      { value: "waking",    label: "Waking — mornings feel heavy" },
      { value: "all",       label: "All of it — sleep and I are barely acquainted" },
    ],
  },
];

/* ── Types ── */
type Phase = "quiz" | "loading" | "result" | "error";

interface QuizResult {
  archetype: string;
  portrait:  string;
  video:     string;
  reason:    string;
}

/* ── Email sub-form (appears after result) ── */
function EmailCapture({ archetype }: { archetype: string }) {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"done"|"error">("idle");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    const res = await fetch("/api/newsletter", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: archetype, email: email.trim() }),
    });
    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") {
    return <p className="quiz-email-ok">Dream dispatch sent ✦</p>;
  }

  return (
    <form className="quiz-email-form" onSubmit={send} noValidate>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        aria-label="Email address"
        autoComplete="email"
      />
      <button type="submit" disabled={status === "loading" || !email.trim()}>
        {status === "loading" ? "Sending…" : "Send it to me"}
      </button>
      {status === "error" && (
        <span className="quiz-email-err">Couldn't send — try again.</span>
      )}
    </form>
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function SleepQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase,   setPhase]   = useState<Phase>("quiz");
  const [result,  setResult]  = useState<QuizResult | null>(null);
  const [errMsg,  setErrMsg]  = useState("");

  const allAnswered = QUESTIONS.every((q) => answers[q.id]);

  function select(qId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAnswered || phase === "loading") return;

    setPhase("loading");
    setErrMsg("");

    // Build labelled answers for the prompt
    const labelled: Record<string, string> = {};
    for (const q of QUESTIONS) {
      const chosen = q.options.find((o) => o.value === answers[q.id]);
      labelled[q.text] = chosen?.label ?? answers[q.id];
    }

    try {
      const res  = await fetch("/api/quiz", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ answers: labelled }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.archetype) {
        setResult(data);
        setPhase("result");
      } else {
        setErrMsg(data.error ?? "Something went quiet. Try again.");
        setPhase("error");
      }
    } catch {
      setErrMsg("The night went silent. Check your connection and try again.");
      setPhase("error");
    }
  }

  function reset() {
    setAnswers({});
    setPhase("quiz");
    setResult(null);
    setErrMsg("");
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <section id="quiz" className="quiz-section reveal">

      {/* ── Header ── */}
      <p className="section-label" aria-hidden="true">sleep quiz</p>
      <p className="section-sub">
        Four questions. One quiet recommendation.
      </p>

      {/* ── Quiz form ── */}
      {(phase === "quiz" || phase === "error") && (
        <form className="quiz-form" onSubmit={handleSubmit} noValidate>

          {/* Progress */}
          <div className="quiz-progress" aria-label={`${answeredCount} of 4 answered`}>
            {QUESTIONS.map((q, i) => (
              <span
                key={q.id}
                className={`quiz-dot${answers[q.id] ? " filled" : ""}`}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Questions */}
          <div className="quiz-questions">
            {QUESTIONS.map((q, qi) => (
              <div key={q.id} className="quiz-q">
                <p className="quiz-q-text">
                  <span className="quiz-q-num">{qi + 1}</span>
                  {q.text}
                </p>
                <div className="quiz-options" role="group" aria-label={q.text}>
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`quiz-opt${answers[q.id] === opt.value ? " selected" : ""}`}
                      onClick={() => select(q.id, opt.value)}
                      aria-pressed={answers[q.id] === opt.value}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="quiz-submit-row">
            {phase === "error" && (
              <p className="quiz-err" role="alert">{errMsg}</p>
            )}
            <button
              type="submit"
              className="quiz-submit"
              disabled={!allAnswered}
            >
              {allAnswered ? "Read my sleep portrait →" : `${answeredCount} of 4 answered`}
            </button>
          </div>

        </form>
      )}

      {/* ── Loading ── */}
      {phase === "loading" && (
        <div className="quiz-loading" aria-live="polite">
          <span className="dream-spinner" aria-hidden="true" style={{ width: 24, height: 24 }} />
          <p>Reading the night…</p>
        </div>
      )}

      {/* ── Result ── */}
      {phase === "result" && result && (
        <div className="quiz-result">

          <p className="quiz-archetype">{result.archetype}</p>
          <p className="quiz-portrait">{result.portrait}</p>

          <div className="quiz-rec">
            <p className="quiz-rec-label">Your Somnific match</p>
            <p className="quiz-rec-title">{result.video}</p>
            <p className="quiz-rec-why">{result.reason}</p>
          </div>

          <div className="quiz-email-section">
            <p className="quiz-email-prompt">Want this in your inbox?</p>
            <EmailCapture archetype={result.archetype} />
          </div>

          <button className="dream-again" onClick={reset} type="button">
            take the quiz again →
          </button>

        </div>
      )}

    </section>
  );
}
