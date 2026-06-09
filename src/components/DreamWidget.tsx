"use client";

import { useState, useRef } from "react";

type Phase = "idle" | "loading" | "result" | "error";

const HINTS = ["anxious", "restless", "hopeful", "sad", "lonely", "tired", "adrift"];

export default function DreamWidget() {
  const [word,    setWord]    = useState("");
  const [phase,   setPhase]   = useState<Phase>("idle");
  const [result,  setResult]  = useState("");
  const [errMsg,  setErrMsg]  = useState("");
  const [lastWord, setLastWord] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const trimmed = word.trim();
    if (!trimmed || phase === "loading") return;

    setPhase("loading");
    setErrMsg("");

    try {
      const res  = await fetch("/api/dream", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ word: trimmed }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.response) {
        setLastWord(trimmed);
        setResult(data.response);
        setPhase("result");
      } else {
        setErrMsg(data.error ?? "Something stirred but went quiet. Try again.");
        setPhase("error");
      }
    } catch {
      setErrMsg("The night went silent. Check your connection and try again.");
      setPhase("error");
    }
  }

  function reset() {
    setWord("");
    setPhase("idle");
    setResult("");
    setErrMsg("");
    setTimeout(() => inputRef.current?.focus(), 60);
  }

  const busy = phase === "loading";

  return (
    <section id="dream" className="dream-section reveal">

      {/* ── Header ── */}
      <p className="section-label" aria-hidden="true">tonight&rsquo;s dream</p>
      <p className="section-sub">
        One word. One feeling. Something waits on the other side.
      </p>

      {/* ── Interactive area ── */}
      <div className="dream-inner">

        {/* ── Prompt / input phase ── */}
        {(phase === "idle" || phase === "loading" || phase === "error") && (
          <form className="dream-form" onSubmit={handleSubmit} noValidate>
            <input
              ref={inputRef}
              type="text"
              className="dream-input"
              placeholder={HINTS.join("  ·  ")}
              value={word}
              onChange={(e) => { setWord(e.target.value); if (phase === "error") setPhase("idle"); }}
              disabled={busy}
              autoComplete="off"
              spellCheck={false}
              maxLength={80}
              aria-label="Enter a word or feeling"
            />

            <button
              type="submit"
              className="dream-btn"
              disabled={busy || !word.trim()}
              aria-label="Invite the dream"
            >
              {busy ? (
                <span className="dream-spinner" aria-hidden="true" />
              ) : (
                <>Invite the dream</>
              )}
            </button>

            {phase === "error" && (
              <p className="dream-error" role="alert">{errMsg}</p>
            )}
          </form>
        )}

        {/* ── Result phase ── */}
        {phase === "result" && (
          <div className="dream-result">
            <p className="dream-word">{lastWord}</p>
            <blockquote className="dream-response">{result}</blockquote>
            <button
              className="dream-again"
              onClick={reset}
              type="button"
            >
              another feeling →
            </button>
          </div>
        )}

      </div>

    </section>
  );
}
