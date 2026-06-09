"use client";

import { useRef, useState } from "react";

const AUDIO_SRC   = "/audio/in-the-magic-we-weave.mp3";
const TRACK_TITLE = "In the Magic We Weave";
const YT_LINK     = "https://www.youtube.com/@SomnificStudios";

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function SoundPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);

  const [playing,  setPlaying]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  function scrub(e: React.MouseEvent<HTMLDivElement>) {
    const bar = barRef.current;
    const a   = audioRef.current;
    if (!bar || !a || duration <= 0) return;
    const rect  = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * duration;
  }

  return (
    <section id="preview" className="sound-section reveal">
      <p className="section-label" aria-hidden="true">listen</p>
      <p className="section-sub">A quiet moment before you decide.</p>

      <div className="player-frame">

        <p className="player-title">{TRACK_TITLE}</p>

        <div className="player-controls">

          <button
            className={`player-play-btn${playing ? " playing" : ""}`}
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            type="button"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden="true">
                <rect x="6"  y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden="true">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            )}
          </button>

          <div className="player-progress-wrap">
            <div
              ref={barRef}
              className="player-bar"
              onClick={scrub}
              role="slider"
              aria-label="Playback position"
              aria-valuenow={Math.round(current)}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
            >
              <div className="player-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="player-time">
              <span>{formatTime(current)}</span>
              <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
            </div>
          </div>

        </div>

        <p className="player-link">
          From <em>{TRACK_TITLE}</em>{" — "}
          <a href={YT_LINK} target="_blank" rel="noopener noreferrer">
            Watch the full session on YouTube ↗
          </a>
        </p>

      </div>

      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onTimeUpdate={()    => setCurrent(audioRef.current?.currentTime ?? 0)}
        onEnded={()         => { setPlaying(false); setCurrent(0); }}
      />

    </section>
  );
}
