"use client";

import { useEffect } from "react";

/**
 * Fail-safe scroll-reveal implementation (ported from design handoff).
 *
 * Content is visible by default. The hidden state is only applied after
 * JS confirms it's running (adds `body.anim-ready`). An immediate in-view
 * check + 2s fallback timer guarantee nothing stays invisible.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );

    if (prefersReduced) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    document.body.classList.add("anim-ready");

    const showIfNear = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add("in");
    };
    els.forEach(showIfNear);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });

    const onScroll = () => els.forEach(showIfNear);
    window.addEventListener("scroll", onScroll, { passive: true });

    /* 2-second safety net — reveals everything even if observer fails */
    const fallback = setTimeout(
      () => els.forEach((el) => el.classList.add("in")),
      2000
    );

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(fallback);
    };
  }, []);

  return null;
}
