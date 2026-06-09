"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Newsletter() {
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [status,   setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const busy = status === "loading";

  return (
    <div id="newsletter" className="closer">

      {/* ── Form column ── */}
      <div className="news reveal">
        <h3>Newsletter</h3>
        <p>
          Join the dream. New releases, sleep rituals, and quiet moments —
          delivered softly, never often.
        </p>

        {status === "success" ? (
          <p className="ok" style={{ fontSize: "16px", lineHeight: 1.7 }}>
            Sweet dreams — you&rsquo;re on the list ✦
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              placeholder="Your name"
              aria-label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="given-name"
              disabled={busy}
            />
            <input
              type="email"
              placeholder="Your email"
              aria-label="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={busy}
            />
            <button type="submit" disabled={busy}>
              {busy ? "Subscribing…" : "Subscribe"}
            </button>

            {/* Error state — uses .ok class colour but overrides to a soft red */}
            {status === "error" && (
              <span
                className="ok"
                role="alert"
                style={{ color: "#ff9898" }}
              >
                {errorMsg}
              </span>
            )}
          </form>
        )}
      </div>

      {/* ── Dreamer illustration — pinned to panel bottom ── */}
      <div className="dreamer" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/dreamer.png" alt="" width={654} height={585} />
      </div>

    </div>
  );
}
