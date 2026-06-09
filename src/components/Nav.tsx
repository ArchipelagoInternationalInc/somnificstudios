"use client";

import { useState, useEffect } from "react";

const LINKS = [
  { label: "Home",       href: "#home"       },
  { label: "Videos",     href: "#videos"     },
  { label: "About",      href: "#about"      },
  { label: "Newsletter", href: "#newsletter" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={`site-nav${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          <a href="#home" className="nav-logo" onClick={close}>
            somnific studios
          </a>

          {/* Desktop links */}
          <ul className="nav-links" aria-hidden="true">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          {/* Hamburger — mobile only */}
          <button
            className={`nav-hamburger${open ? " open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            type="button"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={`nav-mobile${open ? " open" : ""}`}
        aria-hidden={!open}
      >
        <ul>
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={close} tabIndex={open ? 0 : -1}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
